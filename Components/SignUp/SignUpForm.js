import { Pressable, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Formik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import firebase from '../../firebase'
import { auth, db } from '../../firebase'


const SignUpForm = ({navigation}) => {

    const SignUpSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required(),
        password: Yup.string().required()
        .min(6, 'Your password has to have at least 8 charactera')
    })

    const getRandomProfilePic = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
}

    const onSignUp = async (email, password, username) => {
        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password)
            

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePic(),
            })
            navigation.push('LoginScreen')
        } catch (error) {
            Alert.alert("My Lord...", error.message)
        }
    }

  return (
      <View style={styles.wrapper}>
          
          <Formik
              initialValues={{ email: '', password: '', username: '' }}
              onSubmit={values => {
                  onSignUp(values.email, values.password, values.username)
              }}
              validationSchema={SignUpSchema}
              validateOnMount = {true}    
          >
              
              {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
        
        <>          
              
          <View style={[styles.inputField,
                {
                    borderColor:
                        values.email.length < 1 || Validator.validate(values.email)
                        ? '#ccc'
                        : 'red'
                }]}>
          <TextInput
              placeholder='Phone number, Username or email'
              placeholderTextColor='#444'
              autoCapitalize='none'
              keyBoardType='email-address'
              textContentType='emailAddress'
              autoFocus={true}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
              />
           </View>
           <View style={[styles.inputField,
                {
                    borderColor:
                        1 > values.password.length || values.password.length >= 6
                        ? '#ccc'
                        : 'red'
                }]}>
              <TextInput
                placeholder='Password'
                placeholderTextColor='#444'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                keyBoardType='password'
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
          </View>
          
        
        <View style={styles.inputField}>
              <TextInput
                placeholder='username'
                placeholderTextColor='#444'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
          </View>
          

          <Pressable 
            titleSize={20} 
            style={styles.button(isValid)}
            onPress={handleSubmit}
            
            >
              <Text style={styles.buttonText}> Sign Up </Text>      
          </Pressable>
          
          <View style={styles.signUpContainer}>
              <Text>Have an Account?</Text>
              <TouchableOpacity>
                  <Text style={{ color: '#6BB0F5' }} onPress={() => navigation.push('LoginScreen')}> Log in</Text>
              </TouchableOpacity>

                      </View>
                      
            </>      
            )}
              
              </Formik>
    </View>
  )
}


export default SignUpForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        borderWidth: 1
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText: {
        fontWeight: 600,
        color: '#fff',
        fontSize: 15
    },
    signUpContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'center',
        marginTop: 50,
    }
})