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
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { SelectedSchoolContext } from '../App';

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
    fafsaId: '',
    email: '',
    name: '',
    password: '',
    school: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSchoolChange = (_: any, newValue: string | null) => {
    setFormData(prev => ({
      ...prev,
      school: newValue || ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store selected school in localStorage and context for theme switching
    localStorage.setItem('selectedSchool', formData.school);
    setSelectedSchool(formData.school);
    // Navigate to welcome screen instead of dashboard
    navigate('/welcome');
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 0 } }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 2, sm: 4 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 2, sm: 4 },
          }}
        >
          <LocalDiningIcon
            sx={{
              fontSize: { xs: '2.5rem', sm: '4rem' },
              color: 'primary.main',
            }}
          />
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            mx: 'auto',
            borderRadius: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2.25rem' },
              mb: { xs: 2, sm: 3 },
            }}
          >
            Student Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="FAFSA ID"
              name="fafsaId"
              value={formData.fafsaId}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your FAFSA ID"
              sx={{ mb: 0 }}
            />
            <Autocomplete
              options={schools}
              value={formData.school}
              onChange={handleSchoolChange}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  fullWidth
                  label="School"
                  margin="normal"
                  required
                  placeholder="Select your school"
                />
              )}
              sx={{ mt: 0 }}
            />
            <TextField
              fullWidth
              label="School Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your school email"
              sx={{ mb: 0 }}
            />
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your full name"
              sx={{ mb: 0 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your password"
              sx={{ mb: 0 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default StudentLogin; 