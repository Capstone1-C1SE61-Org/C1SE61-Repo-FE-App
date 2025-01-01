import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { API_URL, useAuth } from '../../API/AuthContextAPI';

interface Course {
  courseId: number;
  courseName: string;
  coursePrice: number;
  image: string;
  status: boolean;
  createDate: string;
  updateDate: string;
  instructorId: number;
}

function HomeTabs() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { authState } = useAuth();
  const token = authState?.token;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/course`);
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'An error occurred');
          return;
        }
        const data = await response.json();
        console.log(courses);
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setErrorMessage('Failed to fetch courses. Please try again later.');
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = async () => {
    try {
      // Gọi API với từ khóa tìm kiếm
      const response = await fetch(`${API_URL}/search`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Kiểm tra xem API trả về thành công không
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      // Lấy dữ liệu JSON từ phản hồi
      const data = await response.json();
  
      // Cập nhật danh sách khóa học sau khi tìm kiếm
      setFilteredCourses(data.results || []); // `results` tùy thuộc vào cấu trúc trả về của API
    } catch (error) {
      console.error('Error searching courses:', error);
      // Xử lý lỗi, ví dụ: hiển thị thông báo cho người dùng
    }
  };


  const handleAddToCart = async (courseId: number) => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Gửi dữ liệu qua query parameters
      const url = `${API_URL}/cart/add/${courseId}`;
  
      const response = await fetch(url, {
        method: 'GET', // Sử dụng GET để thêm sản phẩm vào giỏ hàng
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching cart info:', response.statusText);
        return;
      }
      navigation.navigate('Cart');
      // Xử lý phản hồi nếu không phải JSON
      const result = await response.text(); // Lấy nội dung dưới dạng text
      console.log('Cart updated successfully:', result);
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  

  const renderCourse = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{item.courseName}</Text>
      <Text style={styles.coursePrice}>
        {item.coursePrice === 0 ? 'Free' : `${item.coursePrice.toLocaleString()} VND`}
      </Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.courseButton}
        onPress={() => {
          if (item.coursePrice > 0) {
            Alert.alert(
              'Thông báo',
              'Bạn cần mua khóa học trước khi xem chi tiết.'
            );
          } else {
            const lowerCaseName = item.courseName.toLowerCase();

            if (lowerCaseName.includes('c#')) {
              navigation.navigate('CSharpDetails', { courseId: item.courseId });
            } else if (lowerCaseName.includes('c++')) {
              navigation.navigate('CppDetails', { courseId: item.courseId });
            } else if (lowerCaseName.includes('javascript')) {
              navigation.navigate('JsDetails', { courseId: item.courseId });
            } else if (lowerCaseName.includes('java')) {
              navigation.navigate('JavaDetails', { courseId: item.courseId });
            } else if (lowerCaseName.includes('python')) {
              navigation.navigate('PythonDetails', { courseId: item.courseId });
            } else if (
              lowerCaseName.includes('html') &&
              lowerCaseName.includes('css')
            ) {
              navigation.navigate('HtmlCssDetails', { courseId: item.courseId });
            } else if (lowerCaseName.includes('php')) {
              navigation.navigate('PhpDetails', { courseId: item.courseId });
            } else {
              Alert.alert(
                'Error',
                `No details page available for this course: ${item.courseName}`
              );
            }
          }
        }}
      >
        <Text style={styles.courseButtonText}>Learn More</Text>
      </TouchableOpacity>
      {item.coursePrice > 0 && (
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => handleAddToCart(item.courseId)}
        >
          <Ionicons name="cart" size={24} color="white" />
        </TouchableOpacity>
      )}

      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('navlist')}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>9+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      <FlatList
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.courseId.toString()}
        contentContainerStyle={styles.courseList}
      />

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('LearningRoadmap')}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={28}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Account')}
        >
          <Ionicons name="person" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  menuButton: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
  },
  searchButton: {
    paddingLeft: 10,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  courseList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  courseCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  courseButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 5,
  },
  cartIcon: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  navButton: {
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartCount: {
    color: '#fff',
    fontSize: 10,
  },
});

export default HomeTabs;
