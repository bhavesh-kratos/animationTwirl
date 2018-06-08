import React from 'react';
import { Animated, Text, View, Easing } from 'react-native';

export default class FadeInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinAnim: new Animated.Value(0),  // Initial value for opacity: 0
        }
        this.anime = React.createRef();
    }

    componentWillUpdate(props, state) {
        if (props.twirl && props.canStart) {
            this.resetAnimation();
            Animated.timing(                        // Animate over time
                state.spinAnim,                     // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 4000,
                    easing: Easing.out(Easing.quad)
                }).start(({ finished }) => {
                    props.noTwirling()
                });                        // Starts the animation
        }
    }

    resetAnimation = () => {
        this.state.spinAnim.stopAnimation();
        this.state.spinAnim.setValue(0);
    }

    render() {
        let { startAngle, endAngle } = this.props;
        let spin = this.state.spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [startAngle, endAngle]
        });
        return (
            <Animated.Image                 // Special animatable View
                style={{
                    ...this.props.style,
                    transform: [{ rotate: spin }],
                    flex: 1,
                    width: 70,
                    height: 70,
                    resizeMode: 'contain'
                }}
                ref={this.anime}
                source={require('../assets/bottle.png')}
            />
        );
    }
}

