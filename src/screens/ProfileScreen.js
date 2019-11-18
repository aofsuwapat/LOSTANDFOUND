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
import { Tab, Tabs, TabHeading, Item, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import Tab1 from './ProfilefoundScreen';
import Tab2 from './ProfilelostScreen';


// import Tab2 from './tabTwo';
import axios from 'axios';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' })
  ],
});

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      dataInfomationSource: []

    }
    // this.Readnews = this.Readnews.bind(this)
    this.hideProfile = this.hideProfile.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    // this.renderInfomationProfile = this.renderInfomationProfile.bind(this);
  }




  Editprofile() {
    this.props.navigation.navigate('Editprofile')
  }


  Logout() {


    Alert.alert(
      '',
      'คุณต้องการออกจากระบบ ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: async () => {
            await AsyncStorage.removeItem('signup_id')
            this.props.navigation.dispatch(resetAction);
          }
        },
      ],
      { cancelable: false },
    );




    // this.props.navigation.dismiss();
    // this.props.navigation.navigate('Login')
  }


  Logoutguest() {


    Alert.alert(
      '',
      'คุณต้องการไปที่หน้า Login ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: async () => {
            await AsyncStorage.removeItem('signup_id')
            this.props.navigation.dispatch(resetAction);
          }
        },
      ],
      { cancelable: false },
    );




    // this.props.navigation.dismiss();
    // this.props.navigation.navigate('Login')
  }


  // Readnews(user_id) {
  //   this.props.navigation.navigate('Readnews',{news_id:news_id})
  // }

  async getProfile() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    await this.setState({ signup_id: signup_id });
    axios.post('http://192.168.0.111/lostandfound/api/getprofile.php', JSON.stringify({

      action: 'profile',
      signupid: signup_id
    }))
      .then(response => {
        // console.warn(response.data)
        this.setState({
          isLoading: false,
          dataSource: response.data
        })

      })
      .catch(err => {
        throw err;
      });


  }
  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    await this.setState({ signup_id: signup_id });
    this.getProfile();
  }


  hideProfile() {

    var arr = [];
    if (this.state.signup_id == 'Guest' && this.state.signup_id != undefined) {
      // console.warn(this.state.signup_id)
      arr.push(

        <Content>

          <CardItem>
          <Body style={styles.container}>
            <Button rounded style={styles.addimgButton3} onPress={this.Logoutguest.bind(this)}>
              <Text style={styles.nameButton5}>ไปที่หน้า Login</Text>
            </Button>
            </Body>
          </CardItem>


        </Content>
      )
   
    }
    else {
      if (this.state.dataSource != '' && this.state.dataSource != undefined) {

        arr.push(
          <Container>
            <Card style={styles.cardprofile}>

              <CardItem>
                <TouchableOpacity style={styles.sizebuttonlogout} onPress={this.Logout.bind(this)}>
                  <Icon name='md-log-out' style={{ fontSize: 30, color: 'red' }} />
                </TouchableOpacity>
              </CardItem>


              <CardItem style={styles.direction}>
                <Thumbnail style={styles.sizeimageprofile} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/signup/' + this.state.dataSource.signup_img }} />
              </CardItem>


              <TouchableOpacity onPress={this.Editprofile.bind(this)} style={styles.sizebuttonlogout2}>
                <Icon name='md-create' style={{ fontSize: 25, color: 'black' }} />
              </TouchableOpacity>




              <CardItem style={styles.direction}>
                <Text style={styles.name}>
                  {this.state.dataSource.signup_name}
                </Text>
              </CardItem>

              <CardItem style={styles.direction}>
                <Text style={styles.username}>
                  {this.state.dataSource.signup_username}
                </Text>
              </CardItem>

            </Card>

            <Content>
              <NavigationEvents
                onWillFocus={payload => { this.getProfile() }}

              />
              {this.renderProfile()}


              <Tabs style={styles.nametap}>


                <Tab heading={<TabHeading style={styles.bgtap}><Text style={styles.nametap}>เจอของ</Text></TabHeading>}>
                  <Tab1 navigation={this.props.navigation} />
                </Tab>


                <Tab heading={<TabHeading style={styles.bgtap}><Text style={styles.nametap}>ตามหาของ</Text></TabHeading>}>
                  <Tab2 navigation={this.props.navigation} />
                </Tab>


              </Tabs>




            </Content>
          </Container>
        )
      }
    }
    return arr;
  }



  renderProfile() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)


    if (this.state.dataSource != '') {

      arr.push(



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

        {this.hideProfile()}

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
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },

  bghd: {

    color: "#FFFFFF",
    fontWeight: '300',
    height: 50
  },

  

  nametap: {
    color: "#FFFFFF",
    fontFamily: "Kanit-Regular"
  },

  bgtap: {
    backgroundColor: "#363636",
    fontFamily: "Kanit-Regular"

  },

  direction: {
    alignSelf: 'center'
  },

  direction2: {
    alignSelf: 'center',
    marginRight: -310,
    marginTop: -5

  },

  sizeimageprofile: {
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 63


  },

  name: {
    color: "#333333",
    fontSize: 19,
    fontFamily: "Kanit-Regular",

    // fontWeight: '500',
    marginTop: -10,


  },

  username: {
    fontFamily: "Kanit-Regular",

    color: "#8d8d8d",
    fontSize: 17,
    marginTop: -20,


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

  ontop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
    color: "#34495e"
  },

  textCategoty: {
    fontSize: 10,
    paddingBottom: 7,
    marginLeft: 10,
    color: "#8d8d8d"
  },

  textContent: {
    fontSize: 15,
    paddingBottom: 0,
    marginLeft: 10,
    color: "#333333"
  },
  addimgButton3: {
    height: 40,
    marginBottom: 50,
    marginTop: 200,
    width: 250,
    paddingLeft: 35,
    paddingRight: 40,
    backgroundColor: "#696969"


  },

  nameButton5: {
    marginTop: 0,
    fontSize: 15,
    paddingLeft: 40,
    paddingRight: 30,
    fontFamily: "Kanit-Medium"

  },

  footerIcon: {
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 0
  },
  cardContent: {
    paddingBottom: 0,
    paddingTop: 5,
    borderRadius: 0
  },

  iconLikeComent: {
    color: "#8d8d8d",
    fontSize: 20,
    marginLeft: -3
  },

  fontLikeComent: {
    color: "#8d8d8d",
    fontSize: 12,
    paddingLeft: 8
  },
  fontTimeLikeComent: {
    color: "#8d8d8d",
    fontSize: 12,
    paddingLeft: 8
  }





});
