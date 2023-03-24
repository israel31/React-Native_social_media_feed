import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginForm from '../Components/LoginScreen/LoginForm'

const INSTAGRAM_LOGO = require('../assets/LoginScreenImages/instagramLogo.png')

const LoginScreen = ({ navigation }) => (
    <View style={styles.container}>
          <View style={styles.logoContainer}>
              <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width:100 }}/>
          </View>
          <LoginForm navigation={navigation} />
    </View>
)


export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60
    }
})