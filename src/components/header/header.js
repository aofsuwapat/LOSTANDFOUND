import React from 'react'
import { Container, Content, Button, Icon, View, Header, Right, Left, Body } from 'native-base';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
const deviceWidth = Dimensions.get("window").width;
import SearchBar from 'react-native-searchbar';
export class Logo extends React.Component {
  state = {
    search: '',
  };
  componentDidMount() {
    console.warn('this.props.navigation',this.props.navigation)
  }
  updateSearch = search => {
    this.setState({ search });
  };
  search() {
    this.props.navigation.navigate('search', { keyword: this.state.keyword.toString(), });
  }
  render() {
    const { search } = this.state;

    return (

      <View style={styles.barsearch}>


        <SearchBar
          ref={(ref) => this.searchBar = ref}
          // data={items}
          placeholder={'ค้นหาร้านค้า'}
          onSubmitEditing={this.search.bind(this)}
          handleChangeText={keyword => this.setState({ keyword })}

        />
        <Right>
          <Button transparent style={[styles.searchButton, { zIndex: 1 }]} onPress={() => this.searchBar.show()}>
            <Icon name="ios-search" style={{ color: 'black' }} />
          </Button>
        </Right>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  searchButton: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // textAlign: 'right',

    // top: Platform.OS === 'ios' ? 0 : 4
  },

  barsearch: {
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#363636",
    height: 50

  },
 
});