const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');

router.post('/new-review', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.patch('/edit/:id', reviewController.updateReview);
router.delete('/remove/:id', reviewController.deleteReview);

module.exports = router;