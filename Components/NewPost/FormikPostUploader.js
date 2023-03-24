import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url'
import { auth, db } from '../../firebase';
import firebase from '../../firebase';

const PLACEHOLDER_IMG = require("../../assets/AddNewpostImages/placeholderImage.jpg");


const uploadPostScheme = Yup.object({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit ')
})


const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = () => {
        const user = auth.currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db.collection('users').doc(auth.currentUser.email).collection('posts').add({
                imageUrl: imageUrl,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: auth.currentUser.uid,
                owner_email: auth.currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: [],
            }).then(() => navigation.push('HomeScreen'))
        
        return unsubscribe
    }
    
    return (
        <Formik 
            initialValues={{ imageUrl: '', caption: '' }}
            onSubmit={values => {
                uploadPostToFirebase(values.imageUrl, values.caption)
                console.log(values)
                console.log('Post was successful')
                navigation.goBack()
            }}
            validationSchema={uploadPostScheme}
            validateOnMount={true}
        >

            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid }) => (
                <>
                    <View>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }} >
                        
                        <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG  }}
                            style={{ width: 100, height: 100 }} />
                        
                        <TextInput
                        placeholder="write a caption..."
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                    </View>
                    </View>

                    <Divider width={0.2} orientation='vertical' />

                    <TextInput
                        onChange={e => setThumbnailUrl(e.nativeEvent.text)}
                        placeholder="Enter Image Url"
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
                    
                </>
            )}
         </Formik>
  )
}

export default FormikPostUploader

const styles = StyleSheet.create({})