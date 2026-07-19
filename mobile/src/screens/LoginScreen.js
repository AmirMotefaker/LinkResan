import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../api';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login(email, password);
      onLogin(data.token, data.is_premium);
    } catch (error) {
      Alert.alert("خطا", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>لینک رسان</Text>
      <TextInput
        style={styles.input}
        placeholder="ایمیل"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="رمز عبور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? "در حال ورود..." : "ورود"} onPress={handleLogin} disabled={loading} color="#4F46E5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#2563eb' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 15, marginBottom: 15, fontSize: 16 },
});