import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import defaultTheme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentLogin from './pages/StudentLogin';
import Welcome from './pages/Welcome';
import ReservationSummary from './pages/ReservationSummary';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import YourReservations from './pages/YourReservations';

// Context for selected school
export const SelectedSchoolContext = createContext({
  selectedSchool: '',
  setSelectedSchool: (_: string) => {},
});

const scuTheme = createTheme({
  palette: {
    primary: {
      main: '#B1001C', // Santa Clara red
      light: '#FFCDD2',
      dark: '#7F0011',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFFFFF', // White
      contrastText: '#B1001C',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#B1001C',
      secondary: '#7F0011',
    },
  },
  typography: {
    fontFamily: 'Quicksand, Poppins, Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { color: '#B1001C' },
    h2: { color: '#B1001C' },
    h3: { color: '#B1001C' },
    h4: { color: '#B1001C' },
    h5: { color: '#B1001C' },
    h6: { color: '#B1001C' },
  },
});

const App: React.FC = () => {
  // Use state for selected school
  const [selectedSchool, setSelectedSchool] = useState(() => localStorage.getItem('selectedSchool') || '');

  return (
    <SelectedSchoolContext.Provider value={{ selectedSchool, setSelectedSchool }}>
      <AuthProvider>
        <ReservationProvider>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/student" element={
                  selectedSchool === 'Santa Clara University' ? (
                    <ThemeProvider theme={scuTheme}>
                      <StudentDashboard />
                    </ThemeProvider>
                  ) : (
                    <StudentDashboard />
                  )
                } />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/reservations" element={<ReservationSummary />} />
                <Route path="/events" element={<Events />} />
                <Route path="/your-reservations" element={<YourReservations />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </ReservationProvider>
      </AuthProvider>
    </SelectedSchoolContext.Provider>
  );
};

export default App;
