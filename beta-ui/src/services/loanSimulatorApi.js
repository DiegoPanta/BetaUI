import axios from 'axios';

const BASE_URL = 'https://localhost:61791/api/LoanSimulator';

export const simulateLoan = async (data) => {
  try {
    await axios.post(BASE_URL, data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error;
  }
};

export const deleteSimulateLoan = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error;
  }
};

export const getSimulateLoan = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de simulação:', error);
    throw error;
  }
};

export const getBanks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bankRates`);
      return response;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
  };