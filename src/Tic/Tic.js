import React from 'react'

function Square(props) {
    
    return(
        <button 
        className="square" 
        onClick={props.onClick}>  
            {props.value}
        </button>
    );

}
// this.props.value give the value obtained from parent component Board
// this.state.value shows the value of the state
//setState method to change the state 
//this.props.onClick tells that the onClick event is handled by Board
//onClick={()=>this.props.onClick()}. This first onClick is a attribute of button, it is built-in component
//The second one is just name of props can be customized.
//function component is a simpler way of component that only contain a render method but don't have their own state

class Board extends React.Component{
    /*constructor(props){
       super(props);
       this.state={squares:Array(9).fill(null),
        xIsNext:true
    };
    }*/
    //always use super when defining constructor of a subclass. 
    //All React component classes that have a constrctor should start it with a super(props) call
   renderSquare(i){
        return (
        <Square 
          value={this.props.squares[i]} //Pass the value to the child react component
          onClick={()=>this.props.onClick(i)}
          />
        ); 
        //pass another prop called onClick to Square. 
        //this prop is a function that Square can call when clicked
    }

    

    render(){
        return(
            <div>
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



class Tic extends React.Component {
    constructor(props){
        super(props);
        this.state={
        history:[{
            squares:Array(9).fill(null)
        }],
        stepNumber : 0,
        xIsNext: true
    };
    }

    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current=history[history.length-1];
        const squares =current.squares.slice();
        if(calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext ? 'X' : 'O';
        this.setState({history: history.concat([{squares:squares}]),
        stepNumber:history.length,
        xIsNext:!this.state.xIsNext,
    });
    }
//.slice is to create a copy of the squares

     jumpTo(step){
         this.setState(
             {
                 stepNumber:step,
                 xIsNext:(step%2)===0,
             }
         )
     }



    render(){
        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=calculateWinner(current.squares);

        const moves=history.map((step,move)=>{
            const desc=move? 'Go to move #'+move:
            'Go to game start';
            return(
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })



        let status;
        if(winner){
            status="Winner: "+winner;
        }else{
            status='Next player: ' + (this.state.xIsNext?'X':'O');
        }
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}
                    onClick={(i)=>this.handleClick(i)}
                    />
                </div>
               
                <div className="game-info">
                   <div>{status}</div>
                   <ol>{moves}</ol>

                </div>
            </div>
        );
    }
}




function calculateWinner(squares){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,3,6],
        [0,4,8],
        [2,4,6],
    ];

    for (let i = 0; i < lines.length; i++){
        const [a,b,c]=lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a]===squares[c]){
            return squares[a];
        }
    }
    return null;
}


export default Tic

