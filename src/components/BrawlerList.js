import React, { useState, useEffect } from 'react';
import { getMapDetails, getAllBrawlers } from '../services/brawlApi';

const BrawlerList = ({ mapId }) => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchBrawlers = async () => {
            const mapDetails = await getMapDetails(mapId);
            const brawlersData = await getAllBrawlers();

            // Extraindo os 20 brawlers mais jogados
            const mostUsedBrawlers = mapDetails.stats
                .filter(brawler => brawler.brawler && brawler.brawler !== 0) // Filtra brawlers com brawler vazio ou igual a zero
                .filter((brawler, index, self) =>
                    index === self.findIndex((b) => b.brawler === brawler.brawler) // Remove duplicados
                )
                .sort((a, b) => b.useRate - a.useRate) // Ordena pela taxa de uso
                .slice(0, 10); // Seleciona os 10 mais usados

            // Mapeando IDs dos brawlers com nome e imagem
            const detailedBrawlers = mostUsedBrawlers.map(brawlerStat => {
                const brawler = brawlersData.find(b => b.id === brawlerStat.brawler);
                if (!brawler) {
                    console.log(mapId);
                }
                if ('rarity' in brawler) {
                    brawler.color = brawler.rarity.color;
                } else {
                    brawler.color = '';
                }

                return {
                    ...brawler,
                    usage: brawlerStat.useRate,
                    wins: brawlerStat.winRate
                };
            });

            setBrawlers(detailedBrawlers);
        };

        fetchBrawlers();
    }, [mapId]);

    return (
        <ul>
            {brawlers.map(brawler => (
                < li key={parseInt(brawler.id) + Date.now()}>
                    <img src={brawler.imageUrl} width={50} alt={brawler.name} />
                    <span style={{ color: brawler.color }}>{brawler.name}</span> - Usado: {brawler.usage}% das vezes WinRate: {brawler.wins}%
                </li>
            ))
            }
        </ul >
    );
};

export default BrawlerList;