import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import FetchAllProfiles from './screens/FetchAllProfiles';
import ProfileDetail from './screens/ProfileDetail';
import CreatePostScreen from './screens/CreatePostScreen';
import EditPostScreen from './screens/EditPostScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="FetchAllProfiles" component={FetchAllProfiles} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="EditPost" component={EditPostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;