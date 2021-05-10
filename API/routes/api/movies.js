'use strict'
const router = require('express').Router();
const { asyncHandler } = require('../../middleware/asyncHandler');
const { authenticateUser } = require('../../middleware/authUser');
const { Movie } = require('../../models');
const { User } = require('../../models');

router.get('/movies', authenticateUser, asyncHandler(async (req, res) => {
    const currentUserId = req.currentUser.id;
    const movies = await Movie.findAll({
        where: {
            userId: currentUserId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: User,
            attributes: {
            exclude: ['createdAt', 'updatedAt']
            }
        }
    })
    res.json(movies);
  }));

  router.post('/movies', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
      const movie = await Movie.create(req.body);
      res.location(`/api/courses/${movie.id}`).status(201).json({ id: movie.id }).end() 
      
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

  router.delete('/movies/:id', authenticateUser, asyncHandler( async(req, res) => {
    const movie = await Movie.findByPk(req.params.id);
    const userId = req.currentUser.id;
    if (userId === movie.userId) {
      await movie.destroy();
      res.status(204).end();
    } else {
      res.status(403).end()
    }
  }));


module.exports = router;
