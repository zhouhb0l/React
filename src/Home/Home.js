import React from 'react'








class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            card:['','','',''],
        }
    }
 

    addCard=()=>{
        const cardd=this.state.card.slice()
        cardd.push('')
        this.setState({card:cardd})
    }
    removeCard=()=>{
        const cardd=this.state.card.slice()
        cardd.pop()
        this.setState({card:cardd})

    } 

    handleCardChange=(index)=>(e)=>{
       
        const cardd=this.state.card.slice()
        cardd[index]=e.target.value
        this.setState({card:cardd})
        
    }

    



    render(){
  
        return (
            <div>
            <p>  </p>
            Enter the number of cards: {this.state.card.length} 
            <button onClick={this.addCard} >add a card</button>
            <button onClick={this.removeCard}>remove a card</button>
            
           <p></p>
                {this.state.card.map(
                    (cardvalue,index)=>(
                        <input type='number' value={cardvalue}
                        onChange={this.handleCardChange(index)}
                        key={index}   min='1' max='99' size='50' ></input>
                    )
                )
                }
            <button onClick={calculate(this.state.card)}>Calculate</button>
            </div>
        )
       
    }



    


}


function calculate(card){
   // console.log(card.length)





}





export default Home