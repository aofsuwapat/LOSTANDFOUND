import React from "react";
import { createDrawerNavigator, createAppContainer ,createStackNavigator} from "react-navigation";
import BottomTabNavigator from "./bottom-tab-navigator";
import { SettingsNavigator } from "./screen-stack-navigators";
import CommentfoundScreen from "../screens/CommentfoundScreen";
import PostfoundScreen from "../screens/PostfoundScreen";
import PostlostScreen from "../screens/PostlostScreen";
import ReadnewsScreen from "../screens/ReadnewsScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfilefoundScreen from "../screens/ProfilefoundScreen";
import SignupScreen from "../screens/SignupScreen";
import MapPinScreen from "../screens/MapPinScreen";
import CategoryScreen from "../screens/CategoryScreen";
import LoadScreen from "../screens/LoadScreen";
import EditprofileScreen from "../screens/EditprofileScreen";


import { Logo } from "../components/header/header";



const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: BottomTabNavigator,
      navigationOptions: ({ navigation }) => ({  
        headerTitle: <Logo />,
        headerBackTitle: "Home",
        headerLayoutPreset: "center"
      }) 
    
    },


    Commentfound: {
      screen: CommentfoundScreen,
          navigationOptions: ({ navigation }) => ({  
            headerTitle: 'รายละเอียด',
            headerBackTitle: "Comment",
            headerLayoutPreset: "center"
          }) 
    
    },

    Postfound: {
      screen: PostfoundScreen,
          navigationOptions: ({ navigation }) => ({  
            headerTitle: 'โพสต์เจอของ',
            headerBackTitle: "Comment",
            headerLayoutPreset: "center"
          }) 
    
    },

    Postlost: {
      screen: PostlostScreen,
          navigationOptions: ({ navigation }) => ({  
            headerTitle: 'โพสต์ตามหาของ',
            headerBackTitle: "Comment",
            headerLayoutPreset: "center"
          }) 
    
    },

    
    Login: {
      screen: LoginScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Profilefound: {
      screen: ProfilefoundScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Profile: {
      screen: ProfileScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Map: {
      screen: MapPinScreen,
      navigationOptions: ({ navigation }) => ({  
        headerTitle: 'Map',
        headerBackTitle: "Map",
        headerLayoutPreset: "center"
      }) 
    
    },


    Signup: {
      screen: SignupScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Editprofile: {
      screen: EditprofileScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Category: {
      screen: CategoryScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Load: {
      screen: LoadScreen,
          navigationOptions: ({ navigation }) => ({  
            header: null,
            headerMode: 'none'
          }) 
    
    },

    Readnews: {
      screen: ReadnewsScreen,
          navigationOptions: ({ navigation }) => ({  
            headerTitle: 'รายละเอียด',
            headerBackTitle: "Comment",
            headerLayoutPreset: "center"
          }) 
    
    },
 
    

  },
  {
    initialRouteName: 'Load',
    
  },
);
const Drawer = createAppContainer(HomeStackNavigator);

export default Drawer;
