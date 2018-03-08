import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';

const {width, height} = Dimensions.get('window');

class RNHighScores extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          fdsafdsa:w={width},h={height}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: height-40,
    marginTop: 20,
    backgroundColor: '#f00',
  }
});

// 整体js模块的名称
AppRegistry.registerComponent('RNApp', () => RNHighScores);
