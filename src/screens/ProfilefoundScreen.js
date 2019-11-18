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

} from "react-native";
import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Keyboard,
  Header,
  View,
  Card,
  Thumbnail,
  Body,
  CardItem,

  Left,
  Right
} from "native-base";
import ResponsiveImage from "react-native-responsive-image";
import axios from 'axios'
import { NavigationEvents } from 'react-navigation';
import ActionSheet from 'react-native-zhb-actionsheet';
var BUTTONS = [
  { text: "แก้ไข", icon: "ios-build", iconColor: "#363636", },
  { text: "ลบ", icon: "trash", iconColor: "#363636" },
  { text: "ยกเลิก", icon: "close", iconColor: "#363636" }
];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;


export default class ProfilefoundScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.gotoComment = this.gotoComment.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.getFound = this.getFound.bind(this);
    this.defaultTitles = [{ title: 'Camera', action: () => { console.log('click Camera'); } },
    { title: 'Choose from Album', actionStyle: 'default', action: () => { console.log('click Choose from Album'); } },
    { title: 'Delete', actionStyle: 'destructive', action: () => { console.log('click Delete'); } },
    { title: 'Cancel', actionStyle: 'cancel', action: () => { console.log('click Cancel'); } }
    ];
    this.customTitles = [{ title: 'Title 1' }, { title: 'Title 2' }, { title: 'Title 3' }, { title: 'Title 4' }, { title: 'Title 5' },
    { title: 'Title 6' }, { title: 'Title 7' }, { title: 'Title 8' }];
    this.state = {
      dataSource: [],
      titles: this.defaultTitles
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: 'none'
    };
  };
  // gotoComment() {
  //   console.warn(this.props.navigation)
  //   this.props.navigation.navigate('Commentfound')
  // }

  Commentfound(found_id) {
    this.props.navigation.navigate('Commentfound', { found_id: found_id })
    // console.warn(found_id)
  }

  async Likefound(found_id) {
    const signup_id = await AsyncStorage.getItem('signup_id')
    // console.warn(signup_id)
    axios.post('http://192.168.0.111/lostandfound/api/getlikefound.php', JSON.stringify({

      action: 'addpostfound',
      signupid: signup_id,
      likefoundid: found_id

    }))
      .then(response => {
        // console.warn(response.data)
        this.getFound();

      })
      .catch(err => {
        throw err;
      });

  }

  Editfound() {
    this.props.navigation.navigate('Editfound')
  }

  async getFound() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.111/lostandfound/api/getfound.php', JSON.stringify({

      action: 'founduser',
      id: signup_id
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        })
        // console.warn(response.data)
      })
      .catch(err => {
        throw err;
      });


  }

  deletePostfound = (found_id) => {

    Alert.alert(
      '',
      'ต้องการลบ ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: () => {
            axios.post('http://192.168.0.111/lostandfound/api/getfound.php', JSON.stringify({

              action: 'deletepostfound',
              id: found_id
            }))
              .then(response => {
                this.getFound();
              })
              .catch(err => {
                throw err;
              });
          }
        },
      ],
      { cancelable: false },
    );




  }

  checkPostfound = (found_id) => {

    Alert.alert(
      '',
      'ต้องการแจ้งคืนของแล้ว ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: () => {
            axios.post('http://192.168.0.111/lostandfound/api/getfound.php', JSON.stringify({

              action: 'checkpostfound',
              id: found_id
            }))
              .then(response => {
                this.getFound();
              })
              .catch(err => {
                throw err;
              });
          }
        },
      ],
      { cancelable: false },
    );




  }






  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.111/lostandfound/api/getfound.php', JSON.stringify({

      action: 'founduser',
      id: signup_id
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        })
        // console.warn(response.data)
      })
      .catch(err => {
        throw err;
      });


  }
  showActionSheet(found_id) {
    this.props.navigation.navigate('Editfound', { found_id: found_id })
  }
  renderFound() {
    var arr = [];
    var actionsheet = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource.length > 0) {
      for (var i = 0; i < this.state.dataSource.length; i++) {
        const found_id = this.state.dataSource[i].found_id

        arr.push(

          <CardItem style={styles.direction}>

            <Card style={styles.cardfound}>
              <TouchableOpacity onPress={this.Commentfound.bind(this, this.state.dataSource[i].found_id)}
                style={{ borderBottomColor: "#ADADAD", borderBottomWidth: 0 }}
              >
                <CardItem style={styles.cardContent}>

                  {/* <TouchableOpacity onPress={this.deletePostfound.bind(this, this.state.dataSource[i].found_id)}style={styles.bottonDelete}>
                    <Icon name='ios-close' style={{ fontSize: 30, color: 'red' }} />
                  </TouchableOpacity> */}

                  <TouchableOpacity style={styles.bottonDelete2}
                    onPress={() => {
                      this.setState({
                        titles: [
                          { title: 'แจ้งคืนของแล้ว', action: () => { this.checkPostfound(found_id); } },
                          { title: 'แก้ไข', action: () => { this.props.navigation.navigate('Editfound', { found_id: found_id }); } },
                          { title: 'ลบ', actionStyle: 'destructive', action: () => { this.deletePostfound(found_id); } },
                          { title: 'ยกเลิก', actionStyle: 'cancel', action: () => { console.warn('click Cancel'); } }
                        ]
                      }, () => { this.refs.picker.show(); })
                    }}
                  >


                    <Icon name='ios-more' style={{ fontSize: 25, color: 'black' }} />
                  </TouchableOpacity>

                  {/* <TouchableOpacity onPress={this.Editfound.bind(this)} >
                    <Icon name='md-create' style={{ fontSize: 25, color: 'black' }} />
                  </TouchableOpacity> */}



                  <Body>


                    <Text style={styles.textCategoty}>
                      {this.state.dataSource[i].category_name}
                    </Text>





                    <Text style={styles.textContent}>
                      {this.state.dataSource[i].found_topic}
                    </Text>


                    <CardItem style={styles.footerIcon}>

                      <Left>
                        <Button transparent style={styles.iconLikeComent}
                          onPress={this.Likefound.bind(this, this.state.dataSource[i].found_id)}>
                          <Icon
                            active
                            name="thumbs-up"
                            style={styles.iconLikeComent2, { color: this.state.dataSource[i].is_like > 0 ? '#1C1C1C' : '#8d8d8d' }}
                          />
                          <Text style={styles.fontLikeComent}>
                            {this.state.dataSource[i].count_like}
                          </Text>
                        </Button>



                        <Button transparent style={styles.iconLikeComent}>
                          <Icon
                            active
                            name="chatbubbles"
                            style={styles.iconLikeComent}
                          />
                          <Text style={styles.fontLikeComent}>
                            {this.state.dataSource[i].count_comment}
                          </Text>
                        </Button>


                        {this.state.dataSource[i].found_check == 1 ?
                         <Button transparent >
                         <Icon
                           active
                           name="ios-checkmark-circle-outline"
                           style={{fontSize: 19, color: '#4CB051',  marginLeft: -15}}
                         />
                         <Text style={styles.fontLikeComent5}>
                           คืนแล้ว
                         </Text>
                       </Button>: <Text></Text> 
                        }
                       



                      </Left>

                      <Right>
                        <Text style={styles.fontTimeLikeComent}>
                          {this.state.dataSource[i].found_date_format}
                        </Text>
                      </Right>

                    </CardItem>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
          </CardItem >

        )
      }

    } else {
      arr.push(
        // <Picker.Item label="ไม่มีข้อมูล" value="0" />

      )

    }
    return arr;
  }




  render() {
    const renderFound = this.renderFound;
    return (
      <Container style={{ backgroundColor: "white" }}>
        <NavigationEvents
          onWillFocus={payload => { this.getFound() }}

        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={styles.TouchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>

        <Content>
          <View>

            <ActionSheet
              ref="picker"
              titles={this.state.titles}
              separateHeight={3}
              separateColor="#dddddd"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              containerStyle={{ margin: 10, borderRadius: 5 }}
              onClose={(obj) => { console.log('action sheet closed! clicked:' + JSON.stringify(obj)); }}
            />

            {renderFound()}

          </View>

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

  iconLikeComent2: {
    color: "#8d8d8d",
    fontFamily: "Kanit-Regular",

    fontSize: 22,
    marginLeft: -3
  },

  cardfound: {
    flex: 0,
    borderColor: "white",
    marginBottom: -10,
    marginTop: -3,
    borderBottomWidth: 2,
    borderTopWidth: 3,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 4,
    width: '103%',

  },

  direction: {
    alignSelf: 'center'
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Kanit-Regular",

    textAlign: "center",
    color: "#34495e"
  },

  textCategoty: {
    fontSize: 10,
    fontFamily: "Kanit-Regular",
    paddingBottom: 7,
    marginLeft: 10,
    color: "#8d8d8d"
  },

  textContent: {
    fontSize: 15,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    marginLeft: 10,
    color: "#333333"
  },

  footerIcon: {
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 0
  },
  cardContent: {
    paddingBottom: 0,
    paddingTop: 5,
    paddingRight: 15,
    borderRadius: 0
  },

  iconLikeComent: {
    color: "#8d8d8d",
    fontFamily: "Kanit-Regular",

    fontSize: 18,
    marginLeft: -3
  },

  bottonDelete: {
    borderRadius: 28,
    right: 0,
    position: "absolute",
    width: 20,
    height: 90
  },

  bottonDelete2: {
    borderRadius: 28,
    right: 0,
    position: "absolute",
    width: 30,
    height: 95
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

  fontLikeComent: {
    fontFamily: "Kanit-Regular",
    color: "#8d8d8d",
    fontSize: 12,
    paddingLeft: 8
  },
  fontTimeLikeComent: {
    color: "#8d8d8d",
    fontFamily: "Kanit-Regular",
    fontSize: 12,
    paddingLeft: 8
  },
  
  fontLikeComent5: {
    fontFamily: "Kanit-Regular",
    color: "#4CB051",
    fontSize: 12,
    paddingLeft: 5
  }
});
