import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import {
  HomeNavigator,
  CategoryNavigator,
  MessageNavigator,
  NotificationNavigator,
  ProfileNavigator
  
} from "./screen-stack-navigators";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === "หน้าหลัก") {
    iconName = "ios-home";
  } 
  else if (routeName === "หมวดหมู่") {
    iconName = "ios-keypad";
  } 
  // else if (routeName === "ข้อความ") {
  //   iconName = "ios-mail";
  // } 
  // else if (routeName === "แจ้งเตือน") {
  //   iconName = "ios-notifications";
  // } 
  else if (routeName === "โปรไฟล์") {
    iconName = "ios-contact";
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    หน้าหลัก: HomeNavigator,
    หมวดหมู่: CategoryNavigator,
    // ข้อความ: MessageNavigator,
    // แจ้งเตือน: NotificationNavigator,
    โปรไฟล์: ProfileNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor) ,
        
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray"
    },

    // headerMode:'null'
  }
);

export default BottomTabNavigator;
