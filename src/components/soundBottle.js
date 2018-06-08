// Import the react-native-sound module
var Sound = require('react-native-sound');
import myMP3File from '../assets/bottlesound.mp3';
//bottlesound
// Enable playback in silence mode
//Sound.setCategory('Playback');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
export default whoosh = new Sound(myMP3File, null, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});

// Play the sound with an onEnd callback
whoosh.play((success) => {
    if (success) {
        console.log('successfully finished playing');
    } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        whoosh.reset();
    }
});