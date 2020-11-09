console.log(process.env.NODE_ENV);
export default {
  apiPrefix: process.env.NODE_ENV === 'production' ? 'https://www.xx.com/api/' : (process.env.NODE_ENV === 'test' ? 'http://test.xx.com/api/' : '/api/'),
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://www.xx.com/' : 'https://test.xx.com/',
  environment: process.env.NODE_ENV
};
