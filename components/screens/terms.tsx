import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface id {
    id: string;
    title: string;
    description: string;
}

// Dữ liệu giả lập cho các phần điều khoản và chính sách
const termsAndPolicies = [
  {
    id: '1',
    title: 'Giới thiệu',
    description: 'Giới thiệu về điều khoản và chính sách sử dụng của ứng dụng.',
  },
  {
    id: '2',
    title: 'Trách nhiệm người dùng',
    description: 'Người dùng chịu trách nhiệm đối với việc bảo mật tài khoản và các hoạt động trong ứng dụng.',
  },
  {
    id: '3',
    title: 'Chính sách bảo mật',
    description: 'Chúng tôi cam kết bảo vệ quyền riêng tư của bạn theo chính sách bảo mật.',
  },
  {
    id: '4',
    title: 'Giới hạn trách nhiệm',
    description: 'Chúng tôi không chịu trách nhiệm đối với các thiệt hại phát sinh từ việc sử dụng ứng dụng.',
  },
  {
    id: '5',
    title: 'Thay đổi điều khoản',
    description: 'Điều khoản và chính sách có thể được cập nhật từ thời gian này đến thời gian khác.',
  },
  {
    id: '6',
    title: 'Liên hệ',
    description: 'Liên hệ với chúng tôi qua email: sochidev@gmail.com để giải đáp thắc mắc.',
  },
];

const TermsAndPoliciesScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: id }) => (
    <View style={styles.policyItem} >
        <Text style={styles.policyTitle}>{item.title}</Text>
        <Text style={styles.policyDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={termsAndPolicies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.policyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  policyList: {
    paddingBottom: 20,
  },
  policyItem: {
    padding: 15,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  policyDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default TermsAndPoliciesScreen;
