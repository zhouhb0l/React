import JSBI from 'jsbi';
import BigNumber from "bignumber.js"

export function decimal2Binary(str) {
  const arr = [];
  let remainder, i, str2, num, char;
  while (str.length > 0) {
    str2 = '';
    remainder = 0;
    for (i = 0; i < str.length; i++) {
      num = str.charCodeAt(i) - 0x30; // num to String
      num = remainder * 10 + num;
      char = Math.floor(num / 2).toString();
      if (!(char === '0' && str2 === '')) {
        str2 += char;
      }
      remainder = num % 2;
    }

    str = str2;
    arr.push(remainder); // keep remainder
  }

  return arr.reverse().join('');
}

export function binary2Decimal(str) {
  return JSBI.BigInt('0b' + str).toString();
}

export function isBinary(str) {
  return new RegExp(/^[10]*$/).test(str);
}

export function isDecimal(str) {
  return new RegExp(/^[0-9]*$/).test(str);
}

//tips for you, use `BigNumber` handle big number calculation
//before you start, run `npm install`, new dependencies installed
//here is documents https://github.com/MikeMcl/bignumber.js/

/**
 * @param {string}  n
 * @return {string} Number of totatives to n
 */
export function calculateTotatives(n) {
  return '';
}

/**
 * @param {string}  totatives
 * @return {string} integer n
 */
export function calculateInteger(totatives) {
  return '';
}
