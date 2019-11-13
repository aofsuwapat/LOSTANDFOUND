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

import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form, Center } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],

      signupText3: '',
      signupText4: '',
      dataSignupSource: []
    };

    this.addSignup = this.addSignup.bind(this);

  }
  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    // console.warn(signup_id)
    if (signup_id != '' && signup_id != null) {
      this.props.navigation.replace('Home')
    }

  }

  onTextChange3 = (value) => {
    this.setState({ signupText3: value })
  }

  onTextChange4 = (value) => {
    this.setState({ signupText4: value })
  }

  addSignup() {

    axios.post('http://192.168.0.111/lostandfound/api/getsignup.php', JSON.stringify({

      action: 'getLogin',

      signup3: this.state.signupText3,
      signup4: this.state.signupText4
    }))
      .then(response => {
        // console.warn(response.data)
        if (response.data != null && response.data != '') {
          AsyncStorage.setItem('signup_id', response.data.signup_id);
          this.props.navigation.replace('Home')
        } else {
          Alert.alert(
            'คำเตือน!',
            'ข้อมูลไม่ถูกต้อง',
            [

              { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
          );
        }

      })
      .catch(err => {
        throw err;
      });

  }

  Guestlogin() {
    AsyncStorage.setItem('signup_id', 'Guest');
    this.props.navigation.replace('Home')
  }



  Signup() {
    this.props.navigation.navigate('Signup')
  }




  render() {
    return (
      <Container style={styles.bgLogin}>

        <Content >

          <Card style={styles.cardSize} >
            <CardItem >



              <Body style={styles.container}>



                <Icon name='ios-cube' style={{ fontSize: 110, color: '#4F4F4F' }} />


                <Text style={styles.nameButton2}>
                  LOST & FOUND
                </Text>

                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin} name='md-contact' />
                  <Input onChangeText={this.onTextChange3} value={this.state.signupText3} style={styles.nameButton} placeholder='Username' />
                </Item>

                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin2} name='md-lock' />
                  <Input onChangeText={this.onTextChange4} value={this.state.signupText4} secureTextEntry={true} style={styles.nameButton} placeholder='Password' />
                </Item>

                <Button onPress={this.addSignup} rounded style={styles.addimgButton1} >
                  <Text style={styles.nameButton3}>LOGIN</Text>
                </Button>

                <Text style={styles.nameButton}>
                  OR
                </Text>

                <Button onPress={this.Signup.bind(this)} rounded style={styles.addimgButton2} warning>
                  <Text style={styles.nameButton4}>Create Account</Text>
                </Button>


                <Button onPress={this.Guestlogin.bind(this)} rounded style={styles.addimgButton3} >
                  <Text style={styles.nameButton5}>Guest</Text>
                </Button>

              </Body>

            </CardItem>
          </Card>

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  bgLogin: {
    backgroundColor: "#363636"


  },


  insertComment: {

    flex: 1,
    width: 250,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginTop: 6,
    marginBottom: 6
  },

  nameButton: {


    fontSize: 13,
    fontFamily: "Kanit-Regular"

  },

  nameButton2: {
    fontSize: 20,
    marginTop: -5,
    marginBottom: 20,
    fontFamily: "Kanit-Medium"

  },

  nameButton3: {
    fontSize: 15,
    paddingLeft: 105,

    paddingRight: 100,
    fontFamily: "Kanit-Medium"



  },

  nameButton4: {
    fontSize: 15,
    paddingLeft: 60,

    paddingRight: 60,
    fontFamily: "Kanit-Medium"

  },

  nameButton5: {
    marginTop: 20,
    fontSize: 15,
    paddingLeft: 70,
    paddingRight: 60,
    fontFamily: "Kanit-Medium"

  },

  iconLogin: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0
  },

  iconLogin2: {
    fontSize: 16,
    paddingLeft: 1,
    paddingRight: 0
  },

  addimgButton1: {

    marginTop: 6,
    height: 40,
    marginBottom: 10,
    width: 250,
    backgroundColor: "#4CB051"

  },

  addimgButton2: {
    height: 40,
    marginBottom: 30,
    marginTop: 10,
    width: 250

  },

  addimgButton3: {
    height: 40,
    marginBottom: 30,
    marginTop: -15,
    width: 250,
    paddingLeft: 35,
    paddingRight: 40,
    backgroundColor: "#696969"


  },

  cardSize: {
    width: 320,
    marginLeft: 46,
    marginTop: 80,


    borderRadius: 2
  }


});
