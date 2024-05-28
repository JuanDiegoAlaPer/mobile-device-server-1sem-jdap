const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');

router.post('/new-rating', ratingController.createRating);
router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatingById);
router.patch('/edit/:id', ratingController.updateRating);
router.delete('/remove/:id', ratingController.deleteRating);

module.exports = router;