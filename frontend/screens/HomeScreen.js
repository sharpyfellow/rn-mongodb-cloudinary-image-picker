import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {user ? (
        <>
          <Text>Welcome, {user.name}!</Text>
          <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
          <Button title="Fetch All Profiles" onPress={() => navigation.navigate('FetchAllProfiles')} />
          <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Text>Welcome to the App!</Text>
          <Button title="Register" onPress={() => navigation.navigate('Register')} />
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;