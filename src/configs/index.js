console.log(process.env.NODE_ENV);
export default {
  apiPrefix: process.env.NODE_ENV === 'production' ? 'https://admin.tuzy.io/api/' : (process.env.NODE_ENV === 'test' ? 'http://54.178.139.237:39002/api/' : '/api/'),
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://admin.tuzy.io/' : 'http://54.178.139.237:39002/',
};
