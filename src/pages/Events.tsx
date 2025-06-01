import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Tabs, Tab, AppBar, Toolbar, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { eventItems } from '../mockData';

function Events() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname === '/events' ? 1 : 0;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'secondary.main', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Events
          </Typography>
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
      <Container maxWidth="lg" sx={{ mt: 2, px: { xs: 1, sm: 2 } }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Events
        </Typography>
        <Grid container spacing={2}>
          {eventItems.map((event) => (
            <Grid component="div" item xs={12} key={event.id}>
              <Card sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { sm: 'center' },
                p: { xs: 1, sm: 2 }
              }}>
                <CardContent sx={{ flex: 1, p: { xs: 1, sm: 2 } }}>
                  <Typography variant="h6" component="h2" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    {event.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      Pickup: {event.expiryTime}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      Quantity: {event.quantity}
                    </Typography>
                  </Box>
                  <Chip 
                    label="Event Food" 
                    color="secondary" 
                    size="small" 
                    sx={{ 
                      mt: 1, 
                      bgcolor: 'secondary.main', 
                      color: 'white',
                      fontSize: { xs: '0.7rem', sm: '0.8rem' }
                    }} 
                  />
                </CardContent>
                <CardActions sx={{ 
                  p: { xs: 1, sm: 2 },
                  justifyContent: { xs: 'flex-end', sm: 'center' }
                }}>
                  <Button 
                    size="small" 
                    color="primary"
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      minWidth: { xs: '80px', sm: '100px' }
                    }}
                  >
                    Reserve
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Events; 