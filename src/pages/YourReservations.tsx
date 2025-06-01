/**
 * YourReservations.tsx
 * Displays and manages user's food reservations
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
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  keyframes,
  CardMedia,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon,
  Cancel as CancelIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { reservationService, type Reservation } from '../services/ReservationService';
import { useReservations } from '../contexts/ReservationContext';

// Comment out or remove these imports:
// import pizzaImage from '../assets/pizza.jpg';
// import sandwichImage from '../assets/sandwich.jpg';
// import wrapImage from '../assets/wrap.jpg';
// import coffeeImage from '../assets/coffee.jpg';
// import burritoImage from '../assets/burrito.jpg';
// import smoothieImage from '../assets/smoothie.jpg';
// import bagelImage from '../assets/bagel.jpg';
// import platterImage from '../assets/platter.jpg';
// import snacksImage from '../assets/snacks.jpg';
// import popcornImage from '../assets/popcorn.jpg';
// import pastriesImage from '../assets/pastries.jpg';

// Constants
const SCU_RED = '#990000';
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Food type assets mapping
const foodTypeAssets = {
  default: { image: '', alt: 'Food item' },
};

// Add type for food category
type FoodCategory = 'pizza' | 'sandwich' | 'wrap' | 'coffee' | 'burrito' | 'smoothie' | 'bagel' | 'platter' | 'snacks' | 'popcorn' | 'pastries' | 'default';

function YourReservations() {
  const navigate = useNavigate();
  const { user, validateSession, refreshUserData } = useAuth();
  const { userReservations, removeReservation } = useReservations();
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndLoadReservations = async () => {
      // First try to refresh user data
      if (!refreshUserData()) {
        console.log('Failed to refresh user data, redirecting to login');
        navigate('/student-login');
        return;
      }

      // Then validate the session
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
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading reservations:', err);
        setError('Failed to load reservations');
        setIsLoading(false);
      }
    };

    checkAuthAndLoadReservations();
  }, [user, navigate, validateSession, refreshUserData]);

  const handleBack = () => {
    navigate('/student');
  };

  const handleCancelClick = (id: string) => {
    if (!user) {
      console.log('No user found when trying to cancel reservation');
      setError('You must be logged in to cancel reservations');
      return;
    }

    const reservation = userReservations.find(res => res.id === id);
    if (!reservation) {
      console.log('Reservation not found:', id);
      setError('Reservation not found');
      return;
    }

    if (reservation.userEmail !== user.email || reservation.userId !== user.id) {
      console.log('Unauthorized cancellation attempt:', {
        reservationUser: reservation.userEmail,
        currentUser: user.email,
      });
      setError('You do not have permission to cancel this reservation');
      return;
    }

    setSelectedReservation(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (!selectedReservation || !user) {
      console.log('Invalid cancellation attempt - no reservation or user');
      return;
    }

    try {
      console.log('Cancelling reservation:', selectedReservation);
      
      // Remove the reservation
      removeReservation(selectedReservation);
      setSuccessMessage('Reservation cancelled successfully');
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      setError('Failed to cancel reservation');
    } finally {
      setIsConfirmDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  // Update getFoodImage function with proper type checking
  const getFoodImage = () => foodTypeAssets.default;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: SCU_RED,
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Your Reservations
          </Typography>
        </Box>
        <Button
          variant="text"
          color="inherit"
          startIcon={<DashboardIcon />}
          onClick={handleBack}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            color: SCU_RED,
            fontWeight: 600,
            mb: 4,
            animation: `${fadeIn} 0.5s ease-out`,
          }}
        >
          Your Reservations
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : userReservations.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              animation: `${fadeIn} 0.5s ease-out`,
            }}
          >
            <RestaurantIcon
              sx={{
                fontSize: '4rem',
                color: SCU_RED,
                mb: 2,
                opacity: 0.8,
                animation: `${fadeIn} 0.8s ease-out`,
              }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              You haven't reserved anything yet.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Check out available food listings!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{
                bgcolor: SCU_RED,
                py: 1.5,
                px: 4,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#7a0000',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {userReservations.map((reservation) => {
              const foodImage = getFoodImage();
              return (
                <Grid item xs={12} key={reservation.id}>
                  <Card
                    sx={{
                      animation: `${fadeIn} 0.5s ease-out`,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      overflow: 'hidden',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ width: 120, height: 120, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                      <RestaurantIcon sx={{ fontSize: 48, color: '#ccc' }} />
                    </Box>
                    <CardContent
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ color: SCU_RED, fontWeight: 600, mb: 1 }}>
                          {reservation.itemDetails?.title}
                        </Typography>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {reservation.itemDetails?.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              Pickup: {reservation.itemDetails?.pickupTime}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleCancelClick(reservation.id)}
                          sx={{
                            bgcolor: SCU_RED,
                            minWidth: { xs: '100%', sm: 'auto' },
                            py: 1,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: '#7a0000',
                              transform: 'translateY(-1px)',
                              boxShadow: 2,
                            },
                          }}
                        >
                          Cancel Reservation
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title" sx={{ color: SCU_RED }}>
          Cancel Reservation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel this reservation? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Keep Reservation
          </Button>
          <Button
            onClick={handleConfirmCancel}
            variant="contained"
            color="error"
            sx={{
              bgcolor: SCU_RED,
              '&:hover': {
                bgcolor: '#7a0000',
              },
            }}
          >
            Yes, Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default YourReservations; 