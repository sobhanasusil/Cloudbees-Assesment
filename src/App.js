import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the root route with a component to render */}
        <Route path="/" element={<UserList />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
