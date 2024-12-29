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
import { API_URL } from '../../API/AuthContextAPI';

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

const HomeTabs = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // State for managing search input and fetched courses
  const [searchText, setSearchText] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch courses from the API
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
        setCourses(data);
        setFilteredCourses(data); // Initially show all courses
      } catch (error) {
        console.error('Error fetching courses:', error);
        setErrorMessage('Failed to fetch courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  // Function to filter courses based on the search input
  const handleSearch = () => {
    const filtered = courses.filter(course => 
      course.courseName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCourses(filtered);
  };


  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/add/${courses}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Course added to cart successfully!');
        // Chuyển hướng đến trang cart.tsx
        navigation.navigate('Cart');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to add course to cart.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
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
            console.log(`Course Name: ${item.courseName}`); // Debugging log
            switch (item.courseName.toLowerCase()) {
              case 'c#':
                navigation.navigate('CSharpDetails', { courseId: item.courseId });
                break;
              case 'c++':
                navigation.navigate('CppDetails', { courseId: item.courseId });
                break;
              case 'java':
                navigation.navigate('JavaDetails', { courseId: item.courseId });
                break;
              case 'python':
                navigation.navigate('PythonDetails', { courseId: item.courseId });
                break;
              case 'html-css':
                navigation.navigate('HtmlCssDetails', { courseId: item.courseId });
                break;
              case 'js':
                navigation.navigate('JsDetails', { courseId: item.courseId });
                break;
              case 'php':
                navigation.navigate('PhpDetails', { courseId: item.courseId });
                break;
              default:
                Alert.alert(
                  'Error',
                  `No details page available for this course: ${item.courseName}`
                );
            }
          }}
        >
          <Text style={styles.courseButtonText}>Learn More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('navlist')}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>

        {/* Search Bar with Icon */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText} // Update search text as the user types
          />
          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch} // Trigger the search when button is pressed
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

      {/* Error Message */}
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      {/* Filtered Course List */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.courseId.toString()}
        contentContainerStyle={styles.courseList}
      />

      {/* Bottom Navigation */}
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
  cartButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 5,
  },
  courseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButtonText: {
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
});

export default HomeTabs;
