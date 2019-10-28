import React from 'react'
import {Image, TouchableOpacity, Dimensions} from 'react-native'
import { SearchBar } from 'react-native-elements';

import Icon from "react-native-vector-icons/Ionicons";
import {View} from "react-native";
const deviceWidth = Dimensions.get("window").width;

export class Logo extends React.Component {
    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };

    render() {
        const { search } = this.state;

        return (
            //Add your logo in the image tag
            <View style={{ flex: 1 }}>

            <SearchBar
            placeholder=""
            onChangeText={this.updateSearch}
            value={search}

            lightTheme={false}
            round={true}
            font-size={20}
            />
            </View>
        );
    }
}

