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



export default class ProfilefoundScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
    // this.gotoComment = this.gotoComment.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.getFound = this.getFound.bind(this);


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
    axios.post('http://192.168.0.105/lostandfound/api/getlikefound.php', JSON.stringify({

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

  async getFound() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

      action: 'founduser',
      id: signup_id
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        })
        console.warn(response.data)
      })
      .catch(err => {
        throw err;
      });


  }

  deletePostfound(found_id) {

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
            axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

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


  




  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

      action: 'founduser',
      id: signup_id
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data
        })
        console.warn(response.data)
      })
      .catch(err => {
        throw err;
      });


  }

  renderFound() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource.length > 0) {
      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(

          <CardItem style={styles.direction}>

            <Card style={styles.cardfound}>
              <TouchableOpacity onPress={this.Commentfound.bind(this, this.state.dataSource[i].found_id)}
                style={{ borderBottomColor: "#ADADAD", borderBottomWidth: 0 }}
              >
                <CardItem style={styles.cardContent}>

                  <TouchableOpacity onPress={this.deletePostfound.bind(this, this.state.dataSource[i].found_id)}style={styles.bottonDelete}>
                    <Icon name='ios-close' style={{ fontSize: 30, color: 'red' }} />
                  </TouchableOpacity>

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
          </CardItem>

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
