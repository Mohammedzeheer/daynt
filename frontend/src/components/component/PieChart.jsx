import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ analyticsData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setCanvasSize = () => {
    if (chartContainer.current) {
      chartContainer.current.width = 400;
      chartContainer.current.height = isMobileView ? 300 : 350;
    }
  };

  useEffect(() => {
    setCanvasSize();
  }, [isMobileView]);

  useEffect(() => {
    if (analyticsData.length === 0) return;

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: analyticsData.map((item) => item._id),
          datasets: [{
            label: 'Count',
            data: analyticsData.map((item) => item.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [analyticsData]);

  return (
    <div className='m-10'>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;
