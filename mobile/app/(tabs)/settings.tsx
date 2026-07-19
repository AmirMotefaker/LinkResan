import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { LogOut, User, Moon, Bell } from 'lucide-react-native';

export default function SettingsScreen() {
  const handleLogout = async () => {
    Alert.alert(
      "خروج از حساب",
      "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      [
        { text: "لغو", style: "cancel" },
        { text: "خروج", style: "destructive", onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('is_premium');
          router.replace('/login');
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تنظیمات</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.item}>
          <User color="#6b7280" size={20} />
          <Text style={styles.itemText}>پروفایل کاربری</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Moon color="#6b7280" size={20} />
          <Text style={styles.itemText}>حالت تاریک</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Bell color="#6b7280" size={20} />
          <Text style={styles.itemText}>اعلان‌ها</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#ef4444" size={20} />
        <Text style={styles.logoutText}>خروج از حساب کاربری</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  section: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', gap: 12 },
  itemText: { fontSize: 16, color: '#111827' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 16, borderRadius: 12, gap: 8, borderWidth: 1, borderColor: '#fecaca' },
  logoutText: { color: '#ef4444', fontSize: 16, fontWeight: '600' },
});