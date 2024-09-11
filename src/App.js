import React from 'react';
import MapList from './components/MapList';
import Footer from './components/Footer';
import './styles/styles.css';

function App() {
  const Header = () => {
    return (
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 style={{ fontSize: '3em', fontWeight: 'bold', color: '#3498db' }}>
          Lagri-Brawl
        </h1>
        <h2 style={{ fontSize: '1.5em', color: '#555' }}>
          Explore a combinação ideal de brawlers e mapas para transformar sua jogabilidade e alcançar novas vitórias!
        </h2>
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