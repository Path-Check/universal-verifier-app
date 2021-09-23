/**
 * @format
 */

if (typeof BigInt === 'undefined') global.BigInt = require('big-integer')
global.Buffer = global.Buffer || require('buffer').Buffer;

import process from 'process';
global.process = process;

import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
