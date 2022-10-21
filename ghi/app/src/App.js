import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoesList';
import CreateShoe from './ShoeForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shoes" element={<ShoeList />} />
          <Route path="/shoes/new" element={<CreateShoe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
