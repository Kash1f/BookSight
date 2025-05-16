import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const Index = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{color: 'blue'}}>Hello</Text>
     <Image/>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})