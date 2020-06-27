import React, { useState } from 'react';
import {
  isBinary,
  isDecimal,
  decimal2Binary,
  binary2Decimal,
  calculateTotatives,
  calculateInteger,
} from '../utils/fns';
import { Button } from 'react-bootstrap';

function Phi() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');

  const [intergerN, setIntergerN] = useState('');
  const [numberOfTotatives, setNumberOfTotatives] = useState('');

  const handleConvertD2B = () => {
    if (decimal) {
      setBinary(decimal2Binary(decimal));
    } else if (binary) {
      setDecimal(binary2Decimal(binary));
    }
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
            <input
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
            <Button variant="outline-secondary" onClick={() => handleConvertD2B()}>
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
