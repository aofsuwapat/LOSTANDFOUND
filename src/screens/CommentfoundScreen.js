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

import axios from 'axios'


export default class CommentfoundScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      commentText: '',
      dataCommentSource: [],
      gps: '',
      markers: ''
    };

    this.renderFound = this.renderFound.bind(this);
    this.addComment = this.addComment.bind(this);
    this.renderCommentFound = this.renderCommentFound.bind(this);
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
      console.warn(info);
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
              console.warn('sssss', e.nativeEvent.coordinate)
            }}
          />

        </MapView>
      )
    }
  }

  async addComment() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

      action: 'addcommentfound',
      comment: this.state.commentText,
      signupid: signup_id,
      id: this.props.navigation.getParam('found_id')
    }))
      .then(response => {
        this.setState({ commentText: '' })

        axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

          action: 'getcommentfound',
          id: this.props.navigation.getParam('found_id')

        }))
          .then(response => {
            this.setState({
              isLoading: false,
              dataCommentSource: response.data
            })
            console.warn(response.data)
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });


  }

  componentDidMount() {
    axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

      action: 'commentfound',
      id: this.props.navigation.getParam('found_id')

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

    axios.post('http://192.168.0.105/lostandfound/api/getfound.php', JSON.stringify({

      action: 'getcommentfound',
      id: this.props.navigation.getParam('found_id')

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

  renderFound() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource != '') {

      arr.push(


        <Card>

          <CardItem style={styles.cardprofile}>
            <Grid>

              <Col style={styles.pfpost}>
                <Thumbnail source={{ uri: 'http://192.168.0.105/lostandfound/img_upload/signup/' + this.state.dataSource.signup_img }} />
              </Col>

              <Col>
                <Row>
                  <Text style={styles.fontTimeLikeComent3}>
                    {this.state.dataSource.signup_name}
                  </Text>
                </Row>

                <Row>
                  <Text style={styles.fontTimeLikeComent5}>
                    {this.state.dataSource.found_date_format}
                  </Text>
                </Row>

              </Col>

            </Grid>
          </CardItem>


          <CardItem >
            <Left>
              <Body>
                <Text style={styles.texttopicReadpostfound}>
                  {this.state.dataSource.found_topic}
                </Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem cardBody style={styles.imageReadpostfound}>
            <Image source={{ uri: 'http://192.168.0.105/lostandfound/img_upload/found/' + this.state.dataSource.found_img }} style={{ height: 200, width: null, flex: 1 }} />

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
                <Text style={styles.textReadpostfound5}>
                  {this.state.dataSource.found_location}
                </Text>
              </Col>
            </Grid>
          </CardItem >



          <CardItem >
            <Left>
              <Body>
                <Text style={styles.textReadpostfound}>
                  {this.state.dataSource.found_detail}
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


  renderCommentFound() {
    var arr = [];
    // console.warn('xxxx',this.state.dataSource)

    if (this.state.dataCommentSource.length > 0) {
      for (var i = 0; i < this.state.dataCommentSource.length; i++) {
        arr.push(


          <Card style={styles.borderRadius1}>


            <CardItem header style={styles.cardbottonDelete}>


              <Left>

                <Thumbnail style={styles.profilecommentReadpostfound} source={{ uri: 'http://192.168.0.105/lostandfound/img_upload/signup/' + this.state.dataCommentSource[i].signup_img }} />

                <Text style={styles.fontTimeLikeComent1}>
                  {this.state.dataCommentSource[i].signup_username}
                </Text>

                <Text style={styles.fontTimeLikeComent2}>
                  {this.state.dataCommentSource[i].found_date_format}
                </Text>

              </Left>


              <TouchableOpacity style={styles.bottonDelete}>
                <Icon name='ios-close' style={{ fontSize: 30, color: 'red' }} />
              </TouchableOpacity>


            </CardItem>


            <CardItem style={styles.cardComment}>
              <Left>
                <Body>
                  <Text style={styles.textcommentReadpostfound}>
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
    const renderFound = this.renderFound;
    const renderCommentFound = this.renderCommentFound;
    return (
      <Container>
        <Content>



          {renderFound()}




          {renderCommentFound()}




        </Content>




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

  texttopicReadpostfound: {

    fontSize: 16,
    paddingBottom: 0,
    marginTop: -16,
    marginLeft: -16,
    marginRight: 0,
    marginBottom: -6,

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


  textReadpostfound: {

    fontSize: 14,
    paddingBottom: 0,
    marginLeft: -10,
    marginRight: 0,
    color: "#333333"

  },


  textReadpostfound5: {

    fontSize: 14,
    paddingBottom: 0,
    marginLeft: 10,
    marginRight: 0,
    color: "#333333"

  },

  profilecommentReadpostfound: {
    marginLeft: -10,
    marginTop: 0,
    width: 40,
    height: 40
  },

  textcommentReadpostfound: {
    marginTop: -15,
    fontSize: 13,
    paddingBottom: 0,
    marginLeft: 29,
    marginRight: 0,
    color: "#333333"

  },

  imageReadpostfound: {
    width: '100%',

    //  marginLeft: 20,
    //  marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  iconComment: {
    color: "#000000",

    fontSize: 50

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
    fontSize: 15
  },

  footComment: {
    backgroundColor: "#FFFFFF"
  },

  fontTimeLikeComent1: {
    color: "#333333",
    fontSize: 13,
    marginTop: -15,
    right: 0

  },

  fontTimeLikeComent2: {
    color: "#8d8d8d",
    marginTop: -15,

    fontSize: 13,
    right: 0

  },
  fontTimeLikeComent3: {
    color: "#333333",
    fontSize: 16,
    paddingLeft: 0,
    // marginLeft:-120,
    marginTop: 5,
    // left: -120
  },

  fontTimeLikeComent5: {
    color: "#8d8d8d",
    fontSize: 13,
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

    paddingBottom:0,
    paddingLeft:0,
    marginLeft:0




  },

  pfpost4: {

    width: 150,
    height: 100



  },

  fontTimeLikeComent4: {
    color: "#8d8d8d",
    fontSize: 14,
    marginTop: -25,
    right: 0

  }



});
