import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Lessons from './pages/Lessons';
import LevelPage from './pages/LevelPage';
import ReviewLevel from './pages/ReviewLevel';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/level/:difficulty/:levelId" element={<LevelPage />} />
              <Route path="/review/:difficulty/:levelId" element={<ReviewLevel />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-center" theme="system" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;