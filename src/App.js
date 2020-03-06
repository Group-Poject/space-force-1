import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import routes from './routes';

function App() {
  return (
    <div>

      <Nav />

      {routes}

      <Footer />

    </div>
  );
}

export default App;


