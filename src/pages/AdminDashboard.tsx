import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Card,
  CardContent,
  keyframes,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// Mock data for food listings
const mockFoodListings = [
  { id: 1, name: 'Chicken Sandwich', location: 'Mission Bakery', quantity: 15 },
  { id: 2, name: 'Vegetable Pasta', location: 'The Fire Grill', quantity: 8 },
  { id: 3, name: 'Caesar Salad', location: 'The Slice', quantity: 12 },
  { id: 4, name: 'Fruit Bowl', location: 'Fresh Bytes', quantity: 10 },
];

// Mock data for event leftovers
const mockEventLeftovers = [
  { id: 1, eventName: 'Career Fair', foodType: 'Sandwiches', quantity: 25 },
  { id: 2, eventName: 'Orientation', foodType: 'Pizza', quantity: 30 },
  { id: 3, eventName: 'Club Meeting', foodType: 'Cookies', quantity: 50 },
  { id: 4, eventName: 'Workshop', foodType: 'Fruit Platter', quantity: 15 },
];

// Mock data for student reservations
const mockStudentReservations = [
  { id: 1, studentName: 'John Smith', reservedItem: 'Chicken Sandwich', pickupTime: '12:30 PM' },
  { id: 2, studentName: 'Emma Davis', reservedItem: 'Vegetable Pasta', pickupTime: '1:00 PM' },
  { id: 3, studentName: 'Michael Brown', reservedItem: 'Caesar Salad', pickupTime: '12:45 PM' },
  { id: 4, studentName: 'Sarah Wilson', reservedItem: 'Fruit Bowl', pickupTime: '1:15 PM' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [modalSection, setModalSection] = useState<'food' | 'event' | 'reservation'>('food');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Calculate summary statistics
  const summaryStats = {
    totalFoodItems: mockFoodListings.length,
    totalEvents: mockEventLeftovers.length,
    totalReservations: mockStudentReservations.length,
    totalFoodQuantity: mockFoodListings.reduce((sum, item) => sum + item.quantity, 0),
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout animation and redirect
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  // Modal handlers
  const handleOpenModal = (type: 'add' | 'edit', section: 'food' | 'event' | 'reservation', id?: number) => {
    setModalType(type);
    setModalSection(section);
    setSelectedId(id || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
  };

  const handleSave = () => {
    // Mock save functionality
    const action = modalType === 'add' ? 'Added' : 'Updated';
    const section = modalSection === 'food' ? 'Food Item' :
                   modalSection === 'event' ? 'Event Leftover' : 'Reservation';
    showSnackbar(`${action} ${section} successfully!`, 'success');
    handleCloseModal();
  };

  const handleDelete = (type: string, id: number) => {
    showSnackbar(`Deleted ${type} successfully!`, 'success');
  };

  const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Get modal title based on type and section
  const getModalTitle = () => {
    const action = modalType === 'add' ? 'Add New' : 'Edit';
    const section = modalSection === 'food' ? 'Food Item' :
                   modalSection === 'event' ? 'Event Leftover' : 'Reservation';
    return `${action} ${section}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 2,
        pb: 4,
        animation: isLoggingOut ? `${fadeOut} 1s ease-out forwards` : 'none',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section with Animation */}
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animation: isLoggingOut ? `${slideOut} 1s ease-out forwards` : `${fadeInUp} 0.6s ease-out`,
          }}
        >
          {/* Logo and App Name Container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flex: 1,
              justifyContent: 'center', // Center the logo and text
            }}
          >
            <RestaurantIcon 
              sx={{ 
                fontSize: 32,
                color: 'primary.main',
              }} 
            />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                letterSpacing: '0.5px',
              }}
            >
              CampusConnect
            </Typography>
          </Box>

          {/* Logout Button - Positioned absolutely to maintain layout */}
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="primary"
            variant="outlined"
            sx={{
              minWidth: { xs: 'auto', sm: '120px' },
              px: { xs: 1, sm: 2 },
              position: 'absolute',
              right: 16,
            }}
            disabled={isLoggingOut}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Logout</Box>
          </Button>
        </Paper>

        {/* Summary Statistics with Staggered Animation */}
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            mb: 3,
            '& > .MuiGrid-item': {
              animation: `${fadeInUp} 0.5s ease-out both`,
            },
            '& > .MuiGrid-item:nth-of-type(1)': { animationDelay: '0.1s' },
            '& > .MuiGrid-item:nth-of-type(2)': { animationDelay: '0.2s' },
            '& > .MuiGrid-item:nth-of-type(3)': { animationDelay: '0.3s' },
            '& > .MuiGrid-item:nth-of-type(4)': { animationDelay: '0.4s' },
          }}
        >
          {[
            { icon: <RestaurantIcon color="primary" />, value: summaryStats.totalFoodItems, label: 'Food Items' },
            { icon: <EventIcon color="primary" />, value: summaryStats.totalEvents, label: 'Events' },
            { icon: <PeopleIcon color="primary" />, value: summaryStats.totalReservations, label: 'Reservations' },
            { icon: <RestaurantIcon color="primary" />, value: summaryStats.totalFoodQuantity, label: 'Total Quantity' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2} 
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {stat.icon}
                    <Box>
                      <Typography variant="h6">{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Feature Sections with Staggered Animation */}
        <Grid 
          container 
          spacing={3}
          sx={{
            '& > .MuiGrid-item': {
              animation: `${scaleUp} 0.5s ease-out both`,
            },
            '& > .MuiGrid-item:nth-of-type(1)': { animationDelay: '0.2s' },
            '& > .MuiGrid-item:nth-of-type(2)': { animationDelay: '0.3s' },
            '& > .MuiGrid-item:nth-of-type(3)': { animationDelay: '0.4s' },
          }}
        >
          {/* Food Listings Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <RestaurantIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Manage Food Listings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add, edit, or remove available food items.
              </Typography>
              
              {/* Add New Button */}
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleOpenModal('add', 'food')}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3,
                  },
                }}
              >
                Add New Food Item
              </Button>

              {/* Food Listings Table */}
              <TableContainer sx={{ mt: 2, mb: 2, width: '100%' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockFoodListings.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenModal('edit', 'food', item.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete('food item', item.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ 
                  mt: 'auto',
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 2,
                  },
                }}
              >
                Manage Food
              </Button>
            </Paper>
          </Grid>

          {/* Event Leftovers Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <EventIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Manage Event Leftovers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track and manage leftover food from events.
              </Typography>

              {/* Add New Button */}
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleOpenModal('add', 'event')}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3,
                  },
                }}
              >
                Add New Leftover
              </Button>

              {/* Event Leftovers Table */}
              <TableContainer sx={{ mt: 2, mb: 2, width: '100%' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Name</TableCell>
                      <TableCell>Food Type</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockEventLeftovers.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>{event.eventName}</TableCell>
                        <TableCell>{event.foodType}</TableCell>
                        <TableCell align="right">{event.quantity}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenModal('edit', 'event', event.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete('event leftover', event.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ 
                  mt: 'auto',
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 2,
                  },
                }}
              >
                Manage Leftovers
              </Button>
            </Paper>
          </Grid>

          {/* Reservations Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                View Student Reservations
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monitor and manage student food reservations.
              </Typography>

              {/* Add New Button */}
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleOpenModal('add', 'reservation')}
                sx={{ 
                  mb: 2,
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3,
                  },
                }}
              >
                Add New Reservation
              </Button>

              {/* Student Reservations Table */}
              <TableContainer sx={{ mt: 2, mb: 2, width: '100%' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Reserved Item</TableCell>
                      <TableCell align="right">Pickup Time</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockStudentReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.studentName}</TableCell>
                        <TableCell>{reservation.reservedItem}</TableCell>
                        <TableCell align="right">{reservation.pickupTime}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenModal('edit', 'reservation', reservation.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete('reservation', reservation.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ 
                  mt: 'auto',
                  py: 1.5,
                  minHeight: '48px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 2,
                  },
                }}
              >
                View Reservations
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Modal with Animation */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              animation: `${scaleUp} 0.3s ease-out`,
            },
          }}
        >
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label={modalSection === 'food' ? 'Location' : 
                       modalSection === 'event' ? 'Food Type' : 'Reserved Item'}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label={modalSection === 'reservation' ? 'Pickup Time' : 'Quantity'}
                variant="outlined"
                type={modalSection === 'reservation' ? 'text' : 'number'}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseModal} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar with Animation */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            animation: `${fadeInUp} 0.3s ease-out`,
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ 
              width: '100%',
              borderRadius: 2,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default AdminDashboard; 