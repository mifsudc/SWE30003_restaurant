import { Reservation } from "../models/Reservation";

export class ReservationService {
  reservations: Reservation[];

  constructor() {
    this.reservations = [];
  }

  // singleton
  static instance: ReservationService;
  static get = (): Promise<ReservationService> => {
    return new Promise<ReservationService>( resolve => {
      if (!ReservationService.instance) {
        ReservationService.instance = new ReservationService();
      }
      resolve(ReservationService.instance);
    });
  }

  createReservation = (m: { name: string, time: string, cover: number, contact: string, notes: string }) => {
    this.reservations.push( new Reservation( m.name, m.time, m.cover, m.contact, m.notes ) );
  }
}