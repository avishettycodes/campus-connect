import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Reservation {
  id: string;
  foodListingId: string;
  source: string;
  timestamp: number;
  userId?: string;
  userEmail?: string;
  itemDetails?: {
    id: string;
    title: string;
    location: string;
    pickupTime: string;
    type: 'cafe' | 'event';
    category?: string;
  };
}

interface ReservationContextType {
  userReservations: Reservation[];
  setUserReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  addReservation: (reservation: Reservation) => void;
  removeReservation: (id: string) => void;
  clearReservations: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);

  // Load reservations from localStorage on mount
  useEffect(() => {
    const savedReservations = localStorage.getItem('userReservations');
    if (savedReservations) {
      try {
        const parsedReservations = JSON.parse(savedReservations);
        setUserReservations(parsedReservations);
      } catch (err) {
        console.error('Error parsing saved reservations:', err);
      }
    }
  }, []);

  // Save reservations to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userReservations', JSON.stringify(userReservations));
  }, [userReservations]);

  const addReservation = (reservation: Reservation) => {
    setUserReservations(prev => [...prev, reservation]);
  };

  const removeReservation = (id: string) => {
    setUserReservations(prev => prev.filter(res => res.id !== id));
  };

  const clearReservations = () => {
    setUserReservations([]);
    localStorage.removeItem('userReservations');
  };

  return (
    <ReservationContext.Provider
      value={{
        userReservations,
        setUserReservations,
        addReservation,
        removeReservation,
        clearReservations,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
} 