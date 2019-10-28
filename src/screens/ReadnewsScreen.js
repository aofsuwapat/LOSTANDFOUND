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
import { Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'


export default class ReadnewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    
    this.renderNews = this.renderNews.bind(this);
  }

  componentDidMount() {
    axios.post('http://192.168.0.105/lostandfound/api/getnews.php', JSON.stringify({

      action: 'readnews',
      id: this.props.navigation.getParam('news_id')

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
    // console.warn('xxxx',this.state.dataSource)

    if (this.state.dataSource !='' ) {
      
        arr.push(
        

          <Card style={styles.cardReadnews}>

            

            <CardItem cardBody style={styles.imageReadnews}>
              <Image source={{uri: 'http://192.168.0.105/lostandfound/img_upload/news/'+this.state.dataSource.news_img }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>

            <CardItem >
              <Left>
                <Body>

                <Text style={styles.textReadnews3}>
                  {this.state.dataSource.news_date_format}
                  </Text>

                  <Text style={styles.textReadnews}>
                  {this.state.dataSource.news_name}
                  </Text>

                  <Text note style={styles.textReadnews2}>
                  {this.state.dataSource.news_description}
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

  
  render() {
    const renderNews = this.renderNews;
    return (
      <Container>
        <Content>
        {renderNews()}

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

imageReadnews: {
   width: '100%',
  //  marginLeft: 20,
  //  marginRight: 20,
  paddingLeft: 10,
  paddingRight: 10,
},

textReadnews: {
 
  fontSize: 17,
  paddingBottom: 0,
  marginLeft: 0,
  marginRight:0,
  color: "#333333"
  
},

textReadnews2: {
  

  fontSize: 14,
  marginTop: 8,
  paddingBottom: 0,
  marginLeft: 0,
  marginRight:0,

  color: "#333333",
},
textReadnews3: {
 
  fontSize: 10,
  paddingBottom: 3,
  marginLeft: 0,
  marginRight:0,
  color: "#333333"
  
},

cardReadnews: {
  height:'100%',
}

});
