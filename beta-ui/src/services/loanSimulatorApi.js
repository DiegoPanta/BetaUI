import axios from 'axios';

const BASE_URL = 'https://localhost:61791/api/LoanSimulator';

export const simulateLoan = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response;
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error;
  }
};

export const getBanks = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
  };