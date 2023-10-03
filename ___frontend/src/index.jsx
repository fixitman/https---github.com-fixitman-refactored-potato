import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './UserContext';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './components/ThemeProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <CssBaseline />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
);


