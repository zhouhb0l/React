import React from 'react';
/*COMPONENTS */
import Grid from './components/Grid';
import { InputGroup, FormControl, Button, Badge } from 'react-bootstrap';

export default class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      count: 0,
    };
  }

  render() {
    const { isRunning, count } = this.state;

    return (
      <section className="container">
        <div className="row mt-5">
          <div className="col-sm-6">
            <Grid
              isRunning={isRunning}
              speed={0.5}
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
            <InputGroup>
              <FormControl placeholder="Rules" />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    this.setState({ isRunning: !isRunning });
                  }}
                >
                  {isRunning ? 'Stop' : 'Start'}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </section>
    );
  }
}
