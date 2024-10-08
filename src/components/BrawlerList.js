import React, { useState, useEffect } from 'react';
import { getMapDetails, getAllBrawlers } from '../services/brawlApi';

const BrawlerList = ({ mapId, sortByWinRate }) => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchBrawlers = async () => {
            const mapDetails = await getMapDetails(mapId);
            const brawlersData = await getAllBrawlers();

            // Extraindo os 10 brawlers mais jogados
            const mostUsedBrawlers = mapDetails.stats
                .filter(brawler => {
                    // Aplica o filtro de useRate somente se o modo de jogo for diferente de Solo Showdown, Duo Showdown ou Trio Showdown
                    const gameMode = mapDetails.gameMode.name;
                    if (gameMode !== 'Solo Showdown' && gameMode !== 'Duo Showdown' && gameMode !== 'Trio Showdown') {
                        return brawler.useRate >= 2.1;
                    } else {
                        return brawler.useRate >= 1.5;
                    }
                })
                .filter(brawler => brawler.brawler && brawler.brawler !== 0) // Filtra brawlers com brawler vazio ou igual a zero
                .filter((brawler, index, self) =>
                    index === self.findIndex((b) => b.brawler === brawler.brawler) // Remove duplicados
                )
                .sort((a, b) => !sortByWinRate ? b.winRate - a.winRate : b.useRate - a.useRate) // Ordena pela taxa de uso ou taxa de vitória
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
                    wins: brawlerStat.winRate
                };
            });

            setBrawlers(detailedBrawlers);
        };

        fetchBrawlers();
    }, [mapId, sortByWinRate]); // Adicionado sortByWinRate como dependência

    return (
        <ul className="brawler-list">
            {brawlers.map((brawler, index) => (
                <li key={brawler.id} className="brawler-item"> {/* Usar brawler.id como chave */}
                    <img src={brawler.imageUrl} width={50} alt={brawler.name} />
                    <span style={{ color: brawler.color, fontWeight: 'bold', marginLeft: 10 }}>
                        <span style={{ fontSize: '13px' }}>#{index + 1}</span> {brawler.name}
                    </span>
                    <div className="brawler-status">
                        <span>Usage: {brawler.usage}%</span><br />
                        <span>WinRate: {brawler.wins}%</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BrawlerList;