const express = require('express');
const FlightController = require('../controllers/flightController');
const TicketController = require('../controllers/ticketController');

const router = express.Router();

// GET /flights - Get all flights
router.get('/', FlightController.getAllFlights);

// GET /flights/new - Render new flight form
router.get('/new', FlightController.getNewFlightForm);

// POST /flights - Create a new flight
router.post('/', FlightController.createNewFlight);

// POST /flights/flightID/newTicket
router.post('/:id/newTicket', TicketController.createNewTicket);

// POST /flights/:id/delete - Delete a flight
router.post('/:id/delete', FlightController.deleteFlight);

// GET /flights/:id - Get flight details
router.get('/:id', FlightController.getFlightDetail);

// GET /flights/:id/tickets/new - Render new ticket form for a specific flight
router.get('/:id/tickets/new', TicketController.getNewTicketForm);

// DELETE /flights/:flightId/tickets/:ticketId - Delete a ticket
router.delete('/:flightId/ticket/:ticketId', TicketController.deleteTicket);
module.exports = router;


// DESTINATIONS

// GET /flights/:id/destinations/new - Render new destination form for a specific flight
router.get('/:id/destinations/new', FlightController.getNewDestinationForm);

// POST /flights/:id/destinations - Add a new destination to a flight
router.post('/:id/destinations', FlightController.addNewDestination);
