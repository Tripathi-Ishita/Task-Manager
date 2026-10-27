// Web entry point (the phone app starts from index.js instead).
import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('TaskManager', () => App);
AppRegistry.runApplication('TaskManager', {
    rootTag: document.getElementById('root'),
});
