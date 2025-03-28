//npm install depois npm start
import React from 'react';
import MapList from './components/MapList';
import Footer from './components/Footer';
import './styles/styles.css';
import { startBackendServer } from '../src/services/brawlApi';

function App() {
  startBackendServer();

  const Header = () => {
    return (
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <h3 style={{ fontSize: '2em', fontWeight: 'bold', color: '#3498db' }}>
          Lagri-Brawl
        </h3>
        <h4 style={{ fontSize: '1em', color: '#555' }}>
          Explore a combinação ideal de brawlers e mapas para transformar sua jogabilidade e alcançar novas vitórias!
        </h4>
      </header>
    );
  };

  return (
    <div>
      <Header />
      <div className="App">
        <MapList />
      </div>
      <Footer />
    </div>
  );
}

export default App;