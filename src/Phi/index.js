import React, { useState } from 'react';
import {
  isBinary,
  isDecimal,
  decimal2Binary,
  binary2Decimal,
  binaryToChar,
  charToBinary,
  calculateTotatives,
  calculateInteger,
} from '../utils/fns';
import { chunk } from 'lodash/array';
import { Button } from 'react-bootstrap';

function Phi() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [ascii, setAscii] = useState('are you still there if i wake up in the middle of the night');

  const [intergerN, setIntergerN] = useState('');
  const [numberOfTotatives, setNumberOfTotatives] = useState('');

  const handleConvert = () => {
    let b;
    if (decimal) {
      b = decimal2Binary(decimal);
      b = '0'.repeat(8 - (b.length % 8)) + b;
      setBinary(b);
      const binaryChunk = chunk(b.split(''), 8).map((item) => item.join(''));
      setAscii(binaryToChar(binaryChunk));
      return;
    }

    if (binary) {
      b = binary;
      b = '0'.repeat(8 - (b.length % 8)) + b;
      setDecimal(binary2Decimal(binary));
      const binaryChunk = chunk(b.split(''), 8).map((item) => item.join(''));
      setAscii(binaryToChar(binaryChunk));
      return;
    }

    if (ascii) {
      b = charToBinary(ascii).split(' ').join('');
      setBinary(b);
      setDecimal(binary2Decimal(b));
    }
  };

  const handleClear = () => {
    setBinary('');
    setDecimal('');
    setAscii('');
  };

  const handleInvertEuler = () => {
    if (intergerN) {
      setNumberOfTotatives(calculateTotatives(intergerN));
    } else if (numberOfTotatives) {
      setIntergerN(calculateInteger(numberOfTotatives));
    }
  };

  return (
    <section className="container">
      <div className="pt-5 pb-5">
        <div className="row">
          <div className="col-sm-8 group">
            <label>Decimal:</label>
            <textarea
              className="form-control"
              placeholder="Decimal"
              value={decimal}
              onChange={(e) => isDecimal(e.target.value) && setDecimal(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-8">
            <label>Binary:</label>
            <textarea
              className="form-control"
              placeholder="Binary"
              value={binary}
              onChange={(e) => isBinary(e.target.value) && setBinary(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Button variant="outline-secondary" onClick={() => handleClear()}>
              Clear
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 group">
            <label>Characters:</label>
            <textarea
              className="form-control"
              placeholder="Say what you wanna say here"
              value={ascii}
              onChange={(e) => setAscii(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Button variant="outline-secondary" onClick={() => handleConvert()}>
              Convert
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="row mt-5">
          <div className="col-sm-8 group">
            <label>Given Integer N:</label>
            <input
              className="form-control"
              placeholder="Given Integer N"
              value={intergerN}
              onChange={(e) => isDecimal(e.target.value) && setIntergerN(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-sm-8">
            <label>Number of totatives to N:</label>
            <input
              className="form-control"
              placeholder="Number of totatives to N"
              value={numberOfTotatives}
              onChange={(e) => isDecimal(e.target.value) && setNumberOfTotatives(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <Button variant="outline-secondary" onClick={() => handleInvertEuler()}>
              Convert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Phi;
