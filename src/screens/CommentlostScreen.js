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
import { Item, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import { Col, Row, Grid } from "react-native-easy-grid";
import Geolocation from '@react-native-community/geolocation';
import getDirections from 'react-native-google-maps-directions'
import axios from 'axios'


export default class CommentlostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      commentText: '',
      dataCommentSource: [],
      gps: '',
      markers: ''
    };

    this.renderLost = this.renderLost.bind(this);
    this.renderComment = this.renderComment.bind(this);

    this.addComment = this.addComment.bind(this);
    this.renderCommentLost = this.renderCommentLost.bind(this);
    this.getComment = this.getComment.bind(this);

    this.renderMap = this.renderMap.bind(this)

  }

  onTextChange = (value) => {
    this.setState({ commentText: value })
  }
  getLocation() {
    Geolocation.getCurrentPosition((info) => {
      this.setState({ gps: '' })
      this.setState({ gps: info })
      this.setState({ markers: info })
      this.setState({ location_drag: info.coords })
      // console.warn(info);
    });
  }
  gotoMap(source_coords, dest_coords) {
    // console.warn(source_coords)
    const data = {
      source: {
        latitude: source_coords.latitude,
        longitude: source_coords.longitude
      },
      destination: {
        latitude: dest_coords.lost_latitude,
        longitude: dest_coords.lost_longitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],

      waypoints: [
        {
          latitude: dest_coords.lost_latitude,
          longitude: dest_coords.lost_longitude
        },
      ]
    }

    getDirections(data)
  }
  renderMap() {

    if (this.state.gps != '' && this.state.gps != undefined && this.state.dataSource != '' && this.state.dataSource != undefined) {
      // console.warn(this.state.gps)
      return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(this.state.dataSource.lost_latitude),
            longitude: parseFloat(this.state.dataSource.lost_longitude),
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          region={{
            latitude: parseFloat(this.state.dataSource.lost_latitude),
            longitude: parseFloat(this.state.dataSource.lost_longitude),
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >


          <Marker
            coordinate={{
              latitude: parseFloat(this.state.dataSource.lost_latitude),
              longitude: parseFloat(this.state.dataSource.lost_longitude)
            }}


            onPress={this.gotoMap.bind(this, this.state.location_drag, this.state.dataSource)}
          />

        </MapView>
      )
    }
  }


  deleteCommentlost(comment_id) {

    Alert.alert(
      '',
      'ต้องการลบคอมเมนต์ ?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'ตกลง',
          onPress: () => {
            axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

              action: 'deletecommentlost',
              id: comment_id
            }))
              .then(response => {
                this.getComment();
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



  async addComment() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    await this.setState({ signup_id: signup_id });
    axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

      action: 'addcommentlost',
      comment: this.state.commentText,
      signupid: signup_id,
      id: this.props.navigation.getParam('lost_id')
    }))
      .then(response => {
        this.setState({ commentText: '' })

        axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

          action: 'getcommentlost',
          id: this.props.navigation.getParam('lost_id')

        }))
          .then(response => {
            this.setState({
              isLoading: false,
              dataCommentSource: response.data
            })
            // console.warn(response.data)
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });


  }


  getComment() {
    axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

      action: 'getcommentlost',
      id: this.props.navigation.getParam('lost_id')

    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataCommentSource: response.data
        })

      })
      .catch(err => {
        throw err;
      });

  }



  async componentDidMount() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    await this.setState({ signup_id: signup_id });
    axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

      action: 'commentlost',
      id: this.props.navigation.getParam('lost_id')

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

    axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

      action: 'getcommentlost',
      id: this.props.navigation.getParam('lost_id')

    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataCommentSource: response.data
        })

      })
      .catch(err => {
        throw err;
      });


    this.getLocation();
  }

  renderComment() {
    // console.warn(this.state.signup_id)
    var arr = [];
    if (this.state.signup_id != 'Guest') {
      arr.push(
        <Footer style={styles.footComment}>

          <Left style={styles.boxinsertComment}>
            <Item rounded style={styles.insertComment}>
              <Input onChangeText={this.onTextChange} value={this.state.commentText} style={styles.textinboxinsertComment} placeholder='เพิ่มความคิดเห็น...' />
            </Item>
          </Left>

          <Right>
            <Button onPress={this.addComment} style={styles.bottonComment}>
              <Icon name="ios-add-circle-outline" />
            </Button>
          </Right>

        </Footer>
      )
      return arr;
    }

}


