import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import FoodNotificationCard from '../components/FoodNotificationCard';

// Mock data for available food items
const mockFoodItems = [
  {
    id: '1',
    name: 'Chocolate Croissant',
    description: 'Freshly baked croissant with chocolate filling.',
    quantity: 8,
    location: 'Mission Bakery',
    pickupTime: '8:00 AM',
    expiryTime: '10:00 AM',
  },
  {
    id: '2',
    name: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast with lettuce and tomato on a bun.',
    quantity: 5,
    location: 'The Fire Grill',
    pickupTime: '12:00 PM',
    expiryTime: '2:00 PM',
  },
  {
    id: '3',
    name: 'Pepperoni Pizza Slice',
    description: 'Classic pepperoni pizza by the slice.',
    quantity: 10,
    location: 'The Slice',
    pickupTime: '11:30 AM',
    expiryTime: '1:30 PM',
  },
  {
    id: '4',
    name: 'Chicken Tikka Masala',
    description: 'Indian-style chicken in creamy tomato sauce.',
    quantity: 6,
    location: 'The Spice Market',
    pickupTime: '12:30 PM',
    expiryTime: '2:30 PM',
  },
  {
    id: '5',
    name: 'Korean BBQ Beef Bowl',
    description: 'Marinated beef with rice and veggies.',
    quantity: 7,
    location: 'The Global Grill',
    pickupTime: '1:00 PM',
    expiryTime: '3:00 PM',
  },
  {
    id: '6',
    name: 'Carne Asada Tacos',
    description: 'Two tacos with grilled steak, onions, and cilantro.',
    quantity: 9,
    location: 'La Parilla',
    pickupTime: '12:00 PM',
    expiryTime: '2:00 PM',
  },
  {
    id: '7',
    name: 'California Roll',
    description: 'Sushi roll with crab, avocado, and cucumber.',
    quantity: 12,
    location: 'Sushi',
    pickupTime: '11:00 AM',
    expiryTime: '1:00 PM',
  },
  {
    id: '8',
    name: "Chef's Special Pasta",
    description: 'Rotating pasta dish from the chef.',
    quantity: 4,
    location: "The Chef's Table",
    pickupTime: '12:30 PM',
    expiryTime: '2:30 PM',
  },
  {
    id: '9',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
    quantity: 8,
    location: 'Trattoria',
    pickupTime: '11:30 AM',
    expiryTime: '1:30 PM',
  },
  {
    id: '10',
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, chickpeas, roasted veggies, and tahini.',
    quantity: 6,
    location: 'Simply Oasis',
    pickupTime: '12:00 PM',
    expiryTime: '2:00 PM',
  },
  {
    id: '11',
    name: 'Acai Bowl',
    description: 'Acai puree with granola, banana, and berries.',
    quantity: 5,
    location: 'Acai',
    pickupTime: '9:00 AM',
    expiryTime: '11:00 AM',
  },
  {
    id: '12',
    name: 'Breakfast Burrito',
    description: 'Eggs, cheese, and sausage in a flour tortilla.',
    quantity: 7,
    location: 'Sunstream Cafe',
    pickupTime: '8:00 AM',
    expiryTime: '10:00 AM',
  },
  {
    id: '13',
    name: 'Chicken Caesar Wrap',
    description: 'Grilled chicken, romaine, and Caesar dressing.',
    quantity: 6,
    location: 'Cadence',
    pickupTime: '11:00 AM',
    expiryTime: '1:00 PM',
  },
  {
    id: '14',
    name: 'Fresh Fruit Cup',
    description: 'Seasonal fruit mix.',
    quantity: 10,
    location: 'Fresh Bytes',
    pickupTime: '9:30 AM',
    expiryTime: '11:30 AM',
  },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foodItems, setFoodItems] = useState(mockFoodItems);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Tab navigation state
  const currentTab = location.pathname === '/events' ? 1 : 0;

  const handleLogout = () => {
    // Add any logout logic here (clearing tokens, etc.)
    navigate('/');
  };

  const handleReserve = (id: string, quantity: number) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - quantity }
          : item
      )
    );

    setNotification({
      open: true,
      message: 'Food reserved successfully!',
      severity: 'success',
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'secondary.main', fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 'bold' }}>
            CampusConnect
          </Typography>
          <RestaurantMenuIcon sx={{ mr: 2, color: 'secondary.main', fontSize: { xs: 28, sm: 32 } }} />
          <IconButton
            color="secondary"
            onClick={() => navigate('/reservations')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={2} color="secondary">
              <NotificationsIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </Badge>
          </IconButton>
          <IconButton
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 1 }}
          >
            <LogoutIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
          </IconButton>
        </Toolbar>
        <Tabs
          value={currentTab}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            if (newValue === 0) navigate('/student');
            else if (newValue === 1) navigate('/events');
          }}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
          sx={{ bgcolor: 'background.paper' }}
        >
          <Tab label="Cafés" />
          <Tab label="Events" />
        </Tabs>
      </AppBar>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          Available Food Listings
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {foodItems.map((item) => (
            <Grid component="div" item xs={12} sm={6} md={4} key={item.id}>
              <FoodNotificationCard
                name={item.name}
                description={item.description}
                quantity={item.quantity}
                location={item.location}
                pickupTime={item.pickupTime}
                expiryTime={item.expiryTime}
                onReserve={(quantity: number) => handleReserve(item.id, quantity)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StudentDashboard; 