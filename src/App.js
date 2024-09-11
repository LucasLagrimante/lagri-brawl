import React from 'react';
import MapList from './components/MapList';
import './styles/styles.css';

function App() {
  const Header = () => {
    return (
      <header style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1 style={{ fontSize: '3em', fontWeight: 'bold', color: '#3498db' }}>
          Lagri-Brawl
        </h1>
        <h2 style={{ fontSize: '1.5em', color: '#555' }}>
          Encontre os melhores personagens para dominar cada mapa e eleve seu jogo a um novo nível!
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
    </div>
  );
}

export default App;