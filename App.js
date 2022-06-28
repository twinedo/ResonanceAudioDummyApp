import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilePickerManager from 'react-native-file-picker';

const {BridgeModule} = NativeModules;

const Spacer = props => {
  const {width, height} = props;
  return <View style={{width, height}} />;
};

const App = () => {
  const [singleFile, setSingleFile] = useState('');

  const [position, setPosition] = useState({
    x: '0',
    y: '0',
    z: '0',
  });

  const _onPlay = () => {
    if (singleFile !== '') {
      BridgeModule.playAudio();
    }
  };

  const _onStop = () => {
    BridgeModule.stopAudio();
    // onChangePosition();
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

  // useEffect(() => {
  //   BridgeModule.changePosition(
  //     parseFloat(position.x),
  //     parseFloat(position.y),
  //     parseFloat(position.z),
  //   );
  // }, [position.x, position.y, position.z]);

  const onChangePosition = (params, value) => {
    console.log('val', value);
    if (
      value.length === 0 ||
      value === '' ||
      value === null ||
      value === undefined
    ) {
      if (params === 'x') {
        setPosition({...position, x: '0'});
        console.log('zero x');
        console.log('zero x', parseFloat(position.y));
        console.log('zero x', parseFloat(position.z));
        // BridgeModule.changePosition(
        //   0,
        //   parseFloat(position.y),
        //   parseFloat(position.z),
        // );
      }
      if (params === 'y') {
        setPosition({...position, y: '0'});
        console.log('zero y');
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   0,
        //   parseFloat(position.z),
        // );
      }
      if (params === 'z') {
        setPosition({...position, z: '0'});
        console.log('zero z');
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(position.y),
        //   0,
        // );
      }
    } else if (value[0] === '0') {
      if (params === 'x') {
        setPosition({...position, x: value[1]});
        console.log('ini 0 + x');
        console.log('parsedawdawd', parseInt(value[1]));
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(position.y),
        //   parseFloat(position.z),
        // );
      }
      if (params === 'y') {
        setPosition({...position, y: value[1]});
        console.log('ini 0 + y');
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(value[1]),
        //   parseFloat(position.z),
        // );
      }
      if (params === 'z') {
        setPosition({...position, z: value[1]});
        console.log('ini 0 + z');
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(position.y),
        //   parseFloat(value[1]),
        // );
      }
    } else {
      if (params === 'x') {
        setPosition({...position, x: value});

        // BridgeModule.changePosition(
        //   parseFloat(value),
        //   parseFloat(position.y),
        //   parseFloat(position.z),
        // );
      }
      if (params === 'y') {
        setPosition({...position, y: value});
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(value),
        //   parseFloat(position.z),
        // );
      }
      if (params === 'z') {
        setPosition({...position, z: value});
        // BridgeModule.changePosition(
        //   parseFloat(position.x),
        //   parseFloat(position.y),
        //   parseFloat(value),
        // );
      }
    }
  };

  console.log('selectedtFile', singleFile);

  const _onPressChangePos = () => {
    console.log('press', position);
    BridgeModule.changePosition(
      parseFloat(position.x),
      parseFloat(position.y),
      parseFloat(position.z),
    );
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
        <Text style={styles.textCenter} onPress={_onPressChangePos}>
          Change Position {'\n'} (change value x, y, z and click here)
        </Text>
        <Spacer height={30} />
        <View style={styles.row}>
          <View style={styles.displayFlex}>
            <TextInput
              style={styles.txtInput}
              placeholder="X"
              placeholderTextColor="grey"
              keyboardType="numeric"
              value={position.x.toString()}
              onChangeText={x => onChangePosition('x', x)}
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
              value={position.y.toString()}
              onChangeText={y => onChangePosition('y', y)}
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
              value={position.z.toString()}
              onChangeText={z => onChangePosition('z', z)}
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
