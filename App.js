import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Spacer = props => {
  const {width, height} = props;

  return <View style={{width, height}} />;
};

const App = () => {
  const _onPlay = () => {
    Alert.alert('Play Button Pressed');
  };

  const _onStop = () => {
    Alert.alert('Stop Button Pressed');
  };

  const _onChangeSoundFile = () => {
    Alert.alert('Change Audio File Button Pressed');
  };

  return (
    <View
      style={[
        styles.container,
        styles.horizontalPaddingDefaults,
        styles.verticalPaddingDefaults,
      ]}>
      <Spacer height={50} />
      <Text style={styles.textCenter}>Resonance Audio Dummy App</Text>
      <Spacer height={50} />
      <View style={styles.row}>
        <View style={styles.displayFlex}>
          <TextInput
            style={styles.txtInput}
            placeholder="/file/bird-audio.wav"
            placeholderTextColor="grey"
          />
        </View>
        <Spacer width={10} />
        <Button title="Change" onPress={_onChangeSoundFile} />
      </View>
      <Spacer height={50} />
      <Button title="Play" onPress={_onPlay} />
      <Spacer height={50} />
      <Button title="Stop" onPress={_onStop} />
      <Spacer height={50} />
      <View>
        <Text style={styles.textCenter}>Change Position</Text>
        <Spacer height={30} />
        <View style={styles.row}>
          <View style={styles.displayFlex}>
            <TextInput
              style={styles.txtInput}
              placeholder="X"
              placeholderTextColor="grey"
              keyboardType="numeric"
            />
            <Text style={styles.textCenter}>X</Text>
          </View>
          <Spacer width={50} />
          <View style={styles.displayFlex}>
            <TextInput
              style={styles.txtInput}
              placeholder="Y"
              placeholderTextColor="grey"
              keyboardType="numeric"
            />
            <Text style={styles.textCenter}>Y</Text>
          </View>
          <Spacer width={50} />
          <View style={styles.displayFlex}>
            <TextInput
              style={styles.txtInput}
              placeholder="Z"
              placeholderTextColor="grey"
              keyboardType="numeric"
            />
            <Text style={styles.textCenter}>Z</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalPaddingDefaults: {
    paddingHorizontal: 16,
  },
  verticalPaddingDefaults: {
    padingVertical: 16,
  },
  textCenter: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  displayFlex: {
    flex: 1,
  },
  txtInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center',
    // flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    borderRadius: 5,
  },
});
