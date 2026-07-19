import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Clipboard } from 'react-native';
import { createLink } from '../../api'; // اصلاح مسیر
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Check } from 'lucide-react-native';

export default function CreateScreen() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreate = async () => {
    if (!url) return;
    setLoading(true);
    setShortUrl('');
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      const data = await createLink(token, url);
      setShortUrl(`https://linkresan.ir/${data.short_code}`);
      setUrl('');
    } catch (error: any) {
      Alert.alert("خطا", error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ساخت لینک جدید</Text>
      <TextInput
        style={styles.input}
        placeholder="لینک بلند خود را وارد کنید..."
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        placeholderTextColor="#9ca3af"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "در حال ساخت..." : "کوتاه کن"}</Text>
      </TouchableOpacity>

      {shortUrl ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>لینک کوتاه شما:</Text>
          <TouchableOpacity style={styles.resultBox} onPress={copyToClipboard}>
            <Text style={styles.resultUrl} numberOfLines={1}>{shortUrl}</Text>
            {copied ? <Check color="#22c55e" size={20} /> : <Text style={styles.copyText}>کپی</Text>}
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16, color: '#111827' },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  resultContainer: { marginTop: 24 },
  resultLabel: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  resultBox: { backgroundColor: 'white', borderWidth: 1, borderColor: '#22c55e', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  resultUrl: { color: '#2563eb', fontSize: 16, fontWeight: '600', flex: 1 },
  copyText: { color: '#2563eb', fontSize: 14, fontWeight: '600' },
});