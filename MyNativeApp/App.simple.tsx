import React from 'react';
import OrderDashboardScreen from './src/screens/orders/OrderDashboardScreen';

const SimpleApp: React.FC = () => {
  console.log('🚀 OrderDashboard component rendering...');
  
  return <OrderDashboardScreen />;
};

export default SimpleApp;