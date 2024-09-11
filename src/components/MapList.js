import React, { useState, useEffect } from 'react';
import { getAllMaps } from '../services/brawlApi';
import BrawlerList from './BrawlerList';

const MapList = () => {
    const [maps, setMaps] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortByWinRate, setSortByWinRate] = useState(false); // Novo estado para controle de ordenação

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

    const handleSortChange = () => {
        setSortByWinRate(!sortByWinRate); // Inverte o estado de ordenação
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

            <label>
                <input
                    type="checkbox"
                    checked={sortByWinRate}
                    onChange={handleSortChange}
                />
                Ordenar por Taxa de Vitória
            </label>

            <div className="map-container">
                {filteredMaps.map(map => (
                    <div className="map-card" key={map.id}>
                        <div className="map-info">
                            <img src={map.imageUrl} width={200} alt={map.name} />
                            <h3>{map.name} (<span style={{ fontSize: '15px' }}>{map.gameMode.name}</span>
                                <img src={map.gameMode.imageUrl} width={20} alt={map.name} />)
                            </h3>
                            <p style={{ fontSize: '10px' }}>Atualizado em: {new Date(parseInt(map.dataUpdated) * 1000).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</p>
                        </div>
                        <BrawlerList mapId={map.id} sortByWinRate={sortByWinRate} /> {/* Passa o estado de ordenação para BrawlerList */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapList;