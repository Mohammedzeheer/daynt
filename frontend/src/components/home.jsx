import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BarChart from './component/BarChart';
import { AxiosAdmin } from '../api/axiosInstance'; 

const Home = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const fetchAnalyticsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      const order = 'desc';
      const response = await AxiosAdmin.get(`analytics/${order}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Refresh-Token': refreshToken,
        },
      });

      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [token,refreshToken]); 

  return (
    <>
      <Navbar />
      <BarChart analyticsData={analyticsData} />
    </>
  );
};

export default Home;
