import React, { useState, useEffect } from 'react';
import { getAllMaps } from '../services/brawlApi';
import BrawlerList from './BrawlerList';
import Button from './Button';

const MapList = () => {
    const [maps, setMaps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByStarRate, setSortByStarRate] = useState(false);

    useEffect(() => {
        const fetchMaps = async () => {
            const data = await getAllMaps();
            setMaps(data);
        };
        fetchMaps();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleSort = () => {
        setSortByStarRate((prev) => !prev);
    };

    const activeMaps = maps.filter(map => !map.disabled);
    const filteredMaps = activeMaps.filter(map =>
        map.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                className="search-input"
                type="text"
                placeholder="Digite o mapa..."
                value={searchTerm}
                onChange={handleSearch}
            />

            <div className="button-container">
                <Button onClick={toggleSort} icon={!sortByStarRate ? 'show_chart' : 'star'}>
                    {!sortByStarRate ? 'Ordenar por Uso' : 'Ordenar por Taxa de Estrela'}
                </Button>
            </div>

            <div className="map-container">
                {filteredMaps.map(map => (
                    <div className="map-card" key={map.id}>
                        <div className="map-info">
                            <div style={{ width: 200, height: 304, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
                                <img src={map.imageUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={map.name} />
                            </div>
                            <h3>{map.name} (<span style={{ fontSize: '13px' }}>{map.gameMode.name}</span>
                                <img src={map.gameMode.imageUrl} width={20} alt={map.name} />)
                            </h3>
                            <span style={{ fontSize: '10px' }}>Atualizado em: {new Date(parseInt(map.dataUpdated) * 1000).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                        </div>
                        {filteredMaps.length === 1 && (
                            <BrawlerList mapName={map.hash} sortByStarRate={sortByStarRate} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapList;