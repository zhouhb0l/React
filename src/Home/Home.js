import React from 'react'








class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            card:['2','5','7','8'],
            sol:''
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

    showanswer=()=>{
        const possibleAns=calculate(this.state.card)
        const pa=[],items=[]
        for(var i of possibleAns){
            if(Number.isInteger(i) && i>0) pa.push(Number(i))
        }
        pa.sort(function(a,b){return a-b});

        for(i of pa){
            items.push(i+', ')
        }

        this.setState({sol:items})
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
            <button onClick={this.showanswer}>Calculate</button>
             <p></p>
             Possible solutions:<p></p>
            <label>{this.state.sol}</label>
            </div>
          
        )
       
    }



    


}


function calculate(card){
    var ans=[],istr=[],ansReduced=[]
    var i,j,x,y
    var A=[],B=[]
    var valA=[],valB=[]
   if(card.length===1) {ansReduced.push(card[0])} else {
      
    for (i=1;i<(2**card.length)-1;i++){
        istr=[];A=[];B=[]
        for(j=i.toString(2).length-1;j>=0;j--){istr.unshift(i.toString(2)[j])}
        for(j=i.toString(2).length;j<card.length;j++){istr.unshift('0')}
        
        for (j=0;j<card.length;j++){            
          if(istr[j]==='1') {A.push(card[j])}
          if(istr[j]==='0') {B.push(card[j])} 
        }
       // console.log(card,istr,'A',A,'B',B)
     valA=calculate(A);valB=calculate(B)
      
      console.log(valA,valB)

     for (x of valA){
       
         for(y of valB){
            ans.push(Number(x)+Number(y));
            ans.push(x-y); 
            ans.push(x*y);
            if(y!==0) {ans.push(x/y)};
         }
     }
     
     ansReduced=ans.filter((item,index)=> ans.indexOf(item)===index)

    }
      





    }
console.log(ansReduced)
    return ansReduced










 

}





export default Home