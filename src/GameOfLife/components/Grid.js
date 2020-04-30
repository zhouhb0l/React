import React from 'react';
import './Grid.css';

const N = 11;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridArray: Array(N)
        .fill(0)
        .map(() => Array(N).fill(0)),
    };
  }

  /**
   * reverse grid value
   */
  updateGrid(rowIndex, colIndex) {
    const newGrid = this.state.gridArray;
    newGrid[rowIndex][colIndex] = Number(!this.state.gridArray[rowIndex][colIndex]);
    this.setState({ gridArray: newGrid });
  }

  render() {
    const { gridArray } = this.state;

    return (
      <div>
        <table id="grid">
          <tbody>
            {gridArray.map((rows, rowIndex) => (
              <tr key={rowIndex}>
                {rows.map((col, colIndex) => (
                  <td key={colIndex} onClick={() => this.updateGrid(rowIndex, colIndex)}>
                    <span className={`blocks rounded-sm ${col === 0 ? null : 'dark'}`}></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
