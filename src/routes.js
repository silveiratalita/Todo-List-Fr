import { BrowserRouter, Route } from 'react-router-dom';
import Example from './pages/Main';
import React from 'react';

export default function Routes() {
  return (
    <BrowserRouter>
         < Route path = "/" exact  component = { Example }   />
    </BrowserRouter>
  );
}

