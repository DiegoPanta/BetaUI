module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://localhost:61791',  // URL do backend
          changeOrigin: true,
          secure: false, // Desabilita a verificação SSL (use com cautela em produção)
        },
      },
    },
  };
  