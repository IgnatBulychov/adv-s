const db = require('../../db/db');
const getId = require('../../utilities/getId');

class Event {
  constructor(event) {
    this.status = event.status;
    this.userId = event.userId;
    this.offerId = event.offerId;  
  }
  async save() {    
    await db('offer_events')
    .insert({
      id: getId(),
      status: this.status,
      offerId: this.offerId,
      userId: this.userId
    })
  }
}

module.exports = Event