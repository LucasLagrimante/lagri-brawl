import axios from 'axios';

// Função para obter todos os mapas
export const getAllMaps = async () => {
    try {
        const response = await axios.get('https://api.brawlify.com/v1/maps');
        return response.data.list;
    } catch (error) {
        console.error('Erro ao obter mapas', error);
    }
};

// Função para obter detalhes de um mapa específico, incluindo brawlers mais jogados
export const getMapDetails = async (mapName) => {
    try {
        const response = await axios.get(`https://backend-lagribrawl.koyeb.app//api/brawlers?map_name=${mapName}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter detalhes do mapa', error);
    }
};

// Função para obter todos os brawlers com nome e imagem
export const getAllBrawlers = async () => {
    try {
        const response = await axios.get('https://api.brawlify.com/v1/brawlers');
        return response.data.list;
    } catch (error) {
        console.error('Erro ao obter brawlers', error);
    }
};
