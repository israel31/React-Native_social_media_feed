import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-web';

export const buttonTabIcons = [
  {
    name: 'Home',
    inActive: require('../../assets/postComponentImages/home (2).png'),
    active: require('../../assets/postComponentImages/home (3).png')
  },
  {
    name: 'Search',
    inActive: require('../../assets/postComponentImages/search1.png'),
    active : require('../../assets/postComponentImages/search2.png')
  },
  {
    name: 'Reels',
    inActive: require('../../assets/postComponentImages/video1.png'),
    active: require('../../assets/postComponentImages/video2.png')
  },
  {
    name: 'Shop',
    inActive: require('../../assets/postComponentImages/store.png'),
    active: require('../../assets/postComponentImages/like (1).png')
  }
];

const Bottomtabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home')

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image source={{uri: activeTab == icon.name ? icon.inActive : icon.active}} style={styles.icon} />
    </TouchableOpacity>
  )
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical"/>
      <View style={styles.container}>
       {icons.map((icon, index) => (
        <Icon key={index} icon={icon} />
      ))}
      </View>
    </View>
  )
}

export default Bottomtabs

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    top: '97%',
    zIndex: 1000,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10

  },
  icon: {
    width: 30,
    height: 30
  }
})
