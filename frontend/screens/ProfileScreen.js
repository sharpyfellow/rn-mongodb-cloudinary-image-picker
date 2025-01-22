import React, { useState, useContext, useEffect } from 'react';
import { View, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import * as FileSystem from 'expo-file-system';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user && user.profileImageUrl) {
      setProfileImage(user.profileImageUrl);
    }
  }, [user]);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant camera and media library permissions to use this feature.');
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Image picked:', result.assets[0].uri);
        setProfileImage(result.assets[0].uri);
      } else {
        console.log('Image picking cancelled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Photo taken:', result.assets[0].uri);
        setProfileImage(result.assets[0].uri);
      } else {
        console.log('Photo taking cancelled');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const uploadProfile = async () => {
    if (!profileImage) {
      Alert.alert('No Image', 'Please select an image to upload.');
      return;
    }

    try {
      const base64Image = await FileSystem.readAsStringAsync(profileImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await axios.put(
        'http://10.0.0.10:4444/api/v1/auth/upload-profile-picture',
        { profileImage: `data:image/jpeg;base64,${base64Image}` },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setProfileImage(response.data.profileImageUrl);
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', 'Failed to upload profile picture');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />
      <Button title="Upload Profile" onPress={uploadProfile} />
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
});

export default ProfileScreen;