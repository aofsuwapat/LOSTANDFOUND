import {
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ImageBackground,
  AsyncStorage

} from 'react-native';
import React, { Component } from "react";
import { Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';

export default class PostlostScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello! Welcome to Post Lost</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
