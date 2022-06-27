import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
} from 'react-native';
import React, {useState} from 'react';
import FilePickerManager from 'react-native-file-picker';

const {BridgeModule} = NativeModules;

const Spacer = props => {
  const {width, height} = props;
  return <View style={{width, height}} />;
};

const App = () => {
  const [singleFile, setSingleFile] = useState('');

  const _onPlay = () => {
    BridgeModule.playAudio();
  };

  const _onStop = () => {
    BridgeModule.stopAudio();
  };

  const _onChangeSoundFile = async () => {
    try {
      FilePickerManager.showFilePicker(null, response => {
        if (response.didCancel) {
          console.log('User cancelled file picker');
        } else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        } else {
          const path = response.path;
          console.log({response});
          setSingleFile(path);
          BridgeModule.setFilePath(path);
        }
      });
    } catch (err) {
      console.log('Unknown Error: ' + JSON.stringify(err));
    }
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
            value={singleFile}
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
  },

  row: {
    flexDirection: 'row',
  },

  btn: {
    borderRadius: 5,
  },
});
