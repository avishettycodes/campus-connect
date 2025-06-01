import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to student dashboard after animation
    const timer = setTimeout(() => {
      navigate('/student');
    }, 3000); // 3 seconds animation

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        animation: 'fadeIn 0.5s ease-in',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          animation: 'slideUp 1s ease-out',
          '@keyframes slideUp': {
            '0%': {
              transform: 'translateY(50px)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateY(0)',
              opacity: 1,
            },
          },
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
            },
          },
        }}
      >
        <LocalDiningIcon
          sx={{
            fontSize: '5rem',
            color: 'primary.main',
            mb: 2,
            animation: 'bounce 1s ease-in-out',
            '@keyframes bounce': {
              '0%, 100%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.2)',
              },
            },
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Welcome to Campus Connect!
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Connecting you to campus resources...
        </Typography>
      </Paper>
    </Box>
  );
}

export default Welcome; 