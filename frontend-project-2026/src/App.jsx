import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignalsPage from './pages/SignalsPage/SignalsPage';
import ActivityDetailsPage from './pages/ActivityDetailsPage/ActivityDetailsPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signals" element={<SignalsPage />} />
      <Route path="/activities/:id" element={<ActivityDetailsPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App
