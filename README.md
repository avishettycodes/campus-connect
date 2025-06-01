# Campus Connect Demo

A React-based web application demo for managing food donations and reservations on campus. This is a demonstration project showcasing a modern web application with Material-UI, TypeScript, and React.

## Demo Features

* **Student Interface**
  - Browse available food items
  - Make and manage reservations
  - View reservation history
  - Real-time notifications
  - Responsive design for all devices

* **Admin Interface**
  - Manage food listings
  - Track reservations
  - Monitor inventory
  - Handle user requests

* **Food Management**
  - Add/remove food items
  - Set availability
  - Manage quantities
  - Track expiration dates

* **Reservation System**
  - Real-time availability checking
  - Automatic quantity updates
  - Reservation confirmation
  - Cancellation handling

## Tech Stack

* React 18
* TypeScript
* Material-UI (MUI)
* React Router v6
* Context API for state management
* Local Storage for demo data persistence

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/avishettycodes/campus-connect.git
cd campus-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Demo Credentials

### Student Login
- Email: student@scu.edu
- Password: password123

### Admin Login
- Email: admin@scu.edu
- Password: admin123

## Project Structure

```
src/
  ├── assets/        # Images and static assets
  ├── components/    # Reusable components
  ├── pages/         # Page components
  ├── theme/         # Theme configuration
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Note

This is a demo project created for educational purposes. It uses local storage for data persistence and includes mock data for demonstration. In a production environment, you would want to:

1. Implement proper backend integration
2. Add user authentication
3. Set up a real database
4. Add proper error handling
5. Implement security measures

## Contributing

Feel free to fork this repository and experiment with the code. Since this is a demo project, pull requests are welcome for educational purposes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## About

This demo project was created to showcase modern web development practices using React and TypeScript. It demonstrates various features that would be useful in a campus food management system.
