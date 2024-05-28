const express = require('express');
const router = express.Router();
const beerController = require('../controllers/BeerController');

router.post('/new-beer', beerController.createBeer);
router.get('/', beerController.getAllBeers);
router.get('/:id', beerController.getBeerById);
router.patch('/edit/:id', beerController.updateBeer);
router.delete('/remove/:id', beerController.deleteBeer);

module.exports = router;