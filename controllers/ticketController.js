const Ticket = require('../models/ticketSchema');

class TicketController {
    static async getNewTicketForm(req, res) {
        try {
            // Implement the logic to render the new ticket form
            res.render('newTicket', { flightId: req.params.id });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async createNewTicket(req, res) {
        console.log("here")
        try {
            const newTicketData = {
                seat: req.body.seat,
                price: req.body.price,
                flight: req.params.id,
            };

            const newTicket = new Ticket(newTicketData);
            await newTicket.save();

            res.redirect(`/flights/${req.params.id}`);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async deleteTicket(req, res) {
        try {
            const ticketId = req.params.ticketId;
            await Ticket.findOneAndDelete({ _id: ticketId });

            res.redirect(`/flights/${req.params.flightId}`);
        } catch (err) {
            console.log('here', err)
            res.status(400).json({ error: err.message });
        }
    }

}

module.exports = TicketController;
