import React from 'react'








class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: ['3', '3', '7', '7'],
            sol: '',
            targetvalue:'24'
        }
    }


    addCard = () => {
        const cardd = this.state.card.slice()
        cardd.push('')
        this.setState({ card: cardd })
    }
    removeCard = () => {
        const cardd = this.state.card.slice()
        cardd.pop()
        this.setState({ card: cardd })

    }

    handleCardChange = (index) => (e) => {

        const cardd = this.state.card.slice()
        cardd[index] = e.target.value
        this.setState({ card: cardd })

    }
    handleTargetChange=()=>(e)=>{
        this.setState({targetvalue:e.target.value})
    }


    showanswer = () => {
        var possibleAns=[]
        var pa=[]
        var isSolvable=false
        var solstr=''
 
        possibleAns= calculate(this.state.card)
         pa=[possibleAns[0]]
        for(var i=1;i<possibleAns.length;i++){
            if(possibleAns[i].value!==possibleAns[i-1].value || possibleAns[i].algr!==possibleAns[i-1].algr){
                pa.push(possibleAns[i])
            }
        }
        possibleAns=pa

        isSolvable=false
        solstr=''
        for(i=0;i<possibleAns.length;i++){
           
            if(possibleAns[i].value===Number(this.state.targetvalue)){
                isSolvable=true
                solstr=solstr+possibleAns[i].algr.slice(1,possibleAns[i].algr.length-1)+' and '
            }}
            if(isSolvable){solstr=solstr.slice(0,solstr.length-5)}

            if(!isSolvable){
                solstr="No solution is found."}
            
        

        this.setState({sol:solstr})
     
     /*
        const pa = [], items = []
        console.log(possibleAns)
        for (var i of possibleAns) {
            if (Number.isInteger(i.value) && i.value > 0) pa.push(i.value + ": " + i.algr)
        }
        for (i of pa) {
            items.push(i + ',  ')
        }
        items.unshift(items.length + " possible answers: ")
        this.setState({ sol: items })
        */
    }



    render() {

        return (
            <div>
                <p>  </p>
                Enter the number of cards: {this.state.card.length}
                <button onClick={this.addCard} >add a card</button>
                <button onClick={this.removeCard}>remove a card</button>

                <p></p>
                {this.state.card.map(
                    (cardvalue, index) => {
                        return (<input type='number' value={cardvalue} onChange={this.handleCardChange(index)} key={index} min='1' max='99' size='50'></input>);
                    }
                )
                }
                <br></br>
                <label>Target answer: </label><input type='number' min='-1000' onChange={this.handleTargetChange()} max='1000' value={this.state.targetvalue}></input>

                <button onClick={this.showanswer}>Calculate</button>
                <p></p>
                <p>{this.state.sol}</p>


            </div>

        )

    }






}


function calculate(card) {
    var ans = [], istr = []//,anss = []
    var i, j, x, y
    var A = [], B = []
    var valA = [], valB = []
    var sorig = { value: '', algr: '' }
    var splus = { value: '', algr: '' }
    var sminus = { value: '', algr: '' }
    var stimes = { value: '', algr: '' }
    var sdivide = { value: '', algr: '' }


    if (card.length === 1) {
        sorig.value = card[0]
        sorig.algr = card[0]
        ans.push(sorig)
    } else {

        for (i = 1; i < (2 ** card.length) - 1; i++) {
            istr = []; A = []; B = []
            for (j = i.toString(2).length - 1; j >= 0; j--) { istr.unshift(i.toString(2)[j]) }
            for (j = i.toString(2).length; j < card.length; j++) { istr.unshift('0') }

            for (j = 0; j < card.length; j++) {
                if (istr[j] === '1') { A.push(card[j]) }
                if (istr[j] === '0') { B.push(card[j]) }
            }
            //  console.log(A,B)
            valA = calculate(A); valB = calculate(B)

            //console.log(valA)

            for (x of valA) {
                for (y of valB) {
                    splus = { value: '', algr: '' }
                    sminus = { value: '', algr: '' }
                    stimes = { value: '', algr: '' }
                    sdivide = { value: '', algr: '' }

                    if(x.value>=y.value){
                    splus.value = Number(x.value) + Number(y.value)
                    splus.algr = "(" + x.algr + "+" + y.algr + ')'
                    ans.push(splus);}

                    sminus.value = x.value - y.value
                    sminus.algr = "(" + x.algr + "-" + y.algr + ')'
                    ans.push(sminus);

                    if(x.value>=y.value){
                    stimes.value = x.value * y.value
                    stimes.algr = "(" + x.algr + "*" + y.algr + ')'
                    ans.push(stimes);}


                    if (y.value !== 0) {
                        sdivide.value = x.value / y.value
                        sdivide.algr = "(" + x.algr + '/' + y.algr + ')'
                        ans.push(sdivide)
                    };
                  //  console.log(ans)
                }
            }

            ans.sort(function (a, b) { return a.value - b.value })

            //console.log("here",ans)
            //anss=[ans[0]]
           /* for (i = 1; i < ans.length; i++) {
                if (ans[i].value !== ans[i - 1].value || ans[i].algr !== ans[i-1].algr) {
                    anss.push(ans[i]) }
            }*/
          

        }






    }

    return ans












}





export default Home