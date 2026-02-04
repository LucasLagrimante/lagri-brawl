import React, { useState, useEffect } from 'react';
import { getAllMaps } from '../services/brawlApi';
import BrawlerList from './BrawlerList';
import Button from './Button';

const MapList = () => {
    const [maps, setMaps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByWinRate, setSortByWinRate] = useState(true);

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
        setSortByWinRate((prev) => !prev);
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
                <Button onClick={toggleSort} icon={sortByWinRate ? 'show_chart' : 'percent'}>
                    {sortByWinRate ? 'Ordenado por Uso' : 'Ordenado por Vitória (top 20)'}
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
                        </div>
                        {filteredMaps.length <= 3 && (
                            <BrawlerList mapName={map.hash} sortByWinRate={sortByWinRate} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapList;