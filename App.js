import React, {Component} from 'react';
import { Root } from "native-base";
import Drawer from './src/navigators/drawer-navigator';
export default class App extends React.Component {

  
  render() {
    return (
      <Root navigation={this.props.navigation}>
      <Drawer/>
      </Root>
    );
  }
}

