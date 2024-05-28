const express = require('express');
const router = express.Router();
const breweryController = require('../controllers/BreweryController');

router.post('/new-brewery', breweryController.createBrewery);
router.get('/', breweryController.getAllBreweries);
router.get('/:id', breweryController.getBreweryById);
router.patch('/edit/:id', breweryController.updateBrewery);
router.delete('/remove/:id', breweryController.deleteBrewery);

module.exports = router;