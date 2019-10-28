import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CategoryScreen from "../screens/CategoryScreen";
import MessageScreen from "../screens/MessageScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CommentfoundScreen from "../screens/CommentfoundScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    header: null,
    headerMode: "none"
  }
);

export const CategoryNavigator = createStackNavigator(
  {
    Category: { screen: CategoryScreen }
  },
  {
    headerMode: "none"
  }
);

export const MessageNavigator = createStackNavigator(
  {
    Message: { screen: MessageScreen }
  },
  {
    headerMode: "none"
  }
);

export const NotificationNavigator = createStackNavigator(
  {
    Notification: { screen: NotificationScreen }
  },
  {
    headerMode: "none"
  }
);

export const SettingsNavigator = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    headerMode: "none"
  }
);

export const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen }
  },
  {
    header: null,
    headerMode: "none"
  }
);

export const SearchNavigator = createStackNavigator(
  {
    Search: { screen: SearchScreen }
  },
  {
    header: null,
    headerMode: "none"
  }
);

export const LoginNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen }
  },
  {
    headerMode: "none"
  }
);

// export const NewsNavigator = createStackNavigator({
//   News: { screen: NewsScreen }
// });

// export const FoundNavigator = createStackNavigator({
//   Found: { screen: FoundScreen }
// });

// export const LostNavigator = createStackNavigator({
//   Lost: { screen: LostScreen }
// });
