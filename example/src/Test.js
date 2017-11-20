/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

export class Test extends Component<{}> {
  static defaultProps = {
    run: async () => {},
    should: '',
  }

  constructor () {
    super()
    this.state = {status: 'unknown'}
    this.test = this.test.bind(this)
  }

  state: {
    status: 'unknown' | 'running' | 'success' | 'fail',
  }

  async test () {
    this.setState({status: 'running'})
    try {
      await this.props.run()
      this.setState({status: 'success'})
    } catch (error) {
      console.warn(error)
      this.setState({status: 'fail', error})
    }
  }

  renderStatus () {
    switch (this.state.status) {
      case 'unknown':
        return null
      case 'running':
        return <ActivityIndicator size="small" animating />
      case 'success':
        return <Text> ✅ </Text>
      case 'fail':
        return <Text> ❌ </Text>
    }
  }

  renderRetry () {
    if (this.state.status === 'running') return null

    return (
      <TouchableOpacity
        style={{flex: 1, paddingVertical: 10}}
        onPress={this.test}
      >
        <Text style={styles.link}>
          {this.state.status === 'success' || this.state.status === 'fail'
            ? 'Retry'
            : 'Run'}
        </Text>
      </TouchableOpacity>
    )
  }

  renderStackTraceLink () {
    if (this.state.status !== 'fail') {
      return null
    }

    return (
      <TouchableOpacity
        style={{flex: 1, paddingVertical: 10}}
        onPress={() => this.setState({showStack: !this.state.showStack})}
      >
        <Text style={styles.link}>Stack</Text>
      </TouchableOpacity>
    )
  }

  renderStacktrace () {
    if (!this.state.showStack || !this.state.error) return null
    const {width} = Dimensions.get('window')

    return (
      <View>
        <View style={{height: 1, backgroundColor: '#cccccc', width}} />
        <Text>
          {this.state.error.message} {this.state.error.stack}
        </Text>
      </View>
    )
  }

  render () {
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
        {this.renderStacktrace()}
        <View style={{height: 1, backgroundColor: '#cccccc', width}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  testRow: {
    flex: 1,
    flexDirection: 'row',
  },
  testDescription: {
    fontSize: 14,
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    flex: 1,
  },
})
