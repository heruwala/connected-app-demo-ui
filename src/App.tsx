import React, { useEffect, useState } from 'react';
import './App.css';
import '@salesforce/canvas-js-sdk';
import { Startup } from './components/startup';
import { Authenticated } from './components/authenticated';
import { Route, Routes } from 'react-router-dom';

function App() {
 return (
    <Routes>
        <Route path="/" element={<Startup />} />
        <Route path="/oauth2/callback" element={<Authenticated />} />
    </Routes>
 );
}

export default App;
