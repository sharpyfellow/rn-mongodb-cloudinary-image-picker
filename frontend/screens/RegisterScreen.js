import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to register');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;