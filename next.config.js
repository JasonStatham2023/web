// next.config.js
module.exports = {
  images: {
    domains: ['assets.maccarianagency.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ];
  }
};
