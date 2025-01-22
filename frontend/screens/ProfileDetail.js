import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Alert, FlatList } from 'react-native';
import axios from 'axios';
import moment from 'moment';

const ProfileDetail = ({ route }) => {
  const { profileId } = route.params;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        Alert.alert('Missing ID', 'Profile ID is required to fetch the profile.');
        return;
      }

      try {
        const response = await axios.get(`http://10.0.0.10:4444/api/v1/profiles/${profileId}`);
        setProfile(response.data);
      } catch (error) {
        Alert.alert('Error', 'Profile not found');
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://10.0.0.10:4444/api/v1/post/user/${profileId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [profileId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Profile not found</Text>
      </View>
    );
  }

  const renderPost = ({ item }) => {
    const formattedDate = moment(item.createdAt).format("DD:MM:YYYY");
    return (
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.postDate}>Posted on: {formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileName}>{profile.name}</Text>
      <Text>{profile.email}</Text>
      {profile.profileImageUrl && (
        <Image source={{ uri: profile.profileImageUrl }} style={styles.profileImage} />
      )}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        style={styles.postList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 16,
  },
  postList: {
    marginTop: 20,
    width: '100%',
  },
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postDate: {
    marginTop: 8,
    color: 'gray',
  },
});

export default ProfileDetail;