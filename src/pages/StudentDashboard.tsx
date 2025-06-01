/**
 * StudentDashboard.tsx
 * Main dashboard for students to view and manage food reservations
 * 
 * Changes made:
 * - Integrated with ReservationService
 * - Improved error handling
 * - Enhanced user session validation
 * - Added proper state management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Badge,
  Chip,
  CircularProgress,
  keyframes,
  alpha,
  useTheme,
  Fab,
  Zoom,
  Snackbar,
  Alert,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  LocalDining as LocalDiningIcon,
  LocationOn as LocationOnIcon,
  CheckCircle as CheckCircleIcon,
  Timer as TimerIcon,
  Warning as WarningIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  AccessTime as AccessTimeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Event as EventIcon,
  AccountCircle as AccountCircleIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { reservationService } from '../services/ReservationService';
import { useReservations, type Reservation } from '../contexts/ReservationContext';

// Import local food images
import pastriesImage from '../assets/food/pastries.jpg';
import pizzaImage from '../assets/food/pizza.jpg';
import sandwichImage from '../assets/food/chicken_sandwich.jpg';
import wrapImage from '../assets/food/vegan_wrap.jpg';
import coffeeImage from '../assets/food/coffee.jpg';
import burritoImage from '../assets/food/breakfast_burrito.jpg';
import smoothieImage from '../assets/food/smoothie_bowl.jpg';
import bagelImage from '../assets/food/bagels.jpg';
import platterImage from '../assets/food/sandwich_platter.jpg';
import snacksImage from '../assets/food/snacks.jpg';
import popcornImage from '../assets/food/popcorn_drinks.jpg';
import defaultFoodImage from '../assets/food/default_food.jpg';

// Brand colors
const BRAND_GREEN = '#5FA35E';
const SCU_RED = '#990000';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const checkmark = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Add loading animation keyframes
const buttonPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

// Food type assets with local images
const foodTypeAssets = {
  pastries: {
    image: pastriesImage,
    alt: 'Fresh assorted pastries',
  },
  pizza: {
    image: pizzaImage,
    alt: 'Pepperoni pizza slices',
  },
  sandwich: {
    image: sandwichImage,
    alt: 'Grilled chicken sandwich',
  },
  wrap: {
    image: wrapImage,
    alt: 'Fresh vegan wraps',
  },
  coffee: {
    image: coffeeImage,
    alt: 'Freshly brewed coffee',
  },
  burrito: {
    image: burritoImage,
    alt: 'Breakfast burrito',
  },
  smoothie: {
    image: smoothieImage,
    alt: 'Smoothie bowl',
  },
  bagel: {
    image: bagelImage,
    alt: 'Fresh assorted bagels',
  },
  platter: {
    image: platterImage,
    alt: 'Sandwich platter',
  },
  snacks: {
    image: snacksImage,
    alt: 'Assorted healthy snacks',
  },
  popcorn: {
    image: popcornImage,
    alt: 'Fresh popcorn and drinks',
  },
  default: {
    image: defaultFoodImage,
    alt: 'Food item',
  },
};

// Add type for food category
type FoodCategory = 'pizza' | 'sandwich' | 'wrap' | 'coffee' | 'burrito' | 'smoothie' | 'bagel' | 'platter' | 'snacks' | 'popcorn' | 'pastries' | 'default';

// Define the food items data structure
interface FoodItem {
  id: string;
  title: string;
  description: string;
  locationId: string;
  pickupTime: string;
  availableCount: number;
  totalCount: number;  // Added to track original quantity
  image: string;
  type: 'cafe' | 'event';
  source: string;
  status: 'available' | 'claimed';
}

interface UserReservation {
  id: string;
  foodListingId: string;
  source: string;
  timestamp: number;
  itemDetails?: {
    title: string;
    location: string;
    pickupTime: string;
    type: 'cafe' | 'event';
    category?: FoodCategory;  // Add optional category
  };
}

interface Location {
  id: string;
  name: string;
  location: string;
  type: 'cafe' | 'event';
  icon: React.ReactElement;
  category: string;
}

// Define all valid locations with their display names and types
const VALID_LOCATIONS: readonly Location[] = [
  // Benson Center Cafés
  {
    id: 'benson-slice',
    name: 'The Slice',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'pizza',
  },
  {
    id: 'benson-spice',
    name: 'The Spice Market',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'international',
  },
  {
    id: 'benson-grill',
    name: 'The Global Grill',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'grill',
  },
  {
    id: 'benson-parilla',
    name: 'La Parilla',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'mexican',
  },
  {
    id: 'benson-bakery',
    name: 'Mission Bakery',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'bakery',
  },
  {
    id: 'benson-fire',
    name: 'The Fire Grill',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'grill',
  },
  {
    id: 'benson-sushi',
    name: 'Sushi',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'sushi',
  },
  {
    id: 'benson-chefs',
    name: "The Chef's Table",
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'restaurant',
  },
  {
    id: 'benson-trattoria',
    name: 'Trattoria',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'italian',
  },
  {
    id: 'benson-oasis',
    name: 'Simply Oasis',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'healthy',
  },
  {
    id: 'benson-acai',
    name: 'Acai',
    location: 'Benson Center',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'healthy',
  },

  // Learning Commons
  {
    id: 'learning-sunstream',
    name: 'Sunstream Cafe',
    location: 'Learning Commons',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'cafe',
  },

  // Lucas Hall
  {
    id: 'lucas-cadence',
    name: 'Cadence Cafe',
    location: 'Lucas Hall',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'cafe',
  },

  // SCDI
  {
    id: 'scdi-fresh',
    name: 'Fresh Bytes',
    location: 'SCDI',
    type: 'cafe',
    icon: <LocalDiningIcon />,
    category: 'healthy',
  },
] as const;

// Define event locations
const EVENT_LOCATIONS: readonly Location[] = [
  {
    id: 'lucas-lobby',
    name: 'Lucas Hall Lobby',
    location: 'Events',
    type: 'event',
    icon: <EventIcon />,
    category: 'event',
  },
  {
    id: 'scdi-conference',
    name: 'SCDI Conference Room',
    location: 'Events',
    type: 'event',
    icon: <EventIcon />,
    category: 'event',
  },
] as const;

// Combine all locations
const ALL_LOCATIONS: readonly Location[] = [...VALID_LOCATIONS, ...EVENT_LOCATIONS];

// Mock café food items
const CAFE_ITEMS: FoodItem[] = [
  {
    id: 'cafe-pepperoni-pizza',
    title: 'Pepperoni Pizza Slice',
    description: 'Freshly baked pizza slice with pepperoni and cheese',
    locationId: 'benson-slice',
    pickupTime: '12:00 PM - 1:00 PM',
    availableCount: 3,
    totalCount: 3,
    image: pizzaImage,
    type: 'cafe',
    source: 'The Slice',
    status: 'available',
  },
  {
    id: 'cafe-chicken-sandwich',
    title: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast with lettuce, tomato, and special sauce',
    locationId: 'benson-grill',
    pickupTime: '11:30 AM - 12:30 PM',
    availableCount: 2,
    totalCount: 2,
    image: sandwichImage,
    type: 'cafe',
    source: 'The Global Grill',
    status: 'available',
  },
  {
    id: 'cafe-vegan-wrap',
    title: 'Vegan Wrap',
    description: 'Fresh vegetables and hummus in a whole wheat wrap',
    locationId: 'benson-oasis',
    pickupTime: '1:00 PM - 2:00 PM',
    availableCount: 4,
    totalCount: 4,
    image: wrapImage,
    type: 'cafe',
    source: 'Simply Oasis',
    status: 'available',
  },
  {
    id: 'cafe-fresh-coffee',
    title: 'Fresh Coffee',
    description: 'Freshly brewed coffee with optional cream and sugar',
    locationId: 'learning-sunstream',
    pickupTime: '9:00 AM - 10:00 AM',
    availableCount: 5,
    totalCount: 5,
    image: coffeeImage,
    type: 'cafe',
    source: 'Sunstream Cafe',
    status: 'available',
  },
];

// Add event food items
const EVENT_ITEMS: FoodItem[] = [
  {
    id: 'event-club-fair-leftovers',
    title: 'Club Fair Leftovers',
    description: 'Assorted snacks and refreshments from the Club Fair',
    locationId: 'lucas-lobby',
    pickupTime: '5:00 PM - 6:00 PM',
    availableCount: 4,
    totalCount: 4,
    image: snacksImage,
    type: 'event',
    source: 'Lucas Hall Lobby',
    status: 'available',
  },
  {
    id: 'event-engineering-snacks',
    title: 'Engineering Conference Snacks',
    description: 'Sandwich platters and refreshments',
    locationId: 'scdi-conference',
    pickupTime: '3:00 PM - 4:00 PM',
    availableCount: 2,
    totalCount: 2,
    image: platterImage,
    type: 'event',
    source: 'SCDI Conference Room',
    status: 'available',
  },
];

// Combine all food items
const ALL_FOOD_ITEMS: FoodItem[] = [...CAFE_ITEMS, ...EVENT_ITEMS];

// Add debug logging utility with more detailed error reporting
const logReservationError = (error: unknown, context: string, details?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`Reservation Error (${context}):`, error);
    if (details) {
      console.error('Error Details:', details);
    }
  }
};

// Update getFoodImage function with proper type checking
const getFoodImage = (category: string | undefined | null): string => {
  if (!category || typeof category !== 'string') {
    return foodTypeAssets.default.image;
  }

  const normalizedCategory = category.toLowerCase().trim();
  
  switch (normalizedCategory) {
    case 'pizza':
      return foodTypeAssets.pizza.image;
    case 'sandwich':
      return foodTypeAssets.sandwich.image;
    case 'wrap':
    case 'vegan':
      return foodTypeAssets.wrap.image;
    case 'coffee':
      return foodTypeAssets.coffee.image;
    case 'burrito':
      return foodTypeAssets.burrito.image;
    case 'smoothie':
      return foodTypeAssets.smoothie.image;
    case 'bagel':
      return foodTypeAssets.bagel.image;
    case 'platter':
      return foodTypeAssets.platter.image;
    case 'snack':
      return foodTypeAssets.snacks.image;
    case 'popcorn':
      return foodTypeAssets.popcorn.image;
    case 'pastry':
    case 'croissant':
      return foodTypeAssets.pastries.image;
    default:
      return foodTypeAssets.default.image;
  }
};

function StudentDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, logout, validateSession, refreshUserData, getUserInitials } = useAuth();
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [successStates, setSuccessStates] = useState<{ [key: string]: boolean }>({});
  const [foodListings, setFoodListings] = useState<FoodItem[]>([]);
  const [reservationCounts, setReservationCounts] = useState<{ [key: string]: number }>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const { userReservations, addReservation, removeReservation } = useReservations();
  const [showEmptyLocations, setShowEmptyLocations] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add state for tracking reservation processing
  const [processingReservations, setProcessingReservations] = useState<Set<string>>(new Set());

  // Add state for notifications
  const [notifications] = useState([
    { id: 1, message: 'New food available at Benson Center' },
    { id: 2, message: 'Your reservation is ready for pickup' },
    { id: 3, message: 'New event leftovers available' }
  ]);

  // Get user initials
  const userInitials = user?.name ? getUserInitials(user.name) : '';

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      if (!refreshUserData()) {
        console.log('Failed to refresh user data, redirecting to login');
        navigate('/student-login');
        return;
      }

      if (!validateSession()) {
        console.log('Invalid session, redirecting to login');
        navigate('/student-login');
        return;
      }

      setIsLoading(true);
      try {
        if (!user) {
          throw new Error('No user found');
        }

        // Load food items with proper availableCount
        const items = getFoodItems().map(item => ({
          ...item,
          availableCount: item.totalCount || 5, // Fallback if no backend
        }));
        setFoodListings(items);

        // Load user's reservations from localStorage
        const savedReservations = localStorage.getItem(`userReservations_${user.id}`);
        const userReservations = savedReservations 
          ? JSON.parse(savedReservations)
          : reservationService.getUserReservations(user.id, user.email);
        
        console.log('Found reservations:', userReservations.length);

        // Update item availability based on reservations
        const updatedItems = items.map(item => {
          const reservedCount = userReservations.filter(
            (res: { itemDetails?: { id: string } }) => res.itemDetails?.id === item.id
          ).length;
          return {
            ...item,
            availableCount: Math.max(0, item.totalCount - reservedCount)
          };
        });

        setFoodListings(updatedItems);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [user, navigate, validateSession, refreshUserData]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    handleNotificationsClose();
    logout();
    navigate('/student-login');
  };

  const isItemReserved = (itemId: string) => {
    return userReservations.some(res => res.foodListingId === itemId);
  };

  const hasReservationFromSource = (source: string) => {
    return userReservations.some(res => res.source === source);
  };

  const handleReserve = async (id: string) => {
    if (processingReservations.has(id)) return;
    
    console.log('Starting reservation for item:', id);
    console.log('Current foodListings:', foodListings);
    console.log('Current reservation counts:', reservationCounts);
    
    setProcessingReservations(prev => new Set(prev).add(id));
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setErrorMessage(null);

    try {
      const selectedItem = foodListings.find(item => item.id === id);
      
      if (!selectedItem) {
        throw new Error('Item not found. Please try again.');
      }

      console.log('Selected item before reserve:', {
        id: selectedItem.id,
        title: selectedItem.title,
        availableCount: selectedItem.availableCount,
        totalCount: selectedItem.totalCount,
        currentReservations: reservationCounts[id] || 0
      });

      if (!user) {
        throw new Error('You must be logged in to make a reservation');
      }

      if (selectedItem.availableCount <= 0) {
        throw new Error('This item is no longer available');
      }

      if (hasReservationFromSource(selectedItem.source)) {
        throw new Error('You already have a reservation from this location');
      }

      // Create new reservation
      const newReservation = {
        id: Date.now().toString(),
        foodListingId: id,
        source: selectedItem.source,
        timestamp: Date.now(),
        userId: user.id,
        userEmail: user.email,
        itemDetails: {
          id: selectedItem.id,
          title: selectedItem.title,
          location: selectedItem.source,
          pickupTime: selectedItem.pickupTime,
          type: selectedItem.type as 'cafe' | 'event',
          category: getFoodCategory(selectedItem),
        },
      };

      // Add the reservation and persist to localStorage
      addReservation(newReservation);
      const updatedReservations = [...userReservations, newReservation];
      localStorage.setItem(`userReservations_${user.id}`, JSON.stringify(updatedReservations));

      // Update reservation counts
      setReservationCounts(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
      }));

      // Update food listings to decrease available count
      setFoodListings(prevItems => {
        const updatedItems = prevItems.map(item => {
          if (item.id === id) {
            const newCount = Math.max(0, item.totalCount - ((reservationCounts[id] || 0) + 1));
            console.log('Updating item count:', {
              id: item.id,
              oldCount: item.availableCount,
              newCount: newCount,
              totalCount: item.totalCount,
              currentReservations: reservationCounts[id] || 0
            });
            return {
              ...item,
              availableCount: newCount,
              status: newCount === 0 ? 'claimed' as const : 'available' as const,
            };
          }
          return item;
        });
        return updatedItems;
      });

      // Show success state
      setSuccessStates(prev => ({ ...prev, [id]: true }));
      setShowSuccessToast(true);

      // Reset states after animation
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
        setSuccessStates(prev => ({ ...prev, [id]: false }));
        setProcessingReservations(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 2000);
    } catch (error) {
      logReservationError(error, 'handleReserve', { id });
      setErrorMessage(error instanceof Error ? error.message : 'Failed to reserve item');
      setShowErrorToast(true);
      setLoadingStates(prev => ({ ...prev, [id]: false }));
      setProcessingReservations(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleCancelReservation = async (id: string) => {
    if (processingReservations.has(id)) return;
    
    console.log('Starting cancellation for item:', id);
    console.log('Current foodListings:', foodListings);
    console.log('Current reservation counts:', reservationCounts);
    
    setProcessingReservations(prev => new Set(prev).add(id));
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setErrorMessage(null);

    try {
      const selectedItem = foodListings.find(item => item.id === id);
      
      if (!selectedItem) {
        throw new Error('Unable to cancel reservation. Please try again.');
      }

      console.log('Selected item before cancel:', {
        id: selectedItem.id,
        title: selectedItem.title,
        availableCount: selectedItem.availableCount,
        totalCount: selectedItem.totalCount,
        currentReservations: reservationCounts[id] || 0
      });

      // Remove the reservation and update localStorage
      removeReservation(id);
      if (user) {
        const updatedReservations = userReservations.filter(res => res.foodListingId !== id);
        localStorage.setItem(`userReservations_${user.id}`, JSON.stringify(updatedReservations));
      }

      // Update reservation counts
      setReservationCounts(prev => ({
        ...prev,
        [id]: Math.max(0, (prev[id] || 0) - 1)
      }));

      // Update food listings to increase available count
      setFoodListings(prevItems => {
        const updatedItems = prevItems.map(item => {
          if (item.id === id) {
            const newCount = Math.min(item.totalCount, item.totalCount - ((reservationCounts[id] || 0) - 1));
            console.log('Updating item count:', {
              id: item.id,
              oldCount: item.availableCount,
              newCount: newCount,
              totalCount: item.totalCount,
              currentReservations: reservationCounts[id] || 0
            });
            return {
              ...item,
              availableCount: newCount,
              status: 'available' as const,
            };
          }
          return item;
        });
        return updatedItems;
      });

      // Show success state
      setSuccessStates(prev => ({ ...prev, [id]: true }));
      setShowSuccessToast(true);

      // Reset states after animation
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
        setSuccessStates(prev => ({ ...prev, [id]: false }));
        setProcessingReservations(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 2000);
    } catch (error) {
      logReservationError(error, 'handleCancelReservation', { id });
      setErrorMessage(error instanceof Error ? error.message : 'Failed to cancel reservation');
      setShowErrorToast(true);
      setLoadingStates(prev => ({ ...prev, [id]: false }));
      setProcessingReservations(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleYourReservations = () => {
    navigate('/your-reservations');
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getTimeRemaining = (pickupTime: string) => {
    try {
      const [start] = pickupTime.split(' - ');
      const [hours, minutes] = start.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) return null;
      
      const now = new Date();
      const startTime = new Date();
      startTime.setHours(hours, minutes, 0);
      
      const diff = startTime.getTime() - now.getTime();
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hoursLeft < 0) return 'Expired';
      if (hoursLeft === 0 && minutesLeft <= 30) return `⚠️ ${minutesLeft}m left!`;
      if (hoursLeft === 0) return `${minutesLeft}m left`;
      return `${hoursLeft}h ${minutesLeft}m left`;
    } catch (error) {
      return null;
    }
  };

  const getFoodTypeAsset = (item: FoodItem) => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    
    if (title.includes('pastry') || description.includes('pastry') || description.includes('croissant')) {
      return foodTypeAssets.pastries;
    }
    if (title.includes('pizza') || description.includes('pizza')) {
      return foodTypeAssets.pizza;
    }
    if (title.includes('sandwich') || description.includes('sandwich')) {
      return foodTypeAssets.sandwich;
    }
    if (title.includes('wrap') || description.includes('wrap') || description.includes('vegan')) {
      return foodTypeAssets.wrap;
    }
    if (title.includes('coffee') || description.includes('coffee')) {
      return foodTypeAssets.coffee;
    }
    if (title.includes('burrito') || description.includes('burrito')) {
      return foodTypeAssets.burrito;
    }
    if (title.includes('smoothie') || description.includes('smoothie')) {
      return foodTypeAssets.smoothie;
    }
    if (title.includes('bagel') || description.includes('bagel')) {
      return foodTypeAssets.bagel;
    }
    if (title.includes('platter') || description.includes('platter')) {
      return foodTypeAssets.platter;
    }
    if (title.includes('snack') || description.includes('snack')) {
      return foodTypeAssets.snacks;
    }
    if (title.includes('popcorn') || description.includes('popcorn')) {
      return foodTypeAssets.popcorn;
    }
    
    return foodTypeAssets.default;
  };

  // Add helper function to determine food category
  const getFoodCategory = (item: FoodItem): FoodCategory => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    
    if (title.includes('pastry') || description.includes('pastry') || description.includes('croissant')) {
      return 'pastries';
    }
    if (title.includes('pizza') || description.includes('pizza')) {
      return 'pizza';
    }
    if (title.includes('sandwich') || description.includes('sandwich')) {
      return 'sandwich';
    }
    if (title.includes('wrap') || description.includes('wrap') || description.includes('vegan')) {
      return 'wrap';
    }
    if (title.includes('coffee') || description.includes('coffee')) {
      return 'coffee';
    }
    if (title.includes('burrito') || description.includes('burrito')) {
      return 'burrito';
    }
    if (title.includes('smoothie') || description.includes('smoothie')) {
      return 'smoothie';
    }
    if (title.includes('bagel') || description.includes('bagel')) {
      return 'bagel';
    }
    if (title.includes('platter') || description.includes('platter')) {
      return 'platter';
    }
    if (title.includes('snack') || description.includes('snack')) {
      return 'snacks';
    }
    if (title.includes('popcorn') || description.includes('popcorn')) {
      return 'popcorn';
    }
    
    return 'default';
  };

  // Group food items by location
  const groupedItems = ALL_LOCATIONS.reduce((acc, location) => {
    acc[location.id] = {
      ...location,
      items: ALL_FOOD_ITEMS.filter(item => item.locationId === location.id),
    };
    return acc;
  }, {} as { [key: string]: Location & { items: FoodItem[] } });

  // Group locations by main building
  const buildingGroups = ALL_LOCATIONS.reduce((acc, location) => {
    if (!acc[location.location]) {
      acc[location.location] = [];
    }
    acc[location.location].push(location);
    return acc;
  }, {} as { [key: string]: Location[] });

  // Sort locations within each building
  Object.keys(buildingGroups).forEach(building => {
    buildingGroups[building].sort((a: Location, b: Location) => a.name.localeCompare(b.name));
  });

  function getFoodItems(): FoodItem[] {
    return ALL_FOOD_ITEMS;
  }

  const handleCloseDialog = () => setIsConfirmDialogOpen(false);
  const handleConfirmReservation = () => {
    if (!selectedItem || !user) return;
    
    const newReservation = {
      id: Date.now().toString(),
      foodListingId: selectedItem.id,
      source: selectedItem.source,
      timestamp: Date.now(),
      userId: user.id,
      userEmail: user.email,
      itemDetails: {
        id: selectedItem.id,
        title: selectedItem.title,
        location: selectedItem.source,
        pickupTime: selectedItem.pickupTime,
        type: selectedItem.type as 'cafe' | 'event',
        category: getFoodCategory(selectedItem),
      },
    };

    addReservation(newReservation);
    setIsConfirmDialogOpen(false);
    setShowSuccessToast(true);
  };

  // Add useEffect to monitor foodListings changes
  useEffect(() => {
    console.log('foodListings state updated:', foodListings);
    // Log the available count for a specific item, e.g., 'event-club-fair-leftovers'
    const clubFairItem = foodListings.find(item => item.id === 'event-club-fair-leftovers');
    if (clubFairItem) {
      console.log(`Club Fair Leftovers available count in state: ${clubFairItem.availableCount}`);
    }
  }, [foodListings]);

  // Add useEffect to monitor reservation counts
  useEffect(() => {
    console.log('reservationCounts updated:', reservationCounts);
  }, [reservationCounts]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Fixed Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: SCU_RED,
          boxShadow: 2,
          animation: `${fadeIn} 0.5s ease-out`,
          zIndex: theme.zIndex.drawer + 1,
          width: '100vw',
          borderRadius: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          px: { xs: 1, sm: 2 },
        }}>
          {/* Left side: Logo and User Initials */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
            }}>
              <LocalDiningIcon 
                sx={{ 
                  color: BRAND_GREEN,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }} 
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  color: BRAND_GREEN,
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                CampusConnect
              </Typography>
            </Box>

            <Tooltip title={user?.name || 'User'}>
              <Avatar
                sx={{
                  bgcolor: BRAND_GREEN,
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {userInitials}
              </Avatar>
            </Tooltip>
          </Box>

          {/* Right side: Reservations, Notifications, Logout */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
          }}>
            <Button
              onClick={handleYourReservations}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                minWidth: 'auto',
                px: 1.5,
                display: { xs: 'none', sm: 'block' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  textDecoration: 'underline',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Your Reservations
            </Button>

            <Tooltip title="Notifications">
              <IconButton
                color="inherit" 
                onClick={handleNotificationsOpen}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                }}
              >
                <Badge 
                  badgeContent={notifications.length} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#fff',
                      color: SCU_RED,
                      fontWeight: 'bold',
                    }
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 3, 
          mb: 4,
          pt: 8,
          maxWidth: '1200px !important',
        }}
      >
        {/* Events Section */}
        {buildingGroups['Events'] && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                color: SCU_RED, 
                fontWeight: 600, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EventIcon />
              Events
            </Typography>
            
            <Grid container spacing={3}>
              {buildingGroups['Events'].map((location) => {
                const items = groupedItems[location.id]?.items || [];
                if (items.length === 0 && !showEmptyLocations) return null;

                return (
                  <React.Fragment key={location.id}>
                    {items.length > 0 ? (
                      items.map((item) => {
                        const timeRemaining = getTimeRemaining(item.pickupTime);
                        const foodTypeAsset = imageErrors[item.id] ? foodTypeAssets.default : getFoodTypeAsset(item);
                        const isUrgent = timeRemaining?.includes('⚠️');
                        const isItemAvailable = item.availableCount > 0;
                        const isReserved = isItemReserved(item.id);
                        const hasReservedFromSource = hasReservationFromSource(item.source);

                        return (
                          <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card 
                              sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                animation: `${fadeIn} 0.5s ease-out`,
                                transition: 'all 0.3s ease-in-out',
                                borderRadius: '16px',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: 4,
                                },
                                bgcolor: isReserved ? alpha(SCU_RED, 0.05) : 'white',
                              }}
                            >
                              <Box sx={{ position: 'relative', height: 160 }}>
                                <CardMedia
                                  component="img"
                                  height="160"
                                  image={foodTypeAsset.image}
                                  alt={foodTypeAsset.alt}
                                  onError={() => handleImageError(item.id)}
                                  sx={{
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '16px',
                                    borderTopRightRadius: '16px',
                                    height: '160px',
                                    width: '100%',
                                  }}
                                />
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                  }}
                                >
                                  {timeRemaining && (
                                    <Chip
                                      icon={isUrgent ? <WarningIcon /> : <TimerIcon />}
                                      label={timeRemaining}
                                      size="small"
                                      sx={{
                                        bgcolor: isUrgent ? alpha(SCU_RED, 0.9) : alpha(SCU_RED, 0.8),
                                        color: 'white',
                                        '& .MuiChip-icon': { color: 'white' },
                                        fontWeight: isUrgent ? 700 : 500,
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                              <CardContent 
                                sx={{ 
                                  flexGrow: 1, 
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  minHeight: 200,
                                }}
                              >
                                <Box>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="h6" component="h2" sx={{ color: SCU_RED, fontWeight: 600, fontSize: '1rem' }}>
                                      {item.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      {isReserved && (
                                        <Chip
                                          icon={<CheckCircleIcon />}
                                          label="Reserved"
                                          size="small"
                                          sx={{
                                            bgcolor: BRAND_GREEN,
                                            color: 'white',
                                            '& .MuiChip-icon': { color: 'white' },
                                            animation: `${fadeIn} 0.3s ease-out`,
                                          }}
                                        />
                                      )}
                                      <Chip
                                        label={item.availableCount > 0 ? `${item.availableCount} left` : 'Sold Out'}
                                        size="small"
                                        sx={{
                                          bgcolor: item.availableCount > 0 ? alpha(SCU_RED, 0.1) : '#e0e0e0',
                                          color: item.availableCount > 0 ? SCU_RED : '#757575',
                                          fontWeight: 500,
                                          animation: loadingStates[item.id] ? `${pulse} 0.5s ease-in-out` : 'none',
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                  <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 1 }}>
                                    {item.description}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                      {location.name}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <AccessTimeIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                                  <Typography variant="body2" color="text.secondary">
                                    Pickup: {item.pickupTime}
                                  </Typography>
                                </Box>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  disabled={!isItemAvailable || loadingStates[item.id] || isItemReserved(item.id)}
                                  onClick={() => handleReserve(item.id)}
                                  sx={{
                                    bgcolor: isItemReserved(item.id)
                                      ? '#e0e0e0'
                                      : isItemAvailable 
                                        ? BRAND_GREEN 
                                        : '#e0e0e0',
                                    color: isItemReserved(item.id)
                                      ? '#757575'
                                      : 'white',
                                    py: 1.5,
                                    px: 2,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    '&:hover': {
                                      bgcolor: isItemReserved(item.id)
                                        ? '#e0e0e0'
                                        : isItemAvailable
                                          ? '#4a8a4a'
                                          : '#e0e0e0',
                                    },
                                    '&:disabled': {
                                      bgcolor: isItemReserved(item.id)
                                        ? '#e0e0e0'
                                        : alpha(SCU_RED, 0.3),
                                      color: isItemReserved(item.id)
                                        ? '#757575'
                                        : 'white',
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                    position: 'relative',
                                  }}
                                >
                                  {loadingStates[item.id] ? (
                                    <>
                                      <CircularProgress
                                        size={20}
                                        sx={{
                                          color: 'white',
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          marginTop: '-10px',
                                          marginLeft: '-10px',
                                          animation: `${spin} 1s linear infinite`,
                                        }}
                                      />
                                      <span style={{ visibility: 'hidden' }}>Reserve Now</span>
                                    </>
                                  ) : successStates[item.id] ? (
                                    <CheckCircleIcon
                                      sx={{
                                        animation: `${checkmark} 0.5s ease-out`,
                                        fontSize: 20,
                                      }}
                                    />
                                  ) : isItemReserved(item.id) ? (
                                    <Tooltip title="You have already reserved this item">
                                      <span>
                                        Already Reserved
                                      </span>
                                    </Tooltip>
                                  ) : isItemAvailable ? (
                                    'Reserve Now'
                                  ) : (
                                    'Sold Out'
                                  )}
                                </Button>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })
                    ) : showEmptyLocations && (
                      <Grid item xs={12}>
                        <Box 
                          sx={{ 
                            p: 2,
                            bgcolor: 'white',
                            borderRadius: '16px',
                            boxShadow: 1,
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              fontStyle: 'italic',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            {location.icon}
                            {location.name} - No items currently available
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Cafés Section */}
        {Object.entries(buildingGroups)
          .filter(([building]) => building !== 'Events')
          .map(([building, locations]) => {
            const hasItems = locations.some(loc => (groupedItems[loc.id]?.items || []).length > 0);
            if (!hasItems && !showEmptyLocations) return null;

            return (
              <Box key={building} sx={{ mb: 4 }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    color: SCU_RED, 
                    fontWeight: 600, 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <LocationOnIcon />
                  {building}
                </Typography>
                
                <Grid container spacing={3}>
                  {locations.map((location) => {
                    const items = groupedItems[location.id]?.items || [];
                    if (items.length === 0 && !showEmptyLocations) return null;

                    return (
                      <React.Fragment key={location.id}>
                        {items.length > 0 ? (
                          items.map((item) => {
                            const timeRemaining = getTimeRemaining(item.pickupTime);
                            const foodTypeAsset = imageErrors[item.id] ? foodTypeAssets.default : getFoodTypeAsset(item);
                            const isUrgent = timeRemaining?.includes('⚠️');
                            const isItemAvailable = item.availableCount > 0;
                            const isReserved = isItemReserved(item.id);
                            const hasReservedFromSource = hasReservationFromSource(item.source);

                            return (
                              <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card 
                                  sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    animation: `${fadeIn} 0.5s ease-out`,
                                    transition: 'all 0.3s ease-in-out',
                                    borderRadius: '16px',
                                    '&:hover': {
                                      transform: 'translateY(-4px)',
                                      boxShadow: 4,
                                    },
                                    bgcolor: isReserved ? alpha(SCU_RED, 0.05) : 'white',
                                  }}
                                >
                                  <Box sx={{ position: 'relative', height: 160 }}>
                                    <CardMedia
                                      component="img"
                                      height="160"
                                      image={foodTypeAsset.image}
                                      alt={foodTypeAsset.alt}
                                      onError={() => handleImageError(item.id)}
                                      sx={{
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '16px',
                                        borderTopRightRadius: '16px',
                                        height: '160px',
                                        width: '100%',
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                      }}
                                    >
                                      {timeRemaining && (
                                        <Chip
                                          icon={isUrgent ? <WarningIcon /> : <TimerIcon />}
                                          label={timeRemaining}
                                          size="small"
                                          sx={{
                                            bgcolor: isUrgent ? alpha(SCU_RED, 0.9) : alpha(SCU_RED, 0.8),
                                            color: 'white',
                                            '& .MuiChip-icon': { color: 'white' },
                                            fontWeight: isUrgent ? 700 : 500,
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                  <CardContent 
                                    sx={{ 
                                      flexGrow: 1, 
                                      p: 2,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'space-between',
                                      minHeight: 200,
                                    }}
                                  >
                                    <Box>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" component="h2" sx={{ color: SCU_RED, fontWeight: 600, fontSize: '1rem' }}>
                                          {item.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          {isReserved && (
                                            <Chip
                                              icon={<CheckCircleIcon />}
                                              label="Reserved"
                                              size="small"
                                              sx={{
                                                bgcolor: BRAND_GREEN,
                                                color: 'white',
                                                '& .MuiChip-icon': { color: 'white' },
                                                animation: `${fadeIn} 0.3s ease-out`,
                                              }}
                                            />
                                          )}
                                          <Chip
                                            label={item.availableCount > 0 ? `${item.availableCount} left` : 'Sold Out'}
                                            size="small"
                                            sx={{
                                              bgcolor: item.availableCount > 0 ? alpha(SCU_RED, 0.1) : '#e0e0e0',
                                              color: item.availableCount > 0 ? SCU_RED : '#757575',
                                              fontWeight: 500,
                                              animation: loadingStates[item.id] ? `${pulse} 0.5s ease-in-out` : 'none',
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 1 }}>
                                        {item.description}
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                                          {location.name}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                      <AccessTimeIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                                      <Typography variant="body2" color="text.secondary">
                                        Pickup: {item.pickupTime}
                                      </Typography>
                                    </Box>
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      disabled={!isItemAvailable || loadingStates[item.id] || isItemReserved(item.id)}
                                      onClick={() => handleReserve(item.id)}
                                      sx={{
                                        bgcolor: isItemReserved(item.id)
                                          ? '#e0e0e0'
                                          : isItemAvailable 
                                            ? BRAND_GREEN 
                                            : '#e0e0e0',
                                        color: isItemReserved(item.id)
                                          ? '#757575'
                                          : 'white',
                                        py: 1.5,
                                        px: 2,
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        '&:hover': {
                                          bgcolor: isItemReserved(item.id)
                                            ? '#e0e0e0'
                                            : isItemAvailable
                                              ? '#4a8a4a'
                                              : '#e0e0e0',
                                        },
                                        '&:disabled': {
                                          bgcolor: isItemReserved(item.id)
                                            ? '#e0e0e0'
                                            : alpha(SCU_RED, 0.3),
                                          color: isItemReserved(item.id)
                                            ? '#757575'
                                            : 'white',
                                        },
                                        transition: 'all 0.3s ease-in-out',
                                        position: 'relative',
                                      }}
                                    >
                                      {loadingStates[item.id] ? (
                                        <>
                                          <CircularProgress
                                            size={20}
                                            sx={{
                                              color: 'white',
                                              position: 'absolute',
                                              top: '50%',
                                              left: '50%',
                                              marginTop: '-10px',
                                              marginLeft: '-10px',
                                              animation: `${spin} 1s linear infinite`,
                                            }}
                                          />
                                          <span style={{ visibility: 'hidden' }}>Reserve Now</span>
                                        </>
                                      ) : successStates[item.id] ? (
                                        <CheckCircleIcon
                                          sx={{
                                            animation: `${checkmark} 0.5s ease-out`,
                                            fontSize: 20,
                                          }}
                                        />
                                      ) : isItemReserved(item.id) ? (
                                        <Tooltip title="You have already reserved this item">
                                          <span>
                                            Already Reserved
                                          </span>
                                        </Tooltip>
                                      ) : isItemAvailable ? (
                                        'Reserve Now'
                                      ) : (
                                        'Sold Out'
                                      )}
                                    </Button>
                                  </CardContent>
                                </Card>
                              </Grid>
                            );
                          })
                        ) : showEmptyLocations && (
                          <Grid item xs={12}>
                            <Box 
                              sx={{ 
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: '16px',
                                boxShadow: 1,
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                  fontStyle: 'italic',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                }}
                              >
                                {location.icon}
                                {location.name} - No items currently available
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}

        {/* Empty locations toggle */}
        {Object.values(buildingGroups)
          .filter(locations => locations.some(loc => (groupedItems[loc.id]?.items || []).length === 0))
          .length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => setShowEmptyLocations(!showEmptyLocations)}
              startIcon={showEmptyLocations ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{
                color: SCU_RED,
                '&:hover': {
                  bgcolor: alpha(SCU_RED, 0.1),
                },
              }}
            >
              {showEmptyLocations ? 'Hide Empty Locations' : 'Show All Locations'}
            </Button>
          </Box>
        )}

        {/* Scroll to Top Button */}
        <Zoom in={showScrollTop}>
          <Fab
            color="primary"
            size="small"
            onClick={handleScrollTop}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              bgcolor: SCU_RED,
              '&:hover': {
                bgcolor: '#7a0000',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
      </Container>

      {/* Success Toast */}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessToast(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: BRAND_GREEN,
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          Successfully reserved! Check your notifications for pickup details.
        </Alert>
      </Snackbar>

      {/* Error Toast */}
      <Snackbar
        open={showErrorToast}
        autoHideDuration={3000}
        onClose={() => setShowErrorToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowErrorToast(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            bgcolor: SCU_RED,
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' },
          }}
        >
          ⚠️ {errorMessage || 'Unable to reserve item. Please try again.'}
        </Alert>
      </Snackbar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 300,
            maxHeight: 400,
            boxShadow: 3,
            animation: `${fadeIn} 0.2s ease-out`,
          }
        }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="subtitle2" sx={{ color: SCU_RED, fontWeight: 600 }}>
            New food available at Benson Center
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="subtitle2" sx={{ color: SCU_RED, fontWeight: 600 }}>
            Your reservation is ready for pickup
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="subtitle2" sx={{ color: SCU_RED, fontWeight: 600 }}>
            New event leftovers available
          </Typography>
        </MenuItem>
      </Menu>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Reservation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reserve this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmReservation} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StudentDashboard; 