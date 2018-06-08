import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  PanResponder,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import BottleAnim from './src/components/RotationAnimation';
import bottlesound from './src/components/soundBottle';
import Button from './src/components/Button';
import FadeInView from './src/components/ButtonAnimation';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this._panResponder = {}
    this.state = {
      twirl: false,
      canStart: true,
      endAngle: 0,
      startAngle: 0
    }
    this.noTwirling = this.noTwirling.bind(this);
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => this.state.canStart,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => this.state.canStart,
      onMoveShouldSetPanResponder: (evt, gestureState) => this.state.canStart,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.state.canStart,

      onPanResponderGrant: (evt, gestureState) => {

        // The gesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (this.state.canStart && !this.state.twirl) {
          this.bottleTwirled(gestureState.vx, gestureState.vy);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return false;
      },
    });
  }

  bottleTwirled(xVel, yVel) {
    let velocity = Math.sqrt(Math.pow(xVel, 2) + Math.pow(yVel, 2))
    let endAngle = this.state.startAngle + 360 * velocity * 2;
    this.setState({
      endAngle: endAngle,
      twirl: true
    })
  }

  noTwirling() {
    this.setState({
      twirl: false,
      canStart: false,
      startAngle: this.state.endAngle
    });
  }

  render() {
    let { twirl, canStart, startAngle, endAngle } = this.state;
    return (
      <View style={styles.container} {...this._panResponder.panHandlers} >
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
          resizeMode='cover'
          source={require('./src/assets/table.png')}
        >
          {!canStart && <Button extStyle={styles.buttonDrink} text={'Drink'} onPress={() => bottlesound.play((success) => {
            if (!success){
              console.warn('playback failed due to audio decoding errors');
              // reset the player to its uninitialized state (android only)
              // this is the only option to recover after an error occured and use the player again
              bottlesound.reset();
            }
          })} />}
          {!canStart && <View style={styles.reloadView} ><Text style={styles.reloadIcon} onPress={() => this.setState({ canStart: true }) }>&#x21bb;</Text></View>}
          <BottleAnim canStart={canStart} twirl={twirl} endAngle={`${endAngle}deg`} startAngle={`${startAngle}deg`} noTwirling={this.noTwirling} />
          {!canStart && <Button extStyle={styles.buttonDare} text={'Dare'} onPress={() => console.warn('Dare chiye bc!')} />}
        </ImageBackground>
      </View>
    );
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
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonDrink: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width / 2,
    height: 55,
  },
  buttonDare: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: Dimensions.get('window').width / 2,
    height: 55,
  },
  reloadIcon: {
    fontSize: 90,
    color: 'white',
    alignSelf: 'center',
    zIndex: 1000
  },
  reloadView: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }

});
