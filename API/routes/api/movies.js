'use strict'
const router = require('express').Router();
const { asyncHandler } = require('../../middleware/asyncHandler');
const { authenticateUser } = require('../../middleware/authUser');
const { Movie } = require('../../models');

//Route to get all of a users favorited movies
router.get('/movies', authenticateUser, asyncHandler(async (req, res) => {
    const currentUserId = req.currentUser.id;
    const movies = await Movie.findAll({
        where: {
            userId: currentUserId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId']
        }
    })
    res.json(movies);
  }));

  //Route to add a movie to a users favorite list
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

  //Route to remove a users favorited movie
  router.delete('/movies/:id', authenticateUser, asyncHandler( async(req, res) => {
    const userId = req.currentUser.id;
    const movie = await Movie.findOne({
      where: {
        movieId: req.params.id,
        userId: userId
    }})
    if (userId === movie.userId) {
      await movie.destroy();
      res.status(204).end();
    } else {
      res.status(403).end()
    }
  }));


module.exports = router;
