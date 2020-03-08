import React from 'react';



class Game extends React.Component {
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
             {/*<Practice1 />*/}   
                <div className="game-info">
                   <div>{/* status */}</div>
                   <ol>{/*to do */}</ol>

                </div>
            </div>
        );
    }
}

function Square(props) {
    
        return(
            <button 
            className="square" 
            onClick={props.onClick}
            >  
                {props.value}
            </button>
        )
    
}
// this.props.value give the value obtained from parent component Board
// this.state.value shows the value of the state
//setState method to change the state 
//this.props.onClick tells that the onClick event is handled by Board
//onClick={()=>this.props.onClick()}. This first onClick is a attribute of button, it is built-in component
//The second one is just name of props can be customized.
//function component is a simpler way of component that only contain a render method but don't have their own state

class Board extends React.Component{
    constructor(props){
       super(props);
       this.state={squares:Array(9).fill(null),
    };
    }
    //always use super when defining constructor of a subclass. 
    //All React component classes that have a constrctor should start it with a super(props) call
    renderSquare(i){
        return (
        <Square 
        value={this.state.squares[i]} //Pass the value to the child react component
        onClick={()=>this.handleClick(i)}/>
        ); //pass another prop called onClick to Square. 
        //this prop is a function that Square can call when clicked
    }

     handleClick(i){
         const squares =this.state.squares.slice();
         squares[i]='X';
         this.setState({squares: squares});
     }
//.clice is to create a copy of the squares

    render(){
        const status="Next player: X"

        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                </div>
        );
    }
}

export default Game