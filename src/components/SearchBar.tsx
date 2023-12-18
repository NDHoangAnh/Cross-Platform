import React from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchBar({navigation}: any): React.JSX.Element {
  const [text, setText] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons
          style={styles.buttonBack}
          name="arrow-back-ios-new"
          size={30}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập để tìm kiếm"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onSubmitEditing={() => console.log('123')}
      />
      {text !== '' && isFocus ? (
        <TouchableOpacity onPress={() => setText('')}>
          <MaterialCommunityIcons
            style={styles.buttonClear}
            name="close-circle-outline"
            size={30}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 4,
    marginTop: 12,
  },
  textInput: {
    height: '100%',
    flex: 1,
    marginStart: 4,
    marginEnd: 4,
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
  buttonClear: {
    marginEnd: 12,
    color: 'black',
  },
  buttonBack: {
    color: 'black',
  },
});
