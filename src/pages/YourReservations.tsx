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
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon,
  Cancel as CancelIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

// Import food images
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

const SCU_RED = '#990000';

// Food type assets mapping
const foodTypeAssets = {
  pastries: { image: pastriesImage, alt: 'Fresh assorted pastries' },
  pizza: { image: pizzaImage, alt: 'Pepperoni pizza slices' },
  sandwich: { image: sandwichImage, alt: 'Grilled chicken sandwich' },
  wrap: { image: wrapImage, alt: 'Fresh vegan wraps' },
  coffee: { image: coffeeImage, alt: 'Freshly brewed coffee' },
  burrito: { image: burritoImage, alt: 'Breakfast burrito' },
  smoothie: { image: smoothieImage, alt: 'Smoothie bowl' },
  bagel: { image: bagelImage, alt: 'Fresh assorted bagels' },
  platter: { image: platterImage, alt: 'Sandwich platter' },
  snacks: { image: snacksImage, alt: 'Assorted healthy snacks' },
  popcorn: { image: popcornImage, alt: 'Fresh popcorn and drinks' },
  default: { image: defaultFoodImage, alt: 'Food item' },
};

// Add type for food category
type FoodCategory = 'pizza' | 'sandwich' | 'wrap' | 'coffee' | 'burrito' | 'smoothie' | 'bagel' | 'platter' | 'snacks' | 'popcorn' | 'pastries' | 'default';

function YourReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    // Get reservations from localStorage
    const storedReservations = localStorage.getItem('userReservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  const handleBack = () => {
    navigate('/welcome');
  };

  const handleCancelClick = (id: string) => {
    setSelectedReservation(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      // Remove reservation from localStorage
      const updatedReservations = reservations.filter(res => res.id !== selectedReservation);
      localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
      setReservations(updatedReservations);
      setIsConfirmDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false);
    setSelectedReservation(null);
  };

  // Update getFoodImage function with proper type checking
  const getFoodImage = (title: string | undefined | null) => {
    if (!title || typeof title !== 'string') {
      return foodTypeAssets.default;
    }

    const titleLower = title.toLowerCase().trim();
    
    if (titleLower.includes('pastry') || titleLower.includes('croissant')) return foodTypeAssets.pastries;
    if (titleLower.includes('pizza')) return foodTypeAssets.pizza;
    if (titleLower.includes('sandwich')) return foodTypeAssets.sandwich;
    if (titleLower.includes('wrap') || titleLower.includes('vegan')) return foodTypeAssets.wrap;
    if (titleLower.includes('coffee')) return foodTypeAssets.coffee;
    if (titleLower.includes('burrito')) return foodTypeAssets.burrito;
    if (titleLower.includes('smoothie')) return foodTypeAssets.smoothie;
    if (titleLower.includes('bagel')) return foodTypeAssets.bagel;
    if (titleLower.includes('platter')) return foodTypeAssets.platter;
    if (titleLower.includes('snack')) return foodTypeAssets.snacks;
    if (titleLower.includes('popcorn')) return foodTypeAssets.popcorn;
    return foodTypeAssets.default;
  };

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

        {reservations.length === 0 ? (
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
            {reservations.map((reservation) => {
              const foodImage = getFoodImage(reservation.itemDetails?.title || reservation.title);
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
                    <CardMedia
                      component="img"
                      image={foodImage.image}
                      alt={foodImage.alt}
                      sx={{
                        width: { xs: '100%', sm: 200 },
                        height: { xs: 160, sm: 'auto' },
                        objectFit: 'cover',
                        borderTopLeftRadius: { xs: '8px', sm: '8px' },
                        borderTopRightRadius: { xs: '8px', sm: 0 },
                        borderBottomLeftRadius: { xs: 0, sm: '8px' },
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = defaultFoodImage;
                      }}
                    />
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
                          {reservation.title}
                        </Typography>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {reservation.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: SCU_RED, mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              Pickup: {reservation.pickupTime}
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
            Are you sure you want to cancel this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
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
    </Box>
  );
}

export default YourReservations; 