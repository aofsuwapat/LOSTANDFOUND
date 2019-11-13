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
import axios from 'axios'

export default class CategoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
    // this.Readnews = this.Readnews.bind(this)
    this.renderCategory = this.renderCategory.bind(this);

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: 'none'
    };
  };

  Mapicon(category_id) {
    this.props.navigation.navigate('Mapicon',{category_id : category_id})
  }

  componentDidMount() {

    axios.post('http://192.168.0.111/lostandfound/api/getcategory.php', JSON.stringify({

      action: 'category',

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


  renderCategory() {
    var arr = [];
    // console.warn('xxxx', this.state.dataSource)

    if (this.state.dataSource.length > 0) {
      for (var i = 0; i < this.state.dataSource.length; i++) {
        arr.push(

        

            <TouchableOpacity onPress={this.Mapicon.bind(this,this.state.dataSource[i].category_id)}>
              <View style={styles.menuBox}>

                <Image style={styles.icon} source={{ uri: 'http://192.168.0.111/lostandfound/img_upload/category/' + this.state.dataSource[i].category_img }} />
                
                <Text style={styles.info}>
                  {this.state.dataSource[i].category_name}
                </Text>

              </View>
            </TouchableOpacity>



            /* <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/cell-phone/dusk/50/ffffff' }} /> */


          
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

    const renderCategory = this.renderCategory;
    return (

      <Content>

      <View style={styles.container}>


      { renderCategory()}




      </View>

      </Content>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 9,
    paddingLeft: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox: {
    backgroundColor: "#DCDCDC",
    width: 105,
    height: 105,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,
    marginTop:5,
    marginLeft:13,
    marginRight:10
    // margin: 13

  },
  icon: {
    width: 50,

    height: 50
  
  },
  info: {
    fontSize: 17,
    fontFamily: "Kanit-Regular",
    marginTop: 10,
    color: "#696969"
  }

});
