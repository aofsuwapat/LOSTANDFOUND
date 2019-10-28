import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";



export class LostScreen extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }
 
  render() {
    

    return (
      <View style={styles.container}>
      <Text>
        LOST
        LOST
        LOSTLOST
        LOST
        LOSTLOST
        LOST
        
        </Text>            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  ontop:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    padding: 0,
    margin : 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
