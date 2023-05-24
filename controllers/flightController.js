const Flight = require('../models/flightSchema');
const Ticket = require('../models/ticketSchema');

class FlightController {
    static async getAllFlights(req, res) {
        try {
            const flights = await Flight.find({});
            res.render('flights', { flights });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getNewFlightForm(req, res) {
        try {
            const airlines = Flight.schema.path('airline').enumValues;
            const airports = Flight.schema.path('airport').enumValues;
            res.render('newFlight', { airlines, airports });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getFlightDetail(req, res) {
        try {
            const flightId = req.params.id;
            const flight = await Flight.findById(flightId);

            if (!flight) {
                return res.status(404).render('error', { message: 'Flight not found' });
            }

            const tickets = await Ticket.find({ flight: flightId });
            res.render('flightDetails', { flight, tickets });
        } catch (error) {
            res.status(500).render('error', { message: 'Internal Server Error' });
        }
    }

    static async createNewFlight(req, res) {
        try {
            const flightNo = Math.floor(Math.random() * 999999) + 1;

            const newFlightData = {
                airline: req.body.airline,
                airport: req.body.airport,
                flightNo,
                departs: new Date(req.body.departs),
                destination: req.body.destination,
            };

            const newFlight = new Flight(newFlightData);
            await newFlight.save();
            res.redirect('/flights');
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteFlight(req, res) {
        try {
            const flightId = req.params.id;
            await Flight.findByIdAndDelete(flightId);
            res.redirect('/flights');
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static getNewDestinationForm(req, res) {
        const flightId = req.params.id;
        res.render('flights/newDestination', { flightId: flightId });
    }

    static async addNewDestination(req, res) {
        try {
            const flightId = req.params.id;
            const newDestination = req.body;
            const flight = await Flight.findById(flightId);

            flight.destinations.push(newDestination);
            const updatedFlight = await flight.save();

            res.redirect(`/flights/${updatedFlight._id}`);
        } catch (err) {
            console.error(err);
            res.redirect('/flights');
        }
    }
}

module.exports = FlightController;