renderLost() {
  var arr = [];
  // console.warn('xxxx', this.state.dataSource)

  if (this.state.dataSource != '') {
    var url_profile;
    if (this.state.dataSource.signup_img == "" || this.state.dataSource.signup_name == null) {
      url_profile = 'admin.png';
    } else {
      url_profile = this.state.dataSource.signup_img
    }
    arr.push(


      <Card>

        <CardItem style={styles.cardprofile}>
          <Grid>

            <Col style={styles.pfpost}>
              <Thumbnail source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/signup/' + url_profile }} />
            </Col>

            <Col>
              <Row>
                <Text style={styles.fontTimeLikeComent3}>
                  {this.state.dataSource.signup_name == "" || this.state.dataSource.signup_name == null ? 'Admin*' : this.state.dataSource.signup_name}

                </Text>
              </Row>

              <Row>
                <Text style={styles.fontTimeLikeComent5}>
                  {this.state.dataSource.lost_date_format}
                </Text>
              </Row>

            </Col>

          </Grid>
        </CardItem>


        <CardItem >
          <Left>
            <Body>
              <Text style={styles.texttopicReadpostlost}>
                {this.state.dataSource.lost_topic}
              </Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem cardBody style={styles.imageReadpostlost}>
          <Image source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/lost/' + this.state.dataSource.lost_img }} style={{ height: 200, width: null, flex: 1 }} />

        </CardItem>

        <CardItem >
          <Grid style={styles.pfpost3}>

            <Col style={styles.pfpost2}>
              <View style={styles.container_map}>

                {this.renderMap()}
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.getLocation}
                  style={styles.TouchableOpacityStyle}
                >
                </TouchableOpacity>
              </View>
            </Col>

            <Col >
              <Text style={styles.textReadpostlost5}>
                {this.state.dataSource.lost_location}
              </Text>
            </Col>
          </Grid>
        </CardItem >



        <CardItem >
          <Left>
            <Body>
              <Text style={styles.textReadpostlost}>
                {this.state.dataSource.lost_detail}
              </Text>
            </Body>
          </Left>
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


renderCommentLost() {
  var arr = [];
  // console.warn('xxxx',this.state.dataSource)
  if (this.state.dataCommentSource.length > 0 && this.state.signup_id != '' && this.state.signup_id != undefined) {
    for (var i = 0; i < this.state.dataCommentSource.length; i++) {

      arr.push(


        <Card style={styles.borderRadius1}>


          <CardItem header style={styles.cardbottonDelete}>


            <Left>

              <Thumbnail style={styles.profilecommentReadpostlost} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/signup/' + this.state.dataCommentSource[i].signup_img }} />

              <Text style={styles.fontTimeLikeComent1}>
                {this.state.dataCommentSource[i].signup_username}
              </Text>

              <Text style={styles.fontTimeLikeComent2}>
                {this.state.dataCommentSource[i].lost_date_format}
              </Text>

            </Left>

            {this.state.dataCommentSource[i].comment_user == this.state.signup_id ?
              <TouchableOpacity onPress={this.deleteCommentlost.bind(this, this.state.dataCommentSource[i].comment_id)} style={styles.bottonDelete}>
                <Icon name='ios-close' style={{ fontSize: 30, color: 'red' }} />
              </TouchableOpacity> : <Text></Text>
            }



          </CardItem>


          <CardItem style={styles.cardComment}>
            <Left>
              <Body>
                <Text style={styles.textcommentReadpostlost}>
                  {this.state.dataCommentSource[i].comment_text}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>




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

  return (
    <Container>
      <Content>



        {this.renderLost()}

        {this.renderCommentLost()}




      </Content>



      {this.renderComment()}


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

  texttopicReadpostlost: {

    fontSize: 16,
    paddingBottom: 0,
    marginTop: -16,
    marginLeft: -16,
    marginRight: 0,
    marginBottom: -6,
    fontFamily: "Kanit-Regular",

    color: "#333333"

  },

  container_map: {
    ...StyleSheet.absoluteFillObject,
    // width: '50%',
    // height: 10,
    justifyContent: 'flex-end',
    // alignItems: 'center'
    overflow: 'scroll'
  },

  map: {
    flex: 1,
    width: '100%',
    height: 400,
  },

  cardComment: {
    paddingTop: 0

  },

  cardprofile: {
    paddingRight: 10

  },



  cardbottonDelete: {
    paddingBottom: 0,
    paddingTop: 5


  },


  textReadpostlost: {

    fontSize: 13,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    marginLeft: -10,
    marginRight: 0,
    color: "#333333"

  },


  textReadpostlost5: {

    fontSize: 14,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    marginLeft: 10,
    marginRight: 0,
    color: "#333333"

  },

  profilecommentReadpostlost: {
    marginLeft: -10,
    marginTop: 0,
    width: 40,
    height: 40
  },

  textcommentReadpostlost: {
    marginTop: -15,
    fontSize: 14,
    fontFamily: "Kanit-Regular",

    paddingBottom: 0,
    marginLeft: 29,
    marginRight: 0,
    color: "#333333"

  },

  imageReadpostlost: {
    width: '100%',

    //  marginLeft: 20,
    //  marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  iconComment: {
    color: "#000000",

    fontSize: 50,

  },

  bottonComment: {
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: "#00AA00"

  },

  bottonDelete: {
    borderRadius: 28,

    right: 0,
    position: "absolute",
    width: 20,
    height: 45
  },

  insertComment: {
    flex: 1,
    width: '170%',
    paddingLeft: 10,
    paddingRight: 10,

    marginTop: 6,
    marginBottom: 6
  },

  boxinsertComment: {
    paddingLeft: 10,

    paddingRight: 10

  },

  textinboxinsertComment: {
    fontSize: 15,
    fontFamily: "Kanit-Regular",
  },

  footComment: {
    backgroundColor: "#FFFFFF"
  },

  fontTimeLikeComent1: {
    color: "#333333",
    fontSize: 13,
    fontFamily: "Kanit-Regular",
    marginTop: -15,
    right: 0

  },

  fontTimeLikeComent2: {
    color: "#8d8d8d",
    marginTop: -15,
    fontFamily: "Kanit-Regular",
    fontSize: 13,
    right: 0

  },
  fontTimeLikeComent3: {
    color: "#333333",
    fontFamily: "Kanit-Regular",
    fontSize: 16,
    paddingLeft: 0,
    // marginLeft:-120,
    marginTop: 5,
    // left: -120
  },

  fontTimeLikeComent5: {
    color: "#8d8d8d",
    fontSize: 13,
    fontFamily: "Kanit-Regular",
    // marginLeft:-120

    // marginTop: 22,
    // marginLeft: -134,
    // left: -120

  },

  pfpost: {

    width: 70,



  },

  pfpost2: {

    width: 160,
    height: 100



  },

  pfpost3: {

    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 0




  },

  pfpost4: {

    width: 150,
    height: 100



  },

  fontTimeLikeComent4: {
    color: "#8d8d8d",
    fontFamily: "Kanit-Regular",
    fontSize: 14,
    marginTop: -25,
    right: 0

  }



});
