/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Diagnose, Test } from './src'

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
      <View padding={20} />
        <Diagnose suiteTitle="Diagnose">
          <Test should="Passing test" />
          <Test should="Unfinished test" run={() => {
            return new Promise(() => setTimeout(() => {}, 1000000))
          }} />
          <Test should="Failed test" run={() => {throw new Error('Failing test')}} />
          <Test should="Dummy test" />
        </Diagnose>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  testRow: {
    flex: 1,
    flexDirection: 'row',
  },
  testDescription: {
    fontSize: 14,
  },
  suiteTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
    flex: 1,
  }
})
