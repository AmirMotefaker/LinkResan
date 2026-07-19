import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Alert, Linking } from 'react-native';
import { getLinks } from '../../api'; // اصلاح مسیر
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Link2, ExternalLink } from 'lucide-react-native';

export default function DashboardScreen() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const fetchLinks = async () => {
    setLoading(true);
    const storedToken = await AsyncStorage.getItem('token');
    if (!storedToken) { router.replace('/login'); return; }
    setToken(storedToken);
    try {
      const data = await getLinks(storedToken);
      setLinks(data);
    } catch (error: any) {
      Alert.alert("خطا", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL(`https://linkresan.ir/${item.ShortCode}`)}>
      <View style={styles.linkHeader}>
        <View style={styles.linkIcon}>
          <Link2 color="#2563eb" size={20} />
        </View>
        <Text style={styles.linkUrl} numberOfLines={1}>linkresan.ir/{item.ShortCode}</Text>
        <ExternalLink color="#9ca3af" size={16} />
      </View>
      <Text style={styles.linkOriginal} numberOfLines={1}>{item.OriginalURL}</Text>
      <Text style={styles.linkClicks}>{item.ClickCount} کلیک</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>داشبورد</Text>
        <TouchableOpacity onPress={fetchLinks}>
          <Text style={styles.refreshText}>تازه‌سازی</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={links}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchLinks} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#e5e7eb' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  refreshText: { color: '#2563eb', fontSize: 14, fontWeight: '600' },
  linkItem: { backgroundColor: 'white', padding: 16, marginBottom: 12, borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  linkHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  linkIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center' },
  linkUrl: { flex: 1, color: '#2563eb', fontSize: 14, fontWeight: '600' },
  linkOriginal: { color: '#6b7280', fontSize: 12, marginBottom: 4 },
  linkClicks: { color: '#6b7280', fontSize: 12, fontWeight: '500' },
});