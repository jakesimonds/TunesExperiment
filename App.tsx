import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { setupTrackPlayer } from './src/services/track-player-setup';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setupTrackPlayer().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
