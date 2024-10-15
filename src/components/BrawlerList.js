import React, { useState, useEffect } from 'react';
import { getMapDetails, getAllBrawlers } from '../services/brawlApi';

const BrawlerList = ({ mapName, sortByStarRate }) => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchBrawlers = async () => {
            const mapDetails = await getMapDetails(mapName);
            const brawlersData = await getAllBrawlers();

            // Extraindo os 10 brawlers mais jogados
            const mostUsedBrawlers = mapDetails
                .sort((a, b) => !sortByStarRate ? b.starRate - a.starRate : b.useRate - a.useRate) // Ordena pela taxa de uso ou taxa de estrelas
                .slice(0, 10); // Seleciona os 10 mais usados

            // Mapeando IDs dos brawlers com nome e imagem
            const detailedBrawlers = mostUsedBrawlers.map(brawlerStat => {
                const brawler = brawlersData.find(b => b.id === brawlerStat.brawler);

                if ('rarity' in brawler) {
                    brawler.color = brawler.rarity.color;
                } else {
                    brawler.color = '';
                }

                return {
                    ...brawler,
                    usage: brawlerStat.useRate,
                    wins: brawlerStat.starRate,
                    star: brawlerStat.starRate
                };
            });

            setBrawlers(detailedBrawlers);
        };

        fetchBrawlers();
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
                        <span>Usage: {brawler.usage}#</span><br />
                        <span>StarRate: {brawler.star}%</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BrawlerList;
