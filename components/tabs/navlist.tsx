import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';



function Navlist() {
      // Sử dụng useNavigation để lấy navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                 <Text>Account</Text>{/*<AntDesign name="user" size={24} color="black"/> */}
        </TouchableOpacity>
    )
}
export default Navlist;