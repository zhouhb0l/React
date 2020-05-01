import React from 'react';
import { cloneDeep } from 'lodash';
import './Grid.css';

const N = 11;

const direction = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridArray: Array(N)
        .fill(0)
        .map(() => Array(N).fill(0)),
      generationCount: 0,
      stopped: false,
    };
  }

  /**
   * watch running status
   */
  async componentDidUpdate(prevProps) {
    const { isRunning: prev_isRunning } = prevProps;
    const { isRunning: next_isRunning } = this.props;

    !prev_isRunning && next_isRunning && this.startGame();
    prev_isRunning && !next_isRunning && this.stopGame();
  }

  startGame() {
    const { gridArray, generationCount, stopped } = this.state;
    const { speed, updateCount } = this.props;

    if (stopped) {
      this.setState({ stopped: false });
      return;
    }

    //numOfAlive is used to check if all cells died
    let numOfAlive = 0;
    let gridCopy = cloneDeep(gridArray);
    for (let i = 0, m = gridArray.length; i < m; i++) {
      for (let j = 0, l = gridArray[i].length; j < l; j++) {
        numOfAlive += gridArray[i][j];

        const sum = direction.reduce((acc, [dx, dy]) => {
          let newX = i + dx < 0 ? m - 1 : i + dx === m ? 0 : i + dx;
          let newY = j + dy < 0 ? l - 1 : j + dy === l ? 0 : j + dy;

          return acc + gridArray[newX][newY];
        }, 0);

        gridCopy[i][j] = gridArray[i][j] === 0 ? Number(sum === 3) : Number(sum >= 2 && sum <= 3);
      }
    }
    if (numOfAlive === 0) {
      return;
    }

    console.log(gridCopy, 'gridCopy', generationCount);
    this.setState({ gridArray: gridCopy, generationCount: generationCount + 1 });
    updateCount(generationCount + 1);

    setTimeout(() => {
      this.startGame();
    }, speed * 1000);
  }

  stopGame() {
    this.setState({ stopped: true });
  }

  /**
   * reverse grid value
   */
  handleClickGrid(rowIndex, colIndex) {
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
                  <td key={colIndex} onClick={() => this.handleClickGrid(rowIndex, colIndex)}>
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
