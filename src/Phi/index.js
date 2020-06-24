import React, { useState } from 'react';
import { isBinary, isDecimal, decimal2Binary, binary2Decimal } from '../utils/fns';
import { Button } from 'react-bootstrap';

function Phi() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');

  const handleConvert = () => {
    if (decimal) {
      setBinary(decimal2Binary(decimal));
    } else if (binary) {
      setDecimal(binary2Decimal(binary));
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
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
          <Button variant="outline-secondary" onClick={() => handleConvert()}>
            Convert
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Phi;
