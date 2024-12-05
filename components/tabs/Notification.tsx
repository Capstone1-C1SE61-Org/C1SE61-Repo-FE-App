import React, { useState, useEffect } from 'react';
import { FlatList, View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ImageSourcePropType } from 'react-native';


interface Message {
    id: string;
    message: string;
    time: string;
    avatar: ImageSourcePropType | undefined;
    name: string;
  }

const Notification = () => {
    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        message: 'This is the first notification message.',
        time: '10:00 AM',
        avatar: require('../../assets/img/P.png'),
        name: 'John Doe',
      },
      {
        id: '2',
        message: 'This is another notification message.',
        time: '11:15 AM',
        avatar: require('../../assets/img/P.png'),
        name: 'Jane Smith',
      },
      // ... Add more messages as needed
    ]);

const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageItem}>
      {item.avatar && (
      <Image source={item.avatar} style={styles.avatar} />
    )}
      <View style={styles.messageInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
  list: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    marginTop: 12,
    borderRadius: 20,
    marginRight: 16,
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  message: {
    fontSize: 14,
  },
});

export default Notification;




// phần để sau làm kết nối api

// const Notification = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Fetch data from API or other source
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://your-api-endpoint');
//         const data = await response.json();
//         setMessages(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderItem = ({ item } : {item: Message}) => (
//     <View style={styles.messageItem}>
//       {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
//       <View style={styles.messageInfo}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.time}>{item.time}</Text>
//         <Text style={styles.message}>{item.message}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={messages}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           style={styles.list}
//         />
//       )}
//     </View>
//   );
// };