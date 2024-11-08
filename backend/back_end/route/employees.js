const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee'); // Ensure correct path
const cors = require('cors');

// GET all employees
router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find(); // Finds all employees from the collection
      res.status(200).json(employees); // Responds with the data and status code 200
    } catch (error) {
      console.error('Error fetching employees:', error); // Logs the error for debugging
      res.status(500).json({ message: 'Error fetching employees' }); // Sends an error response
    }
  });
  

// CREATE a new employee
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, date } = req.body;

    // Basic validation
    if (!name || !email || !mobile || !designation || !gender || !course || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, date });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee' });
  }
});

// UPDATE an employee
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course, date } = req.body;

    // Validate input
    if (!name || !email || !mobile || !designation || !gender || !course || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, mobile, designation, gender, course, date },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee' });
  }
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
});

// TOGGLE active/deactive status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.active = !employee.active;
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error('Error toggling employee status:', error);
    res.status(500).json({ message: 'Error toggling employee status' });
  }
});

module.exports = router;


