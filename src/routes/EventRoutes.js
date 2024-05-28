const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

router.post('/new-event', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.patch('/edit/:id', eventController.updateEvent);
router.delete('/remove/:id', eventController.deleteEvent);

module.exports = router;