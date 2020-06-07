export class Reservation {
  name: string;
  time: string;
  cover: number;
  contact: string;
  notes: string;
  
  constructor(name: string, time: string, cover: number, contact: string, notes: string) {
    this.name = name;
    this.time = time;
    this.cover = cover;
    this.contact = contact;
    this.notes = notes;
  }
}