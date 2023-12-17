import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ analyticsData }) => {
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

  const setCanvasHeight = () => {
    if (chartContainer.current) {
      chartContainer.current.height = isMobileView ? 300 : 250; 
    }
  };

  useEffect(() => {
    setCanvasHeight();
  }, [isMobileView, analyticsData]);

  useEffect(() => {
    if (analyticsData.length === 0) return;
    const labels = analyticsData.map(item => item._id);
    const counts = analyticsData.map(item => item.count);

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Count',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [analyticsData]);

  return (
    <div className='m-10'>
      <canvas ref={chartContainer}/>
    </div>
  );
};

export default BarChart;
