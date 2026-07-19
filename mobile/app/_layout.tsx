import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (newToken: string, premium: boolean) => {
    setToken(newToken);
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('is_premium', premium ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    setToken(null);
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('is_premium');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index">
        {token ? (
          // @ts-ignore
          () => <DashboardScreen token={token} onLogout={handleLogout} />
        ) : (
          // @ts-ignore
          () => <LoginScreen onLogin={handleLogin} />
        )}
      </Stack.Screen>
    </Stack>
  );
}

// @ts-ignore
import LoginScreen from './login';
// @ts-ignore
import DashboardScreen from './dashboard';