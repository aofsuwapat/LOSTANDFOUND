import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, AsyncStorage
} from "react-native";
import React, { Component } from "react";
import { Logo } from "../components/header/header";
import { ButtonGroup } from "react-native-elements";
import { NewsScreen } from "../screens/sub-screen/NewsScreen";
import { FoundScreen } from "../screens/sub-screen/FoundScreen";
import { LostScreen } from "../screens/sub-screen/LostScreen";
import { LoginScreen } from "../screens/LoginScreen";
import SearchBar from 'react-native-searchbar';
import {
  Container,
  Content,
  Button,
  Icon,
  Keyboard,
  Header,
  Card,
  Thumbnail,
  Body,
  CardItem,
  Left,
  Right
} from "native-base";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedIndex: 0,
      signup_id: ""
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.AddPageFound = this.AddPageFound.bind(this);
    this.AddPageLost = this.AddPageLost.bind(this);
    this.renderAddButton = this.renderAddButton.bind(this);
    this.AddPageLogin = this.AddPageLogin.bind(this);
    this.AddPageSignup = this.AddPageSignup.bind(this);

  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    // console.warn(this.props.navigation)
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerMode: "none"
    };
  };

  AddPageLogin() {
    this.props.navigation.navigate('Login')

  }
  AddPageSignup() {
    this.props.navigation.navigate('Signup')

  }
  AddPageFound() {
    this.props.navigation.navigate('Postfound')

  }
  AddPageLost() {
    this.props.navigation.navigate('Postlost')

  }
  search() {
    // console.warn('555555')
    this.props.navigation.navigate('Result', { keyword: this.state.keyword.toString(), });
  }
  renderAddButton(menuNo, signup_id) {


    if (menuNo == 1 && signup_id != 'Guest' && signup_id != '') {
      return (<TouchableOpacity
        activeOpacity={0.5}
        onPress={this.AddPageFound}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={{
            uri:
              "http://192.168.0.111/lostandfound/img_upload/logo/add.png"
          }}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>)
    }
    if (menuNo == 2 && signup_id != 'Guest' && signup_id != '') {
      return (<TouchableOpacity
        activeOpacity={0.5}
        onPress={this.AddPageLost}
        style={styles.TouchableOpacityStyle}
      >
        <Image
          source={{
            uri:
              "http://192.168.0.111/lostandfound/img_upload/logo/add.png"
          }}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>)
    }

  }

  async  componentDidMount() {
    // console.warn(this.props.navigation);
    const signup_id = await AsyncStorage.getItem('signup_id')
    await this.setState({
      signup_id: signup_id
    })
    // console.warn(signup_id);
  }
  render() {
    const component1 = () => <Text style={styles.nameButton}>ข่าวสาร</Text>;
    const component2 = () => <Text style={styles.nameButton}>เจอของ</Text>;
    const component3 = () => <Text style={styles.nameButton}>ตามหาของ</Text>;
    const renderAddButton = this.renderAddButton;
    const buttons = [
      { element: component1 },
      { element: component2 },
      { element: component3 }
    ];
    const { selectedIndex } = this.state;
    const { navigate } = this.props;
    return (

      <Container style={{ backgroundColor: "white" }}>
        <Header style={styles.bg} >


            <SearchBar
              ref={(ref) => this.searchBar = ref}
              // data={items}
              placeholder={'ค้นหาสิ่งของ'}
              onSubmitEditing={this.search.bind(this)}
              fontFamily={"Kanit-Regular"}
              fontSize={20}
              handleChangeText={keyword => this.setState({ keyword })}

            />
            <Right>
              <Button transparent style={[styles.searchButton, { zIndex: 1 }]} onPress={() => this.searchBar.show()}>
                <Icon name="ios-search" style={{ color: 'white' }} />
              </Button>
            </Right>


        </Header>
        <View>
          <View
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: "rgb(255,255,255)"
            }}
          >
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              selectedButtonStyle={{ backgroundColor: "gray" }}
              selectedTextStyle={{ color: "black" }}
              containerStyle={{ height: 35 }}
            />
          </View>

          <ScrollView>
            <RenderPage
              indexMenu={this.state.selectedIndex}
              navigation={this.props.navigation}
            />
          </ScrollView>

          {renderAddButton(this.state.selectedIndex, this.state.signup_id)}




        </View>

        {/* <View style={styles.container}>
            <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 100}} />
            </View> */}
      </Container>
    );
  }
}

class RenderPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    if (this.props.indexMenu == 0) {
      return <NewsScreen navigation={this.props.navigation} />;
    } else if (this.props.indexMenu == 1) {
      return <FoundScreen navigation={this.props.navigation} />;
    } else if (this.props.indexMenu == 2) {
      return <LostScreen navigation={this.props.navigation} />;
    } else {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 110
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },

  nameButton: {


    fontSize: 14,
    fontFamily: "Kanit-Regular"

  },

  nameButton2: {


    fontSize: 14,
    fontFamily: "Kanit-Regular"

  },

  ontop: {
    left: 0,
    right: 0,
    top: 0,
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  },

  bg: {
    backgroundColor: "#363636"
  },


  barsearch: {
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#363636",
    height: 50

  }
});
