import React from 'react';
import { cloneDeep, sum } from 'lodash';
import './Grid.css';

const N = 11;

const direction = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
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

  startGame() {
    const { gridArray, generationCount, stopped } = this.state;
    const { speed, rules, updateCount } = this.props;

    if (!this.checkIfRulesValid(rules)) return;

    const { dieRule, aliveRule } = this.getRules(rules);

    if (this.checkIfEmpty(gridArray)) {
      return;
    }

    if (stopped) {
      return;
    }

    let gridCopy = cloneDeep(gridArray);
    for (let i = 0, m = gridArray.length; i < m; i++) {
      for (let j = 0, l = gridArray[i].length; j < l; j++) {
        const sum = direction.reduce((acc, [dx, dy]) => {
          let newX = i + dx < 0 ? m - 1 : i + dx === m ? 0 : i + dx;
          let newY = j + dy < 0 ? l - 1 : j + dy === l ? 0 : j + dy;
          return acc + gridArray[newX][newY];
        }, 0);
        gridCopy[i][j] =
          gridArray[i][j] === 0
            ? Number(sum === dieRule)
            : Number(sum >= aliveRule[0] && sum <= aliveRule[1]);
      }
    }

    this.setState({ gridArray: gridCopy, generationCount: generationCount + 1 });
    updateCount(generationCount + 1);

    setTimeout(() => {
      this.startGame();
    }, speed * 1000);
  }

  getRules(rules) {
    const _rules = rules.split(';');

    const dieRule = _rules[1].indexOf('1');
    const aliveRule = [_rules[0].indexOf('1'), _rules[0].lastIndexOf('1')];

    return { dieRule, aliveRule };
  }

  /**
   * Check if rules is in valid format
   */
  checkIfRulesValid(rules) {
    const _rules = rules.split(';');
    if (
      _rules.length !== 2 ||
      _rules[0].length !== _rules[1].length ||
      _rules[0].length !== 5 ||
      _rules[1].length !== 5 ||
      _rules[1].replace(/0/g, '').length !== 1 ||
      _rules[0].replace(/0/g, '').length !== 2
    )
      return false;

    return true;
  }

  /**
   * Check if gridArray is empty
   */
  checkIfEmpty(gridArray) {
    return gridArray.reduce((acc, current) => {
      return acc + sum(current);
    }, 0) === 0
      ? true
      : false;
  }

  /**
   * set stopped status true and reset it later
   */
  stopGame() {
    this.setState({ stopped: true });
    setTimeout(() => {
      this.setState({ stopped: false });
    }, 500);
  }

  /**
   * reset gridArray and count
   */
  clearGame() {
    this.setState({
      gridArray: Array(N)
        .fill(0)
        .map(() => Array(N).fill(0)),
      generationCount: 0,
    });
    this.props.updateCount(0);
  }

  /**
   * reverse grid value
   */
  handleClickGrid(rowIndex, colIndex) {
    if (this.props.isRunning) return;

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
