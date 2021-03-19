const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const Todo = require('../models/Todo');

//@route    GET api/todos
//@desc     Get all todos
//@access   Private

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route    POST api/todos
//@desc     Add new todo
//@access   Private


router.post(
    '/',
    check('title', 'Title is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
          return res.status(400).json({ errors: errors.array() })
        }
       const { title, description } = req.body;
        try {
            const newTodo = new Todo({
                title,
                description
            });
            
            let todo = await newTodo.save();
            res.json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

//@route    PUT api/todos/:id
//@desc     Update todo
//@access   Private
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    // build a todo object

    const todoFields = {};
    if (title) todoFields.title = title;
    if (description) todoFields.description = description;

    try {
        let todo = await Todo.findById(req.params.id);

        if(!todo) return res.status(404).json({ msg: "Todo not found"});

        todo = await Todo.findByIdAndUpdate(req.params.id, 
            { $set: todoFields },
            { new: true }
        );

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route    Delete api/todos/:id
//@desc     Delete todo
//@access   Private
router.delete('/:id', async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if(!todo) return res.status(404).json({ msg: "Todo not found"});

        await Todo.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;