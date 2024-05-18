const express = require('express');
const routes = express.Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

const studentModel = require('../model/student.model');

routes.get('/', async (req, res) => {
    try {
        const students = await studentModel.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const student = await studentModel.findById(id);
        // console.log(student);
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

routes.post('/', async (req, res) => {
    try {
        const student = await studentModel.create(req.body);
        res.status(200).json(student);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

routes.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const student = await studentModel.findByIdAndUpdate(id, req.body);
    console.log(req.body)
    if (!student) res.status(404).json({ message: `Student with given id ${id} does not exist` });
    else {
        const updatedStudent = await studentModel.findById(id);
        // res.status(200).json(updatedStudent);
        // console.log(updatedStudent)
    }
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) res.status(404).json({});
    else res.status(200).json();
})

module.exports = routes;