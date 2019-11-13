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
  Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { Component } from "react";
import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';


export default class PostfoundScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      dataSource: [],
      signupText1: '',
      signupText2: '',
      signupText3: '',
      signupText4: '',
      ImageSource: null,
      gps: '',
      markers: ''
    };
    this.addPostfound = this.addPostfound.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderMap = this.renderMap.bind(this)
    this.getLocation = this.getLocation.bind(this)
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

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  getLocation() {
    Geolocation.getCurrentPosition((info) => {

      Geocoder.init("AIzaSyBr3R31JkS0lWvoxQTnkU-LMjc7yp5m458");
      Geocoder.from(info.coords.latitude, info.coords.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components[0];
          this.setState({ signupText4: addressComponent.long_name })
          // console.warn(addressComponent);
          // console.warn(this.state.signupText4);

        })
        .catch(error => console.warn(error));


      this.setState({ gps: '' })
      this.setState({ gps: info })
      this.setState({ markers: info })
      this.setState({ location_drag: info.coords })
      // console.warn(info);
    });
  }

  renderMap() {

    if (this.state.gps != '' && this.state.gps != undefined) {
      // console.warn(this.state.gps)
      return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.gps.coords.latitude,
            longitude: this.state.gps.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          region={{
            latitude: this.state.gps.coords.latitude,
            longitude: this.state.gps.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >


          <Marker draggable
            coordinate={this.state.gps.coords}
            onDragEnd={(e) => {
              this.setState({ location_drag: e.nativeEvent.coordinate })
              Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                .then(json => {
                  var addressComponent = json.results[0].address_components[0];
                  this.setState({ signupText4: addressComponent.long_name })
                  // console.warn(addressComponent);
                  // console.warn(this.state.signupText4);
                })
                .catch(error => console.warn(error));
              // console.warn('sssss', e.nativeEvent.coordinate)
            }}
          />

        </MapView>
      )
    }
  }

  async addPostfound() {
    // if (this.state.signupText1 == '') {
    //   Alert.alert(
    //     'คำเตือน!',
    //     'กรุณากรอกหัวข้อ',
    //     [

    //       { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
    //     ],
    //     { cancelable: false },
    //   );
    // }
    // else if (this.state.signupText2 == '') {
    //   Alert.alert(
    //     'คำเตือน!',
    //     'กรุณาใส่ชนิด',
    //     [

    //       { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
    //     ],
    //     { cancelable: false },
    //   );
    // }
    // else if (this.state.signupText3 == '') {
    //   Alert.alert(
    //     'คำเตือน!',
    //     'กรุณากรอกรายละเอียด',
    //     [

    //       { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
    //     ],
    //     { cancelable: false },
    //   );
    // }

    // else {
    const signup_id = await AsyncStorage.getItem('signup_id')

    var data = new FormData();
    data.append('action', 'addpostfound');
    data.append('signupid', signup_id);
    data.append('signup1', this.state.signupText1);
    data.append('signup2', this.state.selected2);
    data.append('signup3', this.state.signupText3);
    data.append('signup4', this.state.signupText4);
    data.append('lat', this.state.location_drag.latitude);
    data.append('lon', this.state.location_drag.longitude);
    data.append('image',
      {
        uri: this.state.ImageUri,
        name: 'image',
        type: 'image/jpg'
      });

// console.warn(data)
    axios.post('http://192.168.0.111/lostandfound/api/addpostfound.php', data,
      { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        this.props.navigation.goBack();
      })
      .catch(err => {
        throw err;
      });
  }


  // }




  componentDidMount() {

    axios.post('http://192.168.0.111/lostandfound/api/getcategory.php', JSON.stringify({

      action: 'category',

    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        })

      })
      .catch(err => {
        throw err;
      });

    this.getLocation();

  }

  renderCategory() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource.length > 0) {
      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(
          <Picker.Item label={this.state.dataSource[i].category_name} value={this.state.dataSource[i].category_id} />

        )
      }

    } else {
      arr.push(
        <Picker.Item label="ไม่มีข้อมูล" value="0" />

      )

    }
    return arr;
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
    const renderCategory = this.renderCategory;
    return (
      <Container>
        <Content>


          <Left>
            <Body >
              <Text style={styles.lableTopicpostfound}>1. ระบุหัวข้อ</Text>
            </Body>
          </Left>


          <Item regular style={styles.textBox}>
            <Input onChangeText={this.onTextChange1} value={this.state.signupText1} style={styles.textboxInsert} />
          </Item>


          <Left>
            <Body >
              <Text style={styles.lableTopicpostfound}> 2. ชนิดสิ่งของ</Text>
            </Body>
          </Left>


          <Item picker style={styles.typeInput}>
            <Picker onChange={this.onTextChange2} value={this.state.signupText2}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              {renderCategory()}


            </Picker>
          </Item>



          <Left>
            <Body >
              <Text style={styles.lableTopicpostfound}>  3. รายละเอียด</Text>
            </Body>
          </Left>


          <Form style={styles.textareaBox}>
            <Textarea onChangeText={this.onTextChange3} value={this.state.signupText3} style={styles.textboxInsert3} rowSpan={5} bordered />
          </Form>

          <Left>
            <Body >
              <Text style={styles.lableTopicpostfound3}> 4. เพิ่มรูปภาพ</Text>
            </Body>
          </Left>


          <CardItem cardBody style={styles.imageReadnews}>
            {this.state.ImageSource === null ?
              <Image source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/found/default.png' }} style={{ height: 200, width: null, flex: 1 }} /> :
              <Image style={{ height: 200, width: null, flex: 1 }} source={this.state.ImageSource} />
            }

          </CardItem>



          <Button style={styles.addimgButton} iconLeft block warning onPress={this.selectPhotoTapped.bind(this)}>
            <Icon name='ios-add-circle-outline' />
            <Text style={styles.nameButton}>เพิ่มรูปภาพที่นี่...</Text>
          </Button>




          <Left>
            <Body >
              <Text style={styles.lableTopicpostfound}> 5. เพิ่มสถานที่</Text>
            </Body>
          </Left>


          <Item regular style={styles.textBox}>
            <Input
              onChangeText={this.onTextChange4}
              value={this.state.signupText4}
              style={styles.textboxInsert} />
          </Item>

          <CardItem>
            <View style={styles.container_map}>
              <Text style={styles.nameButton}>เพิ่มสถานที่ที่นี่...</Text>
              {this.renderMap()}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.getLocation}
                style={styles.TouchableOpacityStyle}
              >
                <Image
                  source={{
                    uri:
                      "http://192.168.0.111/lostandfound/img_upload/logo/adventures.png"
                  }}
                  style={styles.FloatingButtonStyle}
                />
              </TouchableOpacity>
            </View>
          </CardItem>



          <Button onPress={this.addPostfound} style={styles.addimgButton3} full success>
            <Text style={styles.addpostButton}>ส่งโพสต์</Text>
          </Button>


        </Content>

      </Container>
    );
  }
}
let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
  },
  container_map: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'scroll'
  },
  map: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },


  lableTopicpostfound: {
    fontSize: 15,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    paddingTop: 6,
    left: -150,
    marginRight: 0,
    marginBottom: 0,

    color: "#333333"

  },

  lableTopicpostfound3: {
    fontSize: 15,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    paddingTop: 6,
    left: -150,
    marginRight: 0,
    marginBottom: 6,

    color: "#333333"

  },

  imageReadnews: {
    width: '100%',

    //  marginLeft: 20,
    //  marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  textBox: {
    borderRadius: 0,

    marginLeft: 6,
    marginTop: 6,
    paddingRight: 0,
    width: 400,
    height: 40


  },

  bottonDelete: {

    paddingLeft: 0,
    paddingRight: 0,
    right: 0,


  },

  textareaBox: {

    marginLeft: 6,
    marginTop: 6,
    paddingRight: 100,
    width: 500,
    height: 128


  },

  textboxInsert: {
    fontFamily: "Kanit-Regular",

    fontSize: 15
  },

  textboxInsert3: {
    fontFamily: "Kanit-Regular",

    fontSize: 15

  },

  nameButton: {
    fontSize: 15,
    fontFamily: "Kanit-Regular",

    paddingLeft: 5


  },

  addimgButton: {
    
    marginLeft: 5,
    marginTop: 6,
    width: 400

  },

  addimgButton3: {
    fontFamily: "Kanit-Regular",

    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 400

  },

  typeInput: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginLeft: 5,
    marginTop: 6,
    height: 40,
    width: 400

  },


  typeitemInput: {
    marginTop: 60,
    height: 400,
    width: 4000

  },

  addpostButton: {
    fontFamily: "Kanit-Regular",

    fontSize: 18

  }

});
