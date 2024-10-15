import React, { useState, useEffect } from 'react';
import { getMapDetails, getAllBrawlers } from '../services/brawlApi';

const BrawlerList = ({ mapName, sortByStarRate }) => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchBrawlers = async () => {
            try {
                const mapDetails = await getMapDetails(mapName);
                if (mapDetails && mapDetails.data) {
                    const mostUsedBrawlers = mapDetails.data
                        .sort((a, b) => !sortByStarRate ? b.starRate - a.starRate : b.useRate - a.useRate)
                        .slice(0, 10);

                    const brawlersData = await getAllBrawlers();
                    const detailedBrawlers = mostUsedBrawlers.map(brawlerStat => {
                        const brawler = brawlersData.find(b => b.id === brawlerStat.brawler);

                        return {
                            ...brawler,
                            wins: brawlerStat.winRate,
                            usage: brawlerStat.useRate,
                            star: brawlerStat.starRate,
                            color: brawler?.rarity?.color || ''
                        };
                    });

                    setBrawlers(detailedBrawlers);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do mapa:', error);
            }
        };

        if (mapName) {
            fetchBrawlers();
        }
    }, [mapName, sortByStarRate]); // Adicionado sortByStarRate como dependência

    return (
        <ul className="brawler-list">
            {brawlers.map((brawler, index) => (
                <li key={brawler.id} className="brawler-item"> {/* Usar brawler.id como chave */}
                    <img src={brawler.imageUrl} width={50} alt={brawler.name} />
                    <span style={{ color: brawler.color, fontWeight: 'bold', marginLeft: 10 }}>
                        <span style={{ fontSize: '13px' }}>#{index + 1}</span> {brawler.name}
                    </span>
                    <div className="brawler-status">
                        <span>WinRate: {brawler.wins}%</span><br />
                        <span>StarRate: {brawler.star}%</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BrawlerList;
