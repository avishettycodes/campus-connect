import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Snackbar,
  Alert,
  Container,
  IconButton,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Mock data for food items
const mockFoodItems = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    quantity: 8,
    location: 'Mission Bakery',
    expiryTime: '10:00 AM',
    description: 'Freshly baked croissant with chocolate filling.',
  },
  {
    id: 2,
    name: 'Grilled Chicken Sandwich',
    quantity: 5,
    location: 'The Fire Grill',
    expiryTime: '2:00 PM',
    description: 'Grilled chicken breast with lettuce and tomato on a bun.',
  },
  {
    id: 3,
    name: 'Pepperoni Pizza Slice',
    quantity: 10,
    location: 'The Slice',
    expiryTime: '1:30 PM',
    description: 'Classic pepperoni pizza by the slice.',
  },
  {
    id: 4,
    name: 'Chicken Tikka Masala',
    quantity: 6,
    location: 'The Spice Market',
    expiryTime: '2:30 PM',
    description: 'Indian-style chicken in creamy tomato sauce.',
  },
  {
    id: 5,
    name: 'Korean BBQ Beef Bowl',
    quantity: 7,
    location: 'The Global Grill',
    expiryTime: '3:00 PM',
    description: 'Marinated beef with rice and veggies.',
  },
  {
    id: 6,
    name: 'Carne Asada Tacos',
    quantity: 9,
    location: 'La Parilla',
    expiryTime: '2:00 PM',
    description: 'Two tacos with grilled steak, onions, and cilantro.',
  },
  {
    id: 7,
    name: 'California Roll',
    quantity: 12,
    location: 'Sushi',
    expiryTime: '1:00 PM',
    description: 'Sushi roll with crab, avocado, and cucumber.',
  },
  {
    id: 8,
    name: "Chef's Special Pasta",
    quantity: 4,
    location: "The Chef's Table",
    expiryTime: '2:30 PM',
    description: 'Rotating pasta dish from the chef.',
  },
  {
    id: 9,
    name: 'Margherita Pizza',
    quantity: 8,
    location: 'Trattoria',
    expiryTime: '1:30 PM',
    description: 'Classic pizza with tomato, mozzarella, and basil.',
  },
  {
    id: 10,
    name: 'Vegan Buddha Bowl',
    quantity: 6,
    location: 'Simply Oasis',
    expiryTime: '2:00 PM',
    description: 'Quinoa, chickpeas, roasted veggies, and tahini.',
  },
  {
    id: 11,
    name: 'Acai Bowl',
    quantity: 5,
    location: 'Acai',
    expiryTime: '11:00 AM',
    description: 'Acai puree with granola, banana, and berries.',
  },
  {
    id: 12,
    name: 'Breakfast Burrito',
    quantity: 7,
    location: 'Sunstream Cafe',
    expiryTime: '10:00 AM',
    description: 'Eggs, cheese, and sausage in a flour tortilla.',
  },
  {
    id: 13,
    name: 'Chicken Caesar Wrap',
    quantity: 6,
    location: 'Cadence',
    expiryTime: '1:00 PM',
    description: 'Grilled chicken, romaine, and Caesar dressing.',
  },
  {
    id: 14,
    name: 'Fresh Fruit Cup',
    quantity: 10,
    location: 'Fresh Bytes',
    expiryTime: '11:30 AM',
    description: 'Seasonal fruit mix.',
  },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState(mockFoodItems);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    expiryTime: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...formData,
      quantity: parseInt(formData.quantity),
    };
    setFoodItems(prev => [...prev, newItem]);
    setFormData({
      name: '',
      quantity: '',
      location: '',
      expiryTime: '',
      description: '',
    });
    setNotification({
      open: true,
      message: 'Food item added successfully!',
    });
  };

  const handleDelete = (id: number) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
    setNotification({
      open: true,
      message: 'Food item deleted successfully!',
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 2,
        pb: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            bgcolor: 'background.paper',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Back
            </Button>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                flex: 1,
                textAlign: 'center',
                mr: 4,
              }}
            >
              Admin Dashboard
            </Typography>
          </Box>
        </Paper>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            animation: 'fadeIn 0.5s ease-out',
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Add New Food Listing
          </Typography>
          <Stack spacing={2}>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Food Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid component="div" item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Expiry Time"
                name="expiryTime"
                value={formData.expiryTime}
                onChange={handleInputChange}
                variant="outlined"
                placeholder="e.g., 2 hours"
              />
            </Grid>
            <Grid component="div" item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid component="div" item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Add Food Item
              </Button>
            </Grid>
          </Stack>
        </Paper>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Current Listings
        </Typography>

        <Stack spacing={3}>
          {foodItems.map((item, index) => (
            <Paper
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 3,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                '@keyframes fadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  color="error"
                  sx={{
                    '&:hover': {
                      bgcolor: 'error.light',
                      color: 'white',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Location: {item.location}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Expires: {item.expiryTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>

        {foodItems.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No food items listed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add new food items using the form above
            </Typography>
          </Box>
        )}
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminDashboard; 