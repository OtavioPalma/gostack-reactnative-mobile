import React from 'react';
import { StatusBar, Text, View } from 'react-native';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Text>Go Barbera</Text>
      </View>
    </>
  );
};
