import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { users } from '../../data/users'


export default function Stories() {
  return (
<View style={{ marginTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
      >
        {users.map((story, index) => (
      
      <View key={index} style={{ alignItems: 'center' }}>
        <Image source={{ uri: story.image }} style={styles.story} />
        <Text>
          {story.user.length > 11
            ? story.user.slice(0, 7).toLowerCase() + '...'
            : story.user.toLowerCase()}  
        </Text>
      </View>
          
    ))}
  </ScrollView>
</View>
  );
          }

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ff8501'
  }

})
