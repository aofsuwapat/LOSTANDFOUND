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
import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form, Center } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'


export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      ImageSource: null,
      signupText1: '',
      signupText2: '',
      signupText3: '',
      signupText4: '',
      dataSignupSource: []

    };

    this.addSignup = this.addSignup.bind(this);
    this.CheckUser = this.CheckUser.bind(this);
  }


  onTextChange1 = (value) => {
    this.setState({ signupText1: value })
  }

  onTextChange2 = (value) => {
    this.setState({ signupText2: value })
  }

  onTextChange3 = (value) => {
    this.setState({ signupText3: value })
  }

  onTextChange4 = (value) => {
    this.setState({ signupText4: value })
  }


  addSignup() {
    if (this.state.ImageUri == '' || this.state.ImageUri == null) {
      Alert.alert(
        'คำเตือน!',
        'กรุณาเพิ่มรูปภาพ',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (this.state.signupText1 == '') {
      Alert.alert(
        'คำเตือน!',
        'กรุณากรอกชื่อ',
        [
          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (this.state.signupText2 == '') {
      Alert.alert(
        'คำเตือน!',
        'กรุณากรอกอีเมล',
        [

          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (this.state.signupText3 == '') {
      Alert.alert(
        'คำเตือน!',
        'กรุณากรอก Username',
        [

          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
    else if (this.state.signupText4 == '') {
      Alert.alert(
        'คำเตือน!',
        'กรุณากรอกรหัสผ่าน',
        [

          { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }

    else {
      axios.post('http://192.168.0.111/lostandfound/api/getsignup.php', JSON.stringify({

        action: 'checkUser',
        signup3: this.state.signupText3
      }))
        .then(response => {
          console.warn(response.data)
          if (response.data == 0) {

            var data = new FormData();
            data.append('action', 'addsignup');
            data.append('signup1', this.state.signupText1);
            data.append('signup2', this.state.signupText2);
            data.append('signup3', this.state.signupText3);
            data.append('signup4', this.state.signupText4);
            data.append('image',
              {
                uri: this.state.ImageUri,
                name: 'image',
                type: 'image/jpg'
              });


            axios.post('http://192.168.0.111/lostandfound/api/addsignup.php', data,
              { headers: { 'Content-Type': 'multipart/form-data' } })
              .then(response => {
                this.props.navigation.goBack();

              })
              .catch(err => {
                throw err;
              });
          }
          else{
            Alert.alert(
              'คำเตือน!',
              'Username ถูกใช้ไปแล้ว',
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
  }

  Login() {
    this.props.navigation.navigate('Login')
  }

  CheckUser() {
    // console.warn('response.data')

    axios.post('http://192.168.0.111/lostandfound/api/getsignup.php', JSON.stringify({

      action: 'checkUser',


      signup3: this.state.signupText3
    }))
      .then(response => {
        // console.warn(this.state.signupText3)


      })
      .catch(err => {
        throw err;
      });
  }


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // console.warn('data ', response.data);
        this.setState({
          ImageUri: response.uri,
          ImageSource: source,
          data: response.data

        });
      }
    });
  }

  uploadImageToServer = () => {



  }

  render() {
    return (
      <Container style={styles.bgLogin}>
        <Content >

          <Card style={styles.cardSize} >
            <CardItem >



              <Body style={styles.container}>




                <Text style={styles.nameButton2}>
                  SIGN UP
                </Text>

                <CardItem style={styles.direction}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    {this.state.ImageSource === null ?
                      <Thumbnail style={styles.sizeimageprofile} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/signup/default.png' }} /> :
                      <Thumbnail style={styles.sizeimageprofile} source={this.state.ImageSource} />
                    }
                  </TouchableOpacity>
                </CardItem>


                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin} name='md-person' />
                  <Input onChangeText={this.onTextChange1} value={this.state.signupText1} style={styles.nameButton} placeholder='Full Name' />
                </Item>

                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin} name='md-mail' />
                  <Input onChangeText={this.onTextChange2} value={this.state.signupText2} style={styles.nameButton} placeholder='Email' />
                </Item>

                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin} name='md-contact' />
                  <Input onChangeText={this.onTextChange3} value={this.state.signupText3} style={styles.nameButton} placeholder='Username' />
                </Item>

                <Item rounded style={styles.insertComment}>
                  <Icon style={styles.iconLogin2} name='md-lock' />
                  <Input onChangeText={this.onTextChange4} value={this.state.signupText4} secureTextEntry={true} style={styles.nameButton} placeholder='Password' />
                </Item>


                <Button onPress={this.addSignup} rounded style={styles.addimgButton1} >
                  <Text style={styles.nameButton3}>SIGN UP NOW!</Text>
                </Button>

                <Text style={styles.nameButton}>
                  OR
                </Text>

                <Button onPress={this.Login.bind(this)} rounded style={styles.addimgButton2} >
                  <Text style={styles.nameButton4}>BACK</Text>
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

    backgroundColor: "#4CB051"
  },
  direction: {
    alignSelf: 'center'
  },

  sizeimageprofile: {
    marginTop: -10,
    width: 120,
    height: 120,
    borderRadius: 63


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
    marginTop: 5,
    fontFamily: "Kanit-Medium",
    marginBottom: 10
  },

  nameButton3: {
    fontSize: 15,
    paddingLeft: 79,
    paddingRight: 70,
    fontFamily: "Kanit-Medium"


  },

  nameButton4: {
    fontSize: 15,
    fontFamily: "Kanit-Medium",

    paddingLeft: 108,
    paddingRight: 100
  },

  iconLogin: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0
  },

  iconLogin2: {
    fontSize: 16,
    paddingLeft: 1,
    paddingRight: 0,

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
    width: 250,
    backgroundColor: "#FD4C58"

  },

  cardSize: {
    width: 320,
    marginLeft: 46,
    marginTop: 50,


    borderRadius: 2
  }


});
