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
import { Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Footer } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'


export class NewsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
    // this.Readnews = this.Readnews.bind(this)
    this.renderNews = this.renderNews.bind(this);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: 'none'
    };
  };

  Readnews(news_id) {
    this.props.navigation.navigate('Readnews', { news_id: news_id })
  }


  componentDidMount() {

    axios.post('http://192.168.0.111/lostandfound/api/getnews.php', JSON.stringify({

      action: 'news',

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


  }

  renderNews() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource.length > 0) {
      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(

          <CardItem style={styles.direction}>

            <Card style={styles.cardfound}>


              <TouchableOpacity onPress={this.Readnews.bind(this, this.state.dataSource[i].news_id)}
                style={{ borderBottomColor: '#ADADAD', borderBottomWidth: 0 }}
              >
                <CardItem>
                  <TouchableHighlight>
                    <ResponsiveImage style={styles.imgnews} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/news/' + this.state.dataSource[i].news_img }} initWidth="125" initHeight="120" />
                  </TouchableHighlight>
                  <Body>
                    <Text style={styles.textCategoty}>
                      {this.state.dataSource[i].news_name}
                    </Text>

                    <Text style={styles.textCategoty2}>
                      {this.state.dataSource[i].news_description}
                    </Text>

                    <Text style={styles.textCategoty3}>
                      {this.state.dataSource[i].news_date_format}
                    </Text>
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
    const renderNews = this.renderNews;
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Content>
          <View>


            {renderNews()}

          </View>

        </Content>
      </Container>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: '#ecf0f1',
  },

  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },

  imgnews: {
    marginLeft: -7

  },

  cardfound: {
    flex: 0,
    borderColor: "white",
    marginBottom: -10,
    marginTop: -6,
    borderBottomWidth: 2,
    borderTopWidth: 3,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 4,
    width: '104%',

  },

  direction: {
    alignSelf: 'center'
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Kanit-Regular",
    textAlign: 'center',
    color: '#34495e',

  },




  textCategoty: {
    fontSize: 14,
    fontFamily: "Kanit-Regular",
    marginLeft: 10,
    color: '#333333'

  },

  textCategoty2: {
    fontSize: 12,
    marginLeft: 10,
    fontFamily: "Kanit-Regular",
    color: '#8d8d8d',
    height: 50
  },

  textCategoty3: {
    marginTop: 16,
    fontFamily: "Kanit-Regular",
    fontSize: 10,
    marginLeft: 10,
    color: '#333333',

  },
  barsearch: {
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#363636",
    height: 50

  }
});
