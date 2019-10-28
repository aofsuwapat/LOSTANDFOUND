import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Textarea, Item, Picker, Input, Footer, Container, Content, Button, Icon, Text, Keyboard, Header, View, Card, Thumbnail, Body, CardItem, Left, Right, Form } from 'native-base';


export default class MapPinScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gps: '',
      markers: ''
    };
    this.renderMap = this.renderMap.bind(this)
  }
  componentDidMount() {
    Geolocation.getCurrentPosition((info) => {
      this.setState({ gps: info })
      this.setState({ markers: info })
      console.warn(info);
    });
  }
  renderMap() {

    if (this.state.gps != '' && this.state.gps != undefined) {
      // console.warn(this.state.gps)
      return (
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.gps.coords.latitude,
            longitude: this.state.gps.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
        >


          <Marker draggable
            coordinate={this.state.gps.coords}
            onDragEnd={(e) => {
              this.setState({ location_drag: e.nativeEvent.coordinate })
              // console.warn('sssss', e.nativeEvent.coordinate)
            }}
          />

        </MapView>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
        <Button style={styles.styleButton}>
          <Text>Click Me!</Text>
        </Button>
      </View>
    );
  }
}

let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container_map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  styleButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('MAP', () => MAP);