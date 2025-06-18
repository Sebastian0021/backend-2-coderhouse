import Ticket from "./models/ticket.model.js";

export default class TicketDao {
  createTicket = async (ticket) => {
    try {
      const newTicket = await Ticket.create(ticket);
      return newTicket;
    } catch (error) {
      console.error("Error creating ticket in DAO:", error);
      throw error;
    }
  };
}
