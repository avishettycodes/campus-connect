/**
 * ReservationService.ts
 * Handles all reservation-related operations with proper user isolation
 */

interface Reservation {
  id: string;
  userEmail: string;
  userId: string;
  title: string;
  location: string;
  pickupTime: string;
  itemDetails: {
    title: string;
    availableCount: number;
    totalCount: number;
    id: string;
  };
}

class ReservationService {
  private static instance: ReservationService;
  private readonly STORAGE_KEY = 'userReservations';

  private constructor() {}

  static getInstance(): ReservationService {
    if (!ReservationService.instance) {
      ReservationService.instance = new ReservationService();
    }
    return ReservationService.instance;
  }

  // Get all reservations for a specific user
  getUserReservations(userId: string, userEmail: string): Reservation[] {
    try {
      const storedReservations = localStorage.getItem(this.STORAGE_KEY);
      if (!storedReservations) return [];

      const allReservations = JSON.parse(storedReservations);
      return allReservations.filter(
        (res: Reservation) => res.userId === userId && res.userEmail === userEmail
      );
    } catch (error) {
      console.error('Error getting user reservations:', error);
      return [];
    }
  }

  // Add a new reservation
  addReservation(reservation: Reservation): boolean {
    try {
      const storedReservations = localStorage.getItem(this.STORAGE_KEY);
      const allReservations = storedReservations ? JSON.parse(storedReservations) : [];
      
      // Check if user already has this item reserved
      const existingReservation = allReservations.find(
        (res: Reservation) => 
          res.userId === reservation.userId && 
          res.itemDetails.id === reservation.itemDetails.id
      );

      if (existingReservation) {
        console.log('User already has this item reserved');
        return false;
      }

      // Add new reservation
      allReservations.push(reservation);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allReservations));
      return true;
    } catch (error) {
      console.error('Error adding reservation:', error);
      return false;
    }
  }

  // Cancel a reservation
  cancelReservation(reservationId: string, userId: string, userEmail: string): boolean {
    try {
      const storedReservations = localStorage.getItem(this.STORAGE_KEY);
      if (!storedReservations) return false;

      const allReservations = JSON.parse(storedReservations);
      
      // Find the reservation to cancel
      const reservationIndex = allReservations.findIndex(
        (res: Reservation) => 
          res.id === reservationId && 
          res.userId === userId && 
          res.userEmail === userEmail
      );

      if (reservationIndex === -1) {
        console.log('Reservation not found or unauthorized');
        return false;
      }

      // Remove the reservation
      allReservations.splice(reservationIndex, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allReservations));
      return true;
    } catch (error) {
      console.error('Error canceling reservation:', error);
      return false;
    }
  }

  // Update item availability
  updateItemAvailability(itemId: string, increment: boolean): boolean {
    try {
      const storedReservations = localStorage.getItem(this.STORAGE_KEY);
      if (!storedReservations) return false;

      const allReservations = JSON.parse(storedReservations);
      let updated = false;

      // Update availability for all reservations of this item
      allReservations.forEach((res: Reservation) => {
        if (res.itemDetails.id === itemId) {
          if (increment) {
            res.itemDetails.availableCount++;
          } else {
            res.itemDetails.availableCount--;
          }
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allReservations));
      }
      return updated;
    } catch (error) {
      console.error('Error updating item availability:', error);
      return false;
    }
  }

  // Clear all reservations for a user
  clearUserReservations(userId: string, userEmail: string): void {
    try {
      const storedReservations = localStorage.getItem(this.STORAGE_KEY);
      if (!storedReservations) return;

      const allReservations = JSON.parse(storedReservations);
      const filteredReservations = allReservations.filter(
        (res: Reservation) => !(res.userId === userId && res.userEmail === userEmail)
      );

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredReservations));
    } catch (error) {
      console.error('Error clearing user reservations:', error);
    }
  }
}

export const reservationService = ReservationService.getInstance();
export type { Reservation }; 