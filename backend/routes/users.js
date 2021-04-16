const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const newUser = new User({userName});
    newUser.save()
    .then(() => res.json('user added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json("user deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    console.log('params: ',req.params.id);
    User.findById(req.params.id)
    .then(user => {
        user.userName = req.body.userName;
        console.log('user: ',req.body.userName);
        user.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;