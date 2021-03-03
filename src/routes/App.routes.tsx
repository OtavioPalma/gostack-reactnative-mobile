import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '../pages/Dashboard/Dashboard';

const App = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);
