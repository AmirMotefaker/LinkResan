import { Tabs } from 'expo-router';
import { Home, Plus, Settings } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2563eb', tabBarStyle: { backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e5e7eb' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'داشبورد',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'ساخت لینک',
          tabBarIcon: ({ color }) => <Plus color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'تنظیمات',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}