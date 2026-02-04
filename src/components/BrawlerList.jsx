import React, { useState, useEffect } from 'react';
import { getMapDetails, getAllBrawlers } from '../services/brawlApi';
import LoadingIcon from './LoadingIcon'; // Importe o ícone de carregamento

const BrawlerList = ({ mapName, sortByWinRate }) => {
    const [brawlers, setBrawlers] = useState([]);
    const [loading, setLoading] = useState(true); // Adicione este estado

    useEffect(() => {
        const fetchBrawlers = async () => {
            setLoading(true); // Inicie o carregamento

            try {
                const mapDetails = await getMapDetails(mapName);

                if (mapDetails && mapDetails.data) {
                    const mostUsedBrawlers = mapDetails.data
                        .filter(brawlerStat => brawlerStat.useRate <= 20)
                        .sort((a, b) => !sortByWinRate ? (b.winRate - a.winRate) : (a.useRate - b.useRate))
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
            } finally {
                setLoading(false); // Finalize o carregamento
            }
        };

        if (mapName) {
            fetchBrawlers();
        }
    }, [mapName, sortByWinRate]); // Adicionado sortByWinRate como dependência

    if (loading) {
        return <LoadingIcon />;
    }

    return (
        <ul className="brawler-list">
            {brawlers.map((brawler, index) => (
                <li key={brawler.id} className="brawler-item"> {/* Usar brawler.id como chave */}
                    <img src={brawler.imageUrl} width={50} alt={brawler.name} />
                    <span style={{ color: brawler.color, fontWeight: 'bold', marginLeft: 10 }}>
                        <span style={{ fontSize: '13px' }}>#{brawler.usage}</span> {brawler.name}
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
