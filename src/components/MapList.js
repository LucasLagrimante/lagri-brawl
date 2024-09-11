import React, { useState, useEffect } from 'react';
import { getAllMaps } from '../services/brawlApi';
import BrawlerList from './BrawlerList';

const MapList = () => {
    const [maps, setMaps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
            <ul>
                {filteredMaps.map(map => (
                    <li key={map.id}>
                        <img src={map.imageUrl} width={200} alt={map.name} />
                        {map.name} ({map.gameMode.name} <img src={map.gameMode.imageUrl} width={20} alt={map.name} />) <span style={{ fontSize: '10px' }}>Atualizado em: {new Date(parseInt(map.dataUpdated) * 1000).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                        <BrawlerList mapId={map.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MapList;