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
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { Component } from "react";
import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form } from 'native-base';
import ResponsiveImage from 'react-native-responsive-image';
import axios from 'axios'
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import ClusteredMapView from 'react-native-maps-super-cluster';

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12
}

export default class MapiconScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      dataSource: [],
      gps: '',
      markers: '',
      dataSourceFound: [],
      dataSourceLost: []
    };
    this.renderMap = this.renderMap.bind(this)
    this.getLocation = this.getLocation.bind(this)
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
  getLost() {
    axios.post('http://192.168.0.111/lostandfound/api/getcategory.php', JSON.stringify({

      action: 'getlostcategory',
      id: this.props.navigation.getParam('category_id')
    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSourceLost: response.data
        })
        // console.warn('Lost', response.data)
      })
      .catch(err => {
        throw err;
      });

  }

  getFound() {
    axios.post('http://192.168.0.111/lostandfound/api/getcategory.php', JSON.stringify({

      action: 'getfoundcategory',
      id: this.props.navigation.getParam('category_id')

    }))
      .then(response => {
        this.setState({
          isLoading: false,
          dataSourceFound: response.data
        })
        // console.warn('Found', response.data)
      })
      .catch(err => {
        throw err;
      });

  }
  async componentDidMount() {
    // console.warn(this.props.navigation.getParam('category_id'))
    await this.getLocation();
    await this.getFound();
    await this.getLost();
  }
  gotoDetailFound(found_id) {
    this.props.navigation.navigate('Commentfound', { found_id: found_id })
  }

  gotoDetailLost(lost_id) {
    this.props.navigation.navigate('Commentlost', { lost_id: lost_id })
  }

  renderMap() {
    var markersfound = [];
    var markerslost = [];
    if (this.state.dataSourceFound != '' && this.state.dataSourceFound != undefined) {
      // console.log('sssssss', this.state.dataSourceFound);
      for (var i = 0; i < this.state.dataSourceFound.length; i++) {
        markersfound.push(

          <Marker
            title={this.state.dataSourceFound[i].found_topic}
            coordinate={{
              latitude: parseFloat(this.state.dataSourceFound[i].found_latitude),
              longitude: parseFloat(this.state.dataSourceFound[i].found_longitude)
            }}

            title={this.state.dataSourceFound[i].found_topic}
            description={this.state.dataSourceFound[i].found_detail}
            image={{ uri: 'http://192.168.0.111/lostandfound/img_upload/category/' + this.state.dataSourceFound[i].found_pin }}
          />
        )
      }
    }

    if (this.state.dataSourceLost!= '' && this.state.dataSourceLost != undefined) {
      // console.log('sssssss', this.state.dataSourceLost);
      for (var i = 0; i < this.state.dataSourceLost.length; i++) {
        markerslost.push(

          <Marker
            title={this.state.dataSourceLost[i].lost_topic}
            coordinate={{
              latitude: parseFloat(this.state.dataSourceLost[i].lost_latitude),
              longitude: parseFloat(this.state.dataSourceLost[i].lost_longitude)
            }}

   
            title={this.state.dataSourceLost[i].lost_topic}
            description={this.state.dataSourceLost[i].lost_detail}
            image={{ uri: 'http://192.168.0.111/lostandfound/img_upload/category/' + this.state.dataSourceLost[i].lost_pin }}
          />
        )
      }
    }
    if (this.state.gps != '' && this.state.gps != undefined ) {

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
          showsBuildings={true}
          showsIndoors={true}
        >

          {/* {markersfound}
          {markerslost} */}
          {

            this.state.dataSourceFound.map(marker => (


                <MapView.Marker
                  coordinate={{
                    latitude: parseFloat(marker.found_latitude),
                    longitude: parseFloat(marker.found_longitude)
                  }}
                  title={marker.found_topic}
                  // description={marker.found_detail}
              
                  image={{ uri: 'http://192.168.0.111/lostandfound/img_upload/category/' + marker.found_pin }}
                  onCalloutPress={this.gotoDetailFound.bind(this, marker.found_id)}
                />
         
            ))}
          {
  
              this.state.dataSourceLost.map(marker => (
    
                <MapView.Marker
                  coordinate={{
                    latitude: parseFloat(marker.lost_latitude),
                    longitude: parseFloat(marker.lost_longitude)
                  }}
       
                  title={marker.lost_topic}
                  // description={marker.lost_detail}
                  image={{ uri: 'http://192.168.0.111/lostandfound/img_upload/category/' + marker.lost_pin }}
                  onCalloutPress={this.gotoDetailLost.bind(this, marker.lost_id)}

                />
         
              ))
          }
        </MapView>
      )
    }


  }




  render() {
    return (
      <View style={styles.container_map}>

        {this.renderMap()}
      </View>






    )
  }
}
let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  container_map: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'scroll'
  },
  map: {
    flex: 1,
    width: '100%',
    height: 400,
  },
});
