/**
 * @format
 */

if (typeof BigInt === 'undefined') {
  const bi = require('big-integer')

  // BugFix for BigInt('0xffffffffffffffff') by CBOR lib
  function myBigInt(value) {
    if (typeof value === 'string') {
      const match = value.match(/^0([xo])([0-9a-f]+)$/i)
      if (match) {
        return bi(match[2], match[1].toLowerCase() === 'x' ? 16 : 8)
      }
    }
    return bi(value)
  }

  global.BigInt = myBigInt;
} 

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
