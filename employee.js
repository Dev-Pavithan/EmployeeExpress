const express = require('express');
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



let employees = [
    {
        id: 1,
        name: 'Rahul',
        age: 20,
        gender: 'Male'
    },
    {
        id: 2,
        name: 'Biranavan',
        age: 21,
        gender: 'Male'
    },
    {
        id: 3,
        name: 'Sobitha',
        age: 20,
        gender: 'Female'
    },
    {
        id: 4,
        name: 'Akash',
        age: 25,
        gender: 'Male'
    },
    {
        id: 5,
        name: 'Sangrisha',
        age: 24,
        gender: 'Female'
    },
    {
        id: 6,
        name: 'Sarma',
        age: 26,
        gender: 'Male'
    },
    {
        id: 7,
        name: 'Nitharshana',
        age: 23,
        gender: 'Female'
    },
    {
        id: 8,
        name: 'Umaivanan',
        age: 25,
        gender: 'Male'
    },
    {
        id: 9,
        name: 'Losahavi',
        age: 30,
        gender: 'Female'
    },
    {
        id: 10,
        name: 'Tharshan',
        age: 28,
        gender: 'Male'
    },
];






// Get All Employees Data
app.get('/', (req, res) => {
    res.json(employees);
});





// Get a Single Employee Record(Read)
app.get('/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee)
        return res.status(404).send('Employee not found');
    res.json(employee);
});






// Insert a New Employee Record(Create)
app.post('/', (req, res) => {
    const { id, name, age, gender } = req.body;
    const newEmployee = {
        id,
        name,
        age,
        gender
    };
    employees.push(newEmployee);
    res.status(201).send('Employee added successfully');
});










// Update an Employee Record (Update)
app.put('/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');

    const { name, age, gender } = req.body;
    if (name) employee.name = name;
    if (age) employee.age = age;
    if (gender) employee.gender = gender;

    res.status(200).send('Employee updated successfully');
});










// Partially Update an Employee Record (Update)
app.patch('/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) return res.status(404).send('Employee not found');

    if (req.body.name !== undefined) employee.name = req.body.name;
    if (req.body.age !== undefined) employee.age = req.body.age;
    if (req.body.gender !== undefined) employee.gender = req.body.gender;

    res.status(200).send('Employee partially updated successfully');
});




// Delete an Employee Record
app.delete('/:id', (req, res) => {
    const employeeIndex = employees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (employeeIndex === -1) return res.status(404).send('Employee not found');

    const deletedEmployee = employees.splice(employeeIndex, 1)[0];
    res.status(200).json({
        message: 'Employee deleted successfully',
        deletedEmployee
    });
});




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});