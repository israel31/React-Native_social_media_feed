import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

const handleSignOut = async () => {
  try{
  await auth.signOut()
  console.log('signed Out Successfully')
} catch (error){ 
  console.log(error)
}
}  

  
export default function Headers({navigation}) {
  return (
  <View style={styles.headerShadow}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
      <Image style={styles.logo}  
      source={require('../../assets/kingschat.png')} 
      />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
        <View style={styles.unreadbadge}>
            <Text style={styles.unreadbadgetext}>11</Text>
          </View>
          <Image style={styles.icon}  
          source={require('../../assets/notification.png')} 
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon}  
          source={require('../../assets/search.png')} 
          />
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  headerShadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
  },
  container: {
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    marginHorizontal: 20,
  },

  iconContainer: {
    flexDirection: 'row'
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },

  icon: {
    width: 25,
    height: 25,
    marginLeft: 25,
    resizeMode: "contain"
  },

  unreadbadge: {
    backgroundColor: "red",
    position: "absolute",
    left: 35,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000000
  },

  unreadbadgetext: {
    color: 'white'
  }

})

