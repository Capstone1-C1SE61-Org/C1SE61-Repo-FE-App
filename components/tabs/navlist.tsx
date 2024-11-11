import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationProp, ParamListBase, Router, useNavigation } from '@react-navigation/native';
import HomeTabs from './home';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function Navlist(){
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}onPress={()=> navigation.navigate('History')}>
          <Ionicons name="time-outline" size={24} color="black" />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text style={styles.menuText}>Terms & Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}onPress={()=> navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}onPress={() => navigation.navigate('help')}>
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    alignItems: 'flex-end',
    margin: 10,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
export default Navlist;