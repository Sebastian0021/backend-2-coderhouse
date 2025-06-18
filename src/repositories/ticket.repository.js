import TicketDao from "../dao/ticket.dao.js";

export default class TicketRepository {
  constructor() {
    this.dao = new TicketDao();
  }

  createTicket = async (ticket) => {
    return await this.dao.createTicket(ticket);
  };
}
