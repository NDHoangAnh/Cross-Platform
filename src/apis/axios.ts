import axios from 'axios';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imtob25nbWluaDE5OXgxMjM0NUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MDI0NTI4MDh9.C0GrMsmXS0QFjXBPiNU6wB3f4-Lnd2O42lXxgrjhYvM';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.8:8089',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
