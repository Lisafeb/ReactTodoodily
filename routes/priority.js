const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const config = require('config');

const Priority = require('../models/Priority');

//@route    GET api/todos
//@desc     Get all todos
//@access   Private

router.get('/', async (req, res) => {
    try {
        const priorityIds = await Priority.find()
        res.json(priorityIds)
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
    async (req, res) => {
        const { id } = req.body;
        try {
            const newPriority = new Priority({
                id
            });

            const priorities = await newPriority.save();
            res.json(priorities);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    router.put('/:id', async (req, res) => {
        const { priorityId } = req.body;
        // build a todo object
    
      
        try {
            let priority = await Priority.findById(req.params.id);
    
            if (!priority) return res.status(404).json({ msg: "Todo not found" });
    
            priority = await Priority.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
              });
    
            res.json(priority);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;