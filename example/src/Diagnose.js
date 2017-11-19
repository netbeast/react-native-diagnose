
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

export class Diagnose extends Component<{}> {
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
