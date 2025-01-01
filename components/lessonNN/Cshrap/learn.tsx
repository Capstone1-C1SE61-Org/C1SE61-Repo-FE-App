import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const LearnCs = () =>{
    const [text, setText] = useState('learn C#');
    const hidden = () => {
        setText('học ngôn ngữ tiếng Anh');
    }

  return (
    <View>
        <TouchableOpacity onPress={hidden}>
            <Text>{text}</Text>
        </TouchableOpacity>
    </View>

  );
};

export default LearnCs;