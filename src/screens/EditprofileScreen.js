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
import { Title, Item, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' })
  ],
});
export default class EditprofileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      ImageSource: null,
      signupText1: '',
      // signupText3: '',
      signupText4: '',
      dataInfomationSource: []

    };
    // this.Readnews = this.Readnews.bind(this)
    this.addSignup = this.addSignup.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    // this.renderInfomationProfile = this.renderInfomationProfile.bind(this);
  }

  Profile() {
    this.props.navigation.navigate('Profile')
  }

  onTextChange1 = (value) => {
    this.setState({ signupText1: value })
  }

  // onTextChange3 = (value) => {
  //   this.setState({ signupText3: value })
  // }

  onTextChange4 = (value) => {
    this.setState({ signupText4: value })
  }

  async addSignup() {
    const signup_id = await AsyncStorage.getItem('signup_id')

    var data = new FormData();
    data.append('action', 'addsignup2');
    data.append('signupid', signup_id);
    data.append('signup1', this.state.signupText1);
    // data.append('signup3', this.state.signupText3);
    data.append('signup4', this.state.signupText4);
    if (this.state.ImageUri != '' && this.state.ImageUri != null) {
      data.append('image',
        {
          uri: this.state.ImageUri,
          name: 'image',
          type: 'image/jpg'
        });
    }

    // console.warn(data);
    await axios.post('http://192.168.0.111/lostandfound/api/addeditprofile.php', data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        this.props.navigation.goBack();

      })
      .catch(err => {
        throw err;
      });


  }



  async componentDidMount() {

    
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.111/lostandfound/api/getprofile.php', JSON.stringify({

      action: 'profile',
      signupid: signup_id
    }))
      .then(response => {
        // console.warn(response.data)
        this.setState({
          isLoading: false,
          dataSource: response.data,
          signupText1: response.data.signup_name,
          // signupText3: response.data.signup_username,
          signupText4: response.data.signup_password
        })

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

  renderProfile() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)


    if (this.state.dataSource != '') {

      arr.push(

        <Card style={styles.cardprofile}>


          <CardItem style={styles.direction}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              {this.state.ImageSource === null ?
                <Thumbnail style={styles.sizeimageprofile} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/signup/' + this.state.dataSource.signup_img }} /> :
                <Thumbnail style={styles.sizeimageprofile} source={this.state.ImageSource} />
              }
            </TouchableOpacity>
          </CardItem>






          <CardItem>
            <Text style={styles.username}>
              ชื่อ :
            </Text>
          </CardItem>

          <CardItem style={styles.direction}>
            <Item rounded style={styles.insertComment}>
              <Input onChangeText={this.onTextChange1} style={styles.nameButton}>
                {this.state.dataSource.signup_name}
              </Input>
            </Item>
          </CardItem>





          <CardItem>
            <Text style={styles.username}>
              รหัสผ่าน :
            </Text>
          </CardItem>

          <CardItem style={styles.direction}>
            <Item rounded style={styles.insertComment2}>
              <Input onChangeText={this.onTextChange4} style={styles.nameButton} secureTextEntry={true}>
                {this.state.dataSource.signup_password}
              </Input>
            </Item>
          </CardItem>


          <CardItem style={styles.direction}>
            <Button onPress={this.addSignup} rounded style={styles.addimgButton1} >
              <Text style={styles.nameButton3}>บันทึกข้อมูล</Text>
            </Button>
          </CardItem>

        </Card>
      )


    } else {
      arr.push(
        // <Picker.Item label="ไม่มีข้อมูล" value="0" />

      )

    }
    return arr;
  }


  render() {
    const renderProfile = this.renderProfile;
    return (
      <Container>
        <Content>




          <Header style={styles.bghd}>

            <Left>
              <TouchableOpacity onPress={this.Profile.bind(this)}>
                <Text style={styles.namechageimageprofile2}>
                  ยกเลิก
              </Text>
              </TouchableOpacity>
            </Left>

            <Body>
              <Title style={styles.namechageimageprofile3}>
                แก้ไขโปรไฟล์
              </Title>
            </Body>

          </Header>


          {renderProfile()}







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

  cardprofile: {
    marginTop: 0,
    marginBottom: -20,
    marginLeft: 0,
    marginRight: 0
  },

  bghd: {
    backgroundColor: "#363636",
    height: 50,
  },

  direction: {
    alignSelf: 'center'
  },

  direction2: {
    alignSelf: 'center',
    marginRight: -310,
    marginTop: -5

  },



  addimgButton1: {

    marginTop: 6,
    height: 40,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#4CB051"

  },

  sizeimageprofile: {
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 63


  },

  nameButton3: {
    fontSize: 14,
    fontFamily: "Kanit-Regular",
    paddingLeft: 120,
    paddingRight: 110


  },

  namechageimageprofile: {
    color: "#0066FF",
    fontFamily: "Kanit-Regular",
    fontSize: 13,
    marginTop: -5


  },

  namechageimageprofile2: {
    color: "#FFFFFF",
    fontFamily: "Kanit-Regular",
    fontSize: 15,

    // marginLeft:5,
    marginTop: 0


  },

  namechageimageprofile3: {
    color: "#FFFFFF",
    fontSize: 17,
    paddingLeft: 40,
    // alignSelf: 'center',
    fontFamily: "Kanit-Medium",
    marginTop: 0


  },


  username: {
    color: "#333333",
    fontSize: 14,
    fontFamily: "Kanit-Regular",
    marginTop: -13,
    marginBottom: -10,
    marginLeft: 40


  },

  sizebuttonlogout: {
    borderRadius: 28,
    right: 0,
    position: "absolute",
    width: 35,
    height: 10

  },

  sizebuttonlogout2: {

    borderRadius: 28,
    right: 0,
    position: "absolute",
    width: 120,
    marginTop: 105,

  },

  insertComment: {

    width: 300,
    fontSize: 13,
    fontFamily: "Kanit-Regular",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginTop: -10,
    marginBottom: -5
  },

  insertComment2: {

    width: 300,
    fontSize: 13,
    fontFamily: "Kanit-Regular",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginTop: -10,
    marginBottom: -5
  },

  nameButton: {
    fontSize: 13,
    fontFamily: "Kanit-Regular",

  }


});
