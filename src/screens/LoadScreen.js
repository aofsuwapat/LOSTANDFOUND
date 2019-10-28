import {
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ImageBackground,
  AsyncStorage,

} from 'react-native';
import React, { Component } from "react";

import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form, Center, Spinner } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'
export default class LoadScreen extends React.Component {

  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    // console.warn(signup_id)
    if (signup_id != '' && signup_id != null) {
      this.props.navigation.replace('Home')
    }else{
      this.props.navigation.replace('Login')
    }

  }
  render() {
    return (
      <Container>

        <Content>

          <CardItem style={styles.direction}>
            <Spinner style={styles.spinner} color='green' />
          </CardItem>


        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },

  spinner: {

    width: 250,

    height: 600
  },
  direction: {
    alignSelf: 'center'
  }

});
