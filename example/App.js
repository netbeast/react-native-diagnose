/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import { Diagnose, Test } from './src'

export default class App extends Component<{}> {
  render () {
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
})
