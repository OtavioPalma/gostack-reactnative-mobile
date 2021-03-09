import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreateAppointment } from '../pages/Appointments/Create/CreateAppointment';
import { CreatedAppointment } from '../pages/Appointments/Created/CreatedAppointment';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Profile } from '../pages/Profile/Profile';

const App = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="Created" component={CreatedAppointment} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);
