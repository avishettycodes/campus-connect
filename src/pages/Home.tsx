import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
} from '@mui/material';

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Campus Connect
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid component="div" item xs={12} sm={6} md={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => navigate('/student-login')}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              >
                Student
              </Button>
            </Grid>
            <Grid component="div" item xs={12} sm={6} md={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={() => navigate('/admin-login')}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              >
                Admin
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home; 