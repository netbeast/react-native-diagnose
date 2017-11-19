# react-native-dial
![npm version](https://badge.fury.io/js/react-native-dial.svg)

A react runtime diagnose component

## Rationale
* Testing native applications is complicated
* There are features that can only be tested on a device, unless mocked
* You may want to test your app on a production build, before submit it to the stores

```javascript
import { Diagnose, Test } from 'react-diagnose'

/**
 * Diagnose will run all test components inside
 * Test components are going to be marked visually as completed or not
 * to d
 */
return (
  <Diagnose suiteTitle="Api tests">
    <Test run={async () => {
      api.fetchData() // will throw, you can see the stack trace onLongPress
    }}>
    <Test run={async () => {
      console.log('Dummy test') // will pass
    }}>
  </Diagnose>
)
```

<img alt="demo screenshot" src="screenshot.png" width="350" />


Some properties:
```
<Dial
 fixed // disallows angle updates
 elastic // allows scaling the element
 initialAngle={Number}
 initialRadius={Number}
 radiusMax={Number}
 radiusMin={Number}
 responderStyle={ReactNative.Styles}
 wrapperStyle={ReactNative.Styles}
 >
 {/* 
   Optionally you can pass children so it renders a different component of your choice as a Dial,
   that can change in scale and angle
 */}
   <YourCustomDial />
 </Dial>
 
```

More documentation is incoming, in the meanwhile please read the source code. It is a single file!
PRs and issues are more than welcome.

<a href="https://getyeti.co" target="_blank">
   <img alt="works with yeti" src="works-with-yeti.png" width="100" />
</a>

> This package powers [Yeti Smart Home](https://getyeti.co) and is used in production.

Follow us in Github or https://twitter.com/netbeast_co.