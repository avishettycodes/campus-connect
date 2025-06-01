import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface FoodNotificationCardProps {
  name: string;
  description: string;
  quantity: number;
  location: string;
  expiryTime: string;
  pickupTime: string;
  onReserve: (quantity: number) => void;
}

function FoodNotificationCard({
  name,
  description,
  quantity,
  location,
  expiryTime,
  pickupTime,
  onReserve,
}: FoodNotificationCardProps) {
  const [open, setOpen] = useState(false);
  const [reserveQuantity, setReserveQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleReserve = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    onReserve(reserveQuantity);
    setOpen(false);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowConfirmation(false);
  };

  const isAvailable = quantity > 0;

  return (
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: 340,
          margin: '0 auto',
          borderRadius: 2,
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 340,
          p: 0,
          background: '#fff',
          '@media (max-width: 600px)': {
            maxWidth: '100%',
            minHeight: 0,
          },
        }}
      >
        <CardContent sx={{ p: 2, pb: '16px!important' }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.5 }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5, fontSize: '1rem', minHeight: 40 }}
          >
            {description}
          </Typography>

          <Stack spacing={1} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 15 }}>
                {location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 15 }}>
                Pickup: {pickupTime} - {expiryTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
              <RestaurantIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 15 }}>
                Available: {quantity}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: '1.05rem',
              py: 1.2,
              background: 'linear-gradient(90deg, #2E7D32 60%, #388E3C 100%)',
              boxShadow: '0 2px 8px rgba(46,125,50,0.08)',
              '&:hover': {
                background: 'linear-gradient(90deg, #388E3C 60%, #2E7D32 100%)',
              },
            }}
            onClick={handleReserve}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Reserve Now' : 'Sold Out'}
          </Button>
        </Box>
      </Card>

      {/* Reservation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reserve {name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please select the quantity you'd like to reserve:
          </Typography>
          <TextField
            type="number"
            label="Quantity"
            value={reserveQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReserveQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1, max: quantity }}
            fullWidth
          />
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Pickup Location: {location}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Pickup Time: {pickupTime} - {expiryTime}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onClose={handleClose}>
        <DialogTitle>Reservation Confirmed!</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You have successfully reserved {reserveQuantity} x {name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please pick up your order at:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
            {location}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Pickup Time:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {pickupTime} - {expiryTime}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FoodNotificationCard; 