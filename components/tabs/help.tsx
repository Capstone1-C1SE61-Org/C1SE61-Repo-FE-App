import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationProp, ParamListBase, Router, useNavigation } from '@react-navigation/native';
import HomeTabs from './home';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function Help(){
    return (
        <View>

        </View>

      );
}
export default Help;