import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements';
import { auth, db } from '../../firebase';
import firebase from '../../firebase';
import { useState, useEffect } from 'react';

const postFooterIcons = [
  {
    name: 'like',
    imageUrl: require('../../assets/postComponentImages/like.png'),
    likedUrl: require('../../assets/postComponentImages/liked.png')
  },
  {
    name: 'comment',
    imageUrl: require('../../assets/postComponentImages/comment.png')
  },
  {
    name: 'message',
    imageUrl: require('../../assets/postComponentImages/message.png')
  },
  {
    name: 'saved',
    imageUrl: require('../../assets/postComponentImages/saved.png')
  }
];


const Post = ({ post }) => {
  const handleLike = post => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    )
    db.collection('users')
      .doc(post.owner_email)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
          auth.currentUser.email
          )
          : firebase.firestore.FieldValue.arrayRemove(
            auth.currentUser.email
          ),
    })
      .then(() => {
      console.log('Document successfully updated')
      })
      .catch(error => {
      console.log('Error updating document: ', error)
    })   
  }

  return (
    <View style={{ marginTop: 15, marginBottom: 5 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }} >
        <PostFooter post={ post } handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comment post={post}/>
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center'
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Image source={{ uri: post.profile_picture }} style={styles.post} />
      <Text style={{marginLeft: 5, fontSize: 10, fontWeight:700}}>
        {post.user}
      </Text>
    </View>
    <Text style={{fontWeight:900}}>...</Text>

  </View>
)

const PostImage = ({ post }) => (
  <View
    style={{
      width: '100%',
      height: 300
    }}
  >
  <Image
    source={{ uri: post.imageUrl }}
    style={{height: '100%', resizeMode: 'cover'}}
    />
  </View>
)

const PostFooter = ({handleLike, post}) => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftFooterIcon}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image source={{
          uri: post.likes_by_users.includes(auth.currentUser.email)
          ? postFooterIcons[0].likedUrl : postFooterIcons[0].imageUrl,
        }} style={styles.footerIcon} />
      </TouchableOpacity>
        <Icon imgUrl={postFooterIcons[1].imageUrl} imgStyle={styles.footerIcon} />
      <Icon imgUrl={postFooterIcons[2].imageUrl} imgStyle={styles.footerIcon} />
    </View>

    <View style={{flex: 1, alignItems: 'flex-end'}}>
      <Icon imgUrl={postFooterIcons[3].imageUrl} imgStyle={styles.footerIcon} />
    </View>
  </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={ imgStyle } source={{uri: imgUrl}} />
  </TouchableOpacity>
)

const Likes = ({post}) => (
  <View style={{ flexDirection: 'row', marginTop: 4}}>
    <Text style={{ fontWeight: '600', fontSize: 10 }}>
    {post.likes_by_users.length.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <View style={{marginTop: 5}}>
    <Text style={{ fontSize: 13 }}>
      <Text style={{fontWeight: '600'}}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 3 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray', fontSize: 12 }}>
        View {post.comments.length > 1 ? 'all ' : ''} {post.comments.length}
        {post.comments.length > 1 ? ' comments' : ' comment'}
      </Text>
    )}
    </View>
)

const Comment = ({ post }) => (
  <>
    {
      post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection:'row', marginTop: 5}}>
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: '600' }}>{comment.user} </Text>
            {comment.comment}
          </Text>
        </View>
      )
    )}
  </>
)



const styles = StyleSheet.create({
  post: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 50
  },

  footerIcon: {
    width: 25,
    height: 25
  },
  leftFooterIcon: {
    width: '32%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})

export default Post