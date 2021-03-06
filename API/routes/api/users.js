'use strict'
const router = require('express').Router();
const { asyncHandler } = require('../../middleware/asyncHandler');
const { authenticateUser } = require('../../middleware/authUser');
const { User } = require('../../models');

// Route to sign in an auth'd user
router.get('/users', authenticateUser, asyncHandler((req, res) => {
    const user = req.currentUser;
  
    res.status(200).json({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddress
    });
}));

// Route to create a new user
router.post('/users', asyncHandler(async (req, res, next) => {
    try {
      const user = req.body;
      await User.create(user);
      await res.location('/').status(201).end();
  
    } catch (error) {
      console.log('ERROR: ', error.name);
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        next(error);
      }
    }
  }));

module.exports = router;