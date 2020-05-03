import React from 'react';
/*COMPONENTS */
import Grid from './components/Grid';
import { Button, Badge } from 'react-bootstrap';

export default class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.grid = React.createRef();
    this.state = {
      isRunning: false,
      count: 0,
      rules: '01100;00010',
      speed: '0.5',
    };
  }

  handleClickStart() {
    const { isRunning } = this.state;

    if (!isRunning) {
      this.grid.current.startGame();
    } else {
      this.grid.current.stopGame();
    }
    this.setState({ isRunning: !isRunning });
  }

  render() {
    const { isRunning, count, speed, rules } = this.state;

    return (
      <section className="container">
        <div className="row mt-5">
          <div className="col-sm-6">
            <Grid
              ref={this.grid}
              speed={speed}
              rules={rules}
              isRunning={isRunning}
              updateCount={(count) =>
                this.setState({
                  count,
                })
              }
            />
          </div>
          <div className="col-sm-5 ">
            <h2 className="pb-5">
              Generation Times: <Badge variant="info">{count}</Badge>
            </h2>

            <div className="pb-3">
              <label>Rules (Born;Die)</label>
              <input
                className="form-control"
                placeholder="Rules"
                value={this.state.rules}
                disabled={isRunning}
                onChange={(e) =>
                  this.setState({
                    rules: e.target.value,
                  })
                }
              />
            </div>
            <div className="pb-3">
              <label>Speed: {`${speed * 1000} ms`}</label>
              <input
                className="form-control"
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                disabled={isRunning}
                value={speed}
                onChange={(e) =>
                  this.setState({
                    speed: e.target.value,
                  })
                }
              />
            </div>
            <Button variant="primary" onClick={() => this.handleClickStart()}>
              {isRunning ? 'Stop' : 'Start'}
            </Button>

            <Button
              className="ml-4"
              variant="success"
              disabled={isRunning}
              onClick={() => this.grid.current.clearGame()}
            >
              Clear
            </Button>
          </div>
        </div>
      </section>
    );
  }
}
