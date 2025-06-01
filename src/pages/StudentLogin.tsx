import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Autocomplete,
  AutocompleteRenderInputParams,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  keyframes,
  IconButton,
  Stack,
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SelectedSchoolContext } from '../App';

// Animation keyframes
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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// List of major US colleges and universities
const schools = [
  'University of California, Berkeley',
  'Stanford University',
  'Massachusetts Institute of Technology',
  'Harvard University',
  'Yale University',
  'Princeton University',
  'Columbia University',
  'University of Michigan',
  'University of California, Los Angeles',
  'New York University',
  'University of Pennsylvania',
  'Cornell University',
  'University of Chicago',
  'Duke University',
  'University of Texas at Austin',
  'University of Washington',
  'University of Wisconsin-Madison',
  'University of Illinois at Urbana-Champaign',
  'University of North Carolina at Chapel Hill',
  'University of Virginia',
  'University of California, San Diego',
  'University of California, Davis',
  'University of California, Irvine',
  'University of California, Santa Barbara',
  'University of California, Santa Cruz',
  'University of California, Riverside',
  'University of California, Merced',
  'University of California, San Francisco',
  'California State University, Fullerton',
  'California State University, Long Beach',
  'California State University, Los Angeles',
  'California State University, Northridge',
  'California State University, Sacramento',
  'San Diego State University',
  'San Francisco State University',
  'San Jose State University',
  'University of Southern California',
  'California Institute of Technology',
  'Pomona College',
  'Claremont McKenna College',
  'Harvey Mudd College',
  'Scripps College',
  'Pitzer College',
  'Occidental College',
  'Loyola Marymount University',
  'Pepperdine University',
  'Santa Clara University',
  'University of San Francisco',
  'University of San Diego',
  'University of the Pacific',
  'Mills College',
  'Saint Mary\'s College of California',
  'Dominican University of California',
  'Notre Dame de Namur University',
  'Menlo College',
  'California Lutheran University',
  'Chapman University',
  'University of Redlands',
  'Whittier College',
  'University of La Verne',
  'Azusa Pacific University',
  'Biola University',
  'California Baptist University',
  'Concordia University Irvine',
  'Fresno Pacific University',
  'Point Loma Nazarene University',
  'Vanguard University',
  'Westmont College',
  'California Polytechnic State University, San Luis Obispo',
  'California Polytechnic State University, Pomona',
  'California Maritime Academy',
  'California State University, Bakersfield',
  'California State University, Channel Islands',
  'California State University, Chico',
  'California State University, Dominguez Hills',
  'California State University, East Bay',
  'California State University, Fresno',
  'California State University, Humboldt',
  'California State University, Monterey Bay',
  'California State University, San Bernardino',
  'California State University, San Marcos',
  'California State University, Stanislaus',
  'Humboldt State University',
  'Sonoma State University',
  'California State University, Maritime Academy',
  'California State University, Channel Islands',
  'California State University, San Marcos',
  'California State University, Stanislaus',
  'California State University, East Bay',
  'California State University, Monterey Bay',
  'California State University, San Bernardino',
  'California State University, Dominguez Hills',
  'California State University, Bakersfield',
  'California State University, Chico',
  'California State University, Fresno',
  'California State University, Fullerton',
  'California State University, Long Beach',
  'California State University, Los Angeles',
  'California State University, Northridge',
  'California State University, Sacramento',
  'San Diego State University',
  'San Francisco State University',
  'San Jose State University',
  'Sonoma State University',
  'California State University, Channel Islands',
  'California State University, San Marcos',
  'California State University, Stanislaus',
  'California State University, East Bay',
  'California State University, Monterey Bay',
  'California State University, San Bernardino',
  'California State University, Dominguez Hills',
  'California State University, Bakersfield',
  'California State University, Chico',
  'California State University, Fresno',
  'California State University, Fullerton',
  'California State University, Long Beach',
  'California State University, Los Angeles',
  'California State University, Northridge',
  'California State University, Sacramento',
  'San Diego State University',
  'San Francisco State University',
  'San Jose State University',
  'Sonoma State University',
].filter((v, i, a) => a.indexOf(v) === i).sort();

function StudentLogin() {
  const navigate = useNavigate();
  const { setSelectedSchool } = useContext(SelectedSchoolContext);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    school: '',
    isLowIncome: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    school: false,
    email: false,
    name: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isLowIncome' ? checked : value
    }));
    // Clear error when user starts typing
    if (name !== 'isLowIncome') {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSchoolChange = (_: any, newValue: string | null) => {
    setFormData(prev => ({
      ...prev,
      school: newValue || ''
    }));
    // Clear school error when selection changes
    setErrors(prev => ({
      ...prev,
      school: false
    }));
  };

  const validateForm = () => {
    const newErrors = {
      school: !formData.school,
      email: !formData.email,
      name: !formData.name,
      password: !formData.password,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Store selected school in localStorage and context for theme switching
      localStorage.setItem('selectedSchool', formData.school);
      setSelectedSchool(formData.school);
      
      // Store user's full name in localStorage
      localStorage.setItem('userFullName', formData.name);
      
      // Simulate loading and animate transition
      setTimeout(() => {
        navigate('/welcome');
      }, 1500);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

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
        position: 'relative',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute',
          left: { xs: 16, sm: 24 },
          top: { xs: 16, sm: 24 },
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          width: { xs: 36, sm: 40 },
          height: { xs: 36, sm: 40 },
          boxShadow: 2,
          transition: 'all 0.2s ease-in-out',
        }}
        aria-label="Go back to home page"
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
            animation: `${slideUp} 0.5s ease-out`,
          }}
        >
          <LocalDiningIcon
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: 'primary.main',
              animation: isLoading ? `${spin} 1s linear infinite` : 'none',
              mb: 2,
              transition: 'all 0.3s ease-in-out',
            }}
          />
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            animation: isLoading ? `${fadeOut} 0.5s ease-out forwards` : `${slideUp} 0.5s ease-out`,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              mb: 4,
              color: 'primary.main',
              fontWeight: 600,
              animation: isLoading ? `${spin} 1s linear infinite` : 'none',
            }}
          >
            Student Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Autocomplete
                options={schools}
                value={formData.school}
                onChange={handleSchoolChange}
                renderInput={(params: AutocompleteRenderInputParams) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="School"
                    required
                    placeholder="Select your school"
                    error={errors.school}
                    helperText={errors.school ? "This field is required" : ""}
                  />
                )}
              />
              <TextField
                fullWidth
                label="School Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your school email"
                helperText={errors.email ? "This field is required" : "Use your official school email (e.g., johndoe@university.edu)"}
                error={errors.email}
              />
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                error={errors.name}
                helperText={errors.name ? "This field is required" : ""}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                error={errors.password}
                helperText={errors.password ? "This field is required" : ""}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isLowIncome"
                    checked={formData.isLowIncome}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="I confirm I am a low-income student as verified by the school's financial aid office."
                sx={{ 
                  mt: 1,
                  textAlign: 'left',
                  alignItems: 'flex-start',
                  '& .MuiFormControlLabel-label': {
                    marginTop: '2px',
                    marginLeft: '8px',
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress
                      size={24}
                      sx={{
                        color: 'white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                    <span style={{ visibility: 'hidden' }}>Login</span>
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default StudentLogin; 