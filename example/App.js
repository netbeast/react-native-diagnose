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

class Diagnose extends Component<{}> {
  static defaultProps = {
    suiteTitle: 'Test Suite'
  }

  constructor (props) {
    super()
    this.state = { status: 'unknown' }
    
    let k = 0
    this.testRefs = []
    this.children = React.Children.map(props.children, child =>
      React.cloneElement(child, {
        idx: k++,
        ref: node => {this.testRefs = [...this.testRefs, node]}
      })
    )
  }

  state: {
    status: 'unknown' | 'running' | 'success' | 'fail',
  }

  test () {
    console.log('Starting test suite')
    this.testRefs.forEach(child => {
      console.log(child)
      child.test()
    })
  }

  render() {
    const {width} = Dimensions.get('window')
    return (
      <View>
        <View flexDirection="row">
          <TouchableOpacity
            style={{flex: 4, padding: 10}}
            onPress={this.test.bind(this)}>
            <Text style={styles.suiteTitle}>
              {this.props.suiteTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, padding: 15}} onPress={this.test.bind(this)}>
            <Text style={styles.link}>
              Run tests
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 1, backgroundColor: "#cccccc", width}} />
        <ScrollView>
          {this.children}
        </ScrollView>
      </View>
    )
  }
}

class Test extends Component<{}> {
  static defaultProps = {
    run: async () => {},
    should: '',
  }

  constructor () {
    super()
    this.state = { status: 'fail' }
  }

  state: {
    status: 'unknown' | 'running' | 'success' | 'fail',
  }

  async test () {
    console.log(this.props.should)
    this.setState({status: 'running'})
    try {
      await this.props.run()
      this.setState({status: 'success'})
    } catch (error) {
      this.setState({status: 'fail', error})
    }
  }

  renderStatus() {
    switch(this.state.status) {
      case 'unknown':
        return null
      case 'running':
        return <ActivityIndicator size="small" animating={true} />
      case 'success':
        return <Text> ✔️ </Text>
      case 'fail':
        return <Text> ❌ </Text>
    }
  }

  renderRetry () {
    if (this.state.status === 'success' || this.state.status === 'fail') {
      return (
        <TouchableOpacity style={{flex: 1, paddingVertical: 10}} onPress={this.props.run}>
          <Text style={styles.link}>
            Retry
          </Text>
        </TouchableOpacity>
      )
    }
  }

  renderStackTraceLink () {
    if (this.state.status !== 'fail') {
      return null
    }

    return (
      <TouchableOpacity style={{flex: 1, paddingVertical: 10}} onPress={this.test.bind(this)}>
        <Text style={styles.link}>
          Stack
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const {width} = Dimensions.get('window')

    return (
      <View>
        <View style={styles.testRow}>
          <View padding={10} flexDirection="row" flex={4}>
            {this.renderStatus()}
            <Text style={styles.testDescription}>
              &nbsp;&nbsp;{this.props.should}
            </Text>
          </View>
          {this.renderRetry()}
          {this.renderStackTraceLink()}
        </View>
        <View style={{height: 1, backgroundColor: "#cccccc", width}} />
      </View>
    )
  }
}

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
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
