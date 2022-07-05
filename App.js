import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FilePickerManager from 'react-native-file-picker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  pick,
  types,
} from 'react-native-document-picker';
import {
  request,
  PERMISSIONS,
  check,
  checkMultiple,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

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
      BridgeModule.playAudio(singleFile);
    }
  };

  const _onStop = () => {
    if (singleFile !== '') {
      BridgeModule.stopAudio();
    }
    // onChangePosition();
  };

  const _onChangeSoundFile = async () => {
    // console.log('pick')
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'documentDirectory',
        type: [types.audio],
      });
      console.log('pickerResult', pickerResult.uri);

      // console.log('uriios', uriIos);
      // setSingleFile(pickerResult.fileCopyUri);
      const uri =
        Platform.OS === 'ios'
          ? pickerResult.uri.replace('file://', '')
          : pickerResult.uri;
      // setSingleFile(uri);
      // console.log('uriios', uri);
      // RNFetchBlob.fs.stat(uri).then(res => {
      //   console.log('fetchblob', res.path);
      //   setSingleFile(res.path);
      //   BridgeModule.setFilePath(res.path);
      // });
      if (Platform.OS === 'android') {
        RNFetchBlob.fs.stat(uri).then(res => {
          console.log('fetchblob', res.path);
          setSingleFile(res.path);
          BridgeModule.setFilePath(res.path);
        });
      }

      if (Platform.OS === 'ios') {
        const uriIos = pickerResult.uri.replace('file://', '');
        // console.log('uriios', uriIos)
        RNFetchBlob.fs
          .stat(uriIos)
          .then(res => {
            console.log('res ios', res);
            setSingleFile(res.path);
            BridgeModule.setFilePath(res.path);
          })
          .catch(err => {
            console.log('err', err);
          });
      }
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
    backgroundColor: 'white',
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
    color: 'black',
  },

  row: {
    flexDirection: 'row',
  },

  btn: {
    borderRadius: 5,
  },
});
