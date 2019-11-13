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
import { ButtonGroup } from 'react-native-elements';
export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selectedIndex: 0,
    }
    // this.gotoComment = this.gotoComment.bind(this);
    this.renderFound = this.renderFound.bind(this);
    this.getFound = this.getFound.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
    this.renderLost = this.renderLost.bind(this);
    this.getLost = this.getLost.bind(this);
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
  }

  async Likefound(found_id) {
    const signup_id = await AsyncStorage.getItem('signup_id')
    // console.warn(signup_id)
    if (signup_id != 'Guest') {


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
  }


  async getFound() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    console.warn(this.props.navigation.state.params.keyword.toString())
    await axios.post('http://192.168.0.111/lostandfound/api/getfound.php', JSON.stringify({

      signup_id: signup_id,
      action: 'search',
      keyword: await this.props.navigation.state.params.keyword.toString(),
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data,

        })
        console.warn(response.data)

      })
      .catch(err => {
        throw err;
      });

  }

  async getLost() {
    const signup_id = await AsyncStorage.getItem('signup_id')
    console.warn(this.props.navigation.state.params.keyword.toString())
    await axios.post('http://192.168.0.111/lostandfound/api/getlost.php', JSON.stringify({

      signup_id: signup_id,
      action: 'search',
      keyword: await this.props.navigation.state.params.keyword.toString(),
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data,

        })
        console.warn(response.data)

      })
      .catch(err => {
        throw err;
      });

  }




  componentDidMount() {
    this.getFound();
    this.setState({
      selectedIndex : 0
    })
    
    console.warn(this.state.selectedIndex)

  }

  async updateIndex(selectedIndex) {
    this.setState({ selectedIndex })



    if (selectedIndex == 0) {
      await this.getFound();
      console.warn(selectedIndex)
    }
    else if (selectedIndex == 1) {
      await this.getLost();
      console.warn(selectedIndex)
    }



  }
  renderFound() {
    var arr = [];
 
    if (this.state.dataSource.length > 0 && this.state.selectedIndex == 0 ) {


      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(

          <CardItem style={styles.direction}>

            <Card style={styles.cardfound}>
              <TouchableOpacity onPress={this.Commentfound.bind(this, this.state.dataSource[i].found_id)}
                style={{ borderBottomColor: "#ADADAD", borderBottomWidth: 0 }}
              >
                <CardItem style={styles.cardContent}>
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


  Commentlost(lost_id) {
    this.props.navigation.navigate('Commentlost', { lost_id: lost_id })
  }

  async Likelost(lost_id) {
    const signup_id = await AsyncStorage.getItem('signup_id')
    if (signup_id != 'Guest') {
      // console.warn(signup_id)
      axios.post('http://192.168.0.111/lostandfound/api/getlikelost.php', JSON.stringify({

        action: 'addpostlost',
        signupid: signup_id,
        likelostid: lost_id

      }))
        .then(response => {
          // console.warn(response.data)
          this.getLost();

        })
        .catch(err => {
          throw err;
        });

    }
  }


  renderLost() {
    var arr = [];


    if (this.state.dataSource.length > 0 && this.state.selectedIndex == 1 ) {

      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(

          <CardItem style={styles.direction}>

            <Card style={styles.cardlost}>
              <TouchableOpacity onPress={this.Commentlost.bind(this, this.state.dataSource[i].lost_id)}
                style={{ borderBottomColor: "#ADADAD", borderBottomWidth: 0 }}
              >
                <CardItem style={styles.cardContent}>
                  <Body>
                    <Text style={styles.textCategoty}>
                      {this.state.dataSource[i].category_name}
                    </Text>

                    <Text style={styles.textContent}>
                      {this.state.dataSource[i].lost_topic}
                    </Text>

                    <CardItem style={styles.footerIcon}>

                      <Left>
                        <Button transparent style={styles.iconLikeComent}
                          onPress={this.Likelost.bind(this, this.state.dataSource[i].lost_id)}>
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
                          {this.state.dataSource[i].lost_date_format}
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
    const buttons = ['เจอของ', 'หาของ']
    const renderFound = this.renderFound;
    const renderLost = this.renderLost;
    const { selectedIndex } = this.state
    return (
      <Container style={{ backgroundColor: "white" }}>
        <NavigationEvents
          onWillFocus={payload => { this.state.selectedIndex == 0 ? this.getFound() : this.getLost() }}

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
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              selectedButtonStyle={{ backgroundColor: "#363636" }}
              selectedTextStyle={{ color: 'white' }}
              containerStyle={{
                height: 35,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginBottom: 0,
                marginTop:10

              }}

              textStyle={{ fontFamily: 'Kanit-Regular', color: '#2d2d2d' }} />


          </View>
          <View>
         
            {selectedIndex === 0 ? renderFound() : renderLost()}
            {/* {selectedIndex === 1 ? renderLost() : <Text></Text>} */}
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
  cardlost: {
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
    fontSize: 11,
    fontFamily: "Kanit-Regular",
    paddingBottom: 7,
    marginLeft: 10,
    color: "#8d8d8d"
  },

  textContent: {
    fontSize: 16,
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
    borderRadius: 0
  },

  iconLikeComent: {
    color: "#8d8d8d",
    fontSize: 18,

    marginLeft: -3
  },

  iconLikeComent2: {
    color: "#8d8d8d",
    fontSize: 22,

    marginLeft: -3
  },

  fontLikeComent: {
    color: "#8d8d8d",
    fontSize: 12,
    fontFamily: "Kanit-Regular",

    paddingLeft: 7
  },
  fontTimeLikeComent: {
    color: "#8d8d8d",
    fontSize: 12,
    fontFamily: "Kanit-Regular",

    paddingLeft: 8
  }
});
