import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { getLinks, createLink } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const [links, setLinks] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTokenAndLinks = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        router.replace('/login');
        return;
      }
      setToken(storedToken);
      try {
        const data = await getLinks(storedToken);
        setLinks(data);
      } catch (error: any) {
        Alert.alert("خطا", error.message);
      }
    };
    fetchTokenAndLinks();
  }, []);

  const handleCreate = async () => {
    if (!url) return;
    setLoading(true);
    try {
      await createLink(token, url);
      setUrl('');
      const data = await getLinks(token);
      setLinks(data);
    } catch (error: any) {
      Alert.alert("خطا", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('is_premium');
    router.replace('/login');
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL(`https://linkresan.ir/${item.ShortCode}`)}>
      <Text style={styles.linkUrl} numberOfLines={1}>linkresan.ir/{item.ShortCode}</Text>
      <Text style={styles.linkOriginal} numberOfLines={1}>{item.OriginalURL}</Text>
      <Text style={styles.linkClicks}>کلیک‌ها: {item.ClickCount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>داشبورد</Text>
        <Button title="خروج" onPress={handleLogout} color="#ef4444" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="لینک خود را وارد کنید..."
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
        />
        <Button title={loading ? "..." : "کوتاه کن"} onPress={handleCreate} disabled={loading} color="#4F46E5" />
      </View>

      <FlatList
        data={links}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#e5e7eb' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2563eb' },
  inputContainer: { flexDirection: 'row', padding: 20, gap: 10, backgroundColor: 'white', marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 15, fontSize: 16 },
  linkItem: { backgroundColor: 'white', padding: 15, marginHorizontal: 20, marginBottom: 10, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  linkUrl: { color: '#4F46E5', fontSize: 16, fontWeight: 'bold' },
  linkOriginal: { color: '#6b7280', fontSize: 12, marginTop: 5 },
  linkClicks: { color: '#2563eb', fontSize: 12, marginTop: 5, fontWeight: 'bold' },
});