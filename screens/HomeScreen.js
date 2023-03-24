import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native-web';
import Bottomtabs, { buttonTabIcons} from '../Components/Home/Bottomtabs';
import Headers from '../Components/Home/Headers';
import Post from '../Components/Home/Post';
import Stories from '../Components/Home/Stories';
import { POSTS } from '../data/posts';
import { db } from '../firebase';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collectionGroup('posts')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(post => ({ id: post.id, ...post.data() })))
    })
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <Headers navigation={navigation} />
      <Stories />
      <ScrollView>
        {
          posts.map((post, index) => (
            <Post post={post} key={index} />
          ))
        }
      </ScrollView>
        <Bottomtabs icons={buttonTabIcons} />  
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


