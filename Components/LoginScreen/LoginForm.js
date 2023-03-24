import { Pressable, StyleSheet, TextInput, View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Formik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import firebase from '../../firebase'
import { auth } from '../../firebase'


const LoginForm = ({navigation}) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required()
        .min(6, 'Your password has to have at least 8 charactera')
    })

    const onLogin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
            console.log("Firebase Login Successful", email, password)
        } catch (error) {
            Alert.alert('Iyeellllllloooooooooo')
        }
    }


  return (
      <View style={styles.wrapper}>
          
          <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => {
                  onLogin(values.email, values.password)
              }}
              validationSchema={LoginFormSchema}
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
          <View style={{ alignItems: 'flex-end', margin: 5}}>
              <Text style={{ color: '#6BB0F5'}}> Forgot Password?</Text>
          </View>

          <Pressable 
            titleSize={20} 
            style={styles.button(isValid)}
            onPress={handleSubmit}
            
            >
              <Text style={styles.buttonText}> Log in </Text>      
          </Pressable>
          
          <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
                  <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
              </TouchableOpacity>

                      </View>
                      
            </>      
            )}
              
              </Formik>
    </View>
  )
}


export default LoginForm

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