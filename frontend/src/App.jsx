
import './App.css';
import UserContextProvider from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HiPage from './pages/HiPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import E404 from './pages/E404';
import Navbar from './pages/layout/Navbar';
import MuiNavbar from './pages/layout/MuiNavbar';
import UserRequired from './components/UserRequired';



function App() {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <MuiNavbar />
        <Routes>
          <Route path='/' element={<UserRequired/>}>
            <Route path='/' element={<HiPage />} />
            <Route path='/about' element={<AboutPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<E404 />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
