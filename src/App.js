import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import routes from './routes';

function App() {
  return (
    <main>

      <Nav />

      {routes}

      <Footer />

    </main>
  );
}

export default App;


