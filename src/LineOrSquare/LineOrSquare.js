import React from 'react'


import empty from './empty.png'
import black from './black.png'
import red from './red.png'
import sblack from './blackselected.png'
import sred from './redselected.png'

class LineOrSquare extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player: [{ img: black, alt: "black square" }, { img: red, alt: "red square" }],
            board: Array(16).fill({ img: empty, alt: "empty square" }),
            BoardSelected: null,
            PlayerSelected: null,
            isBlackNextPlay: false,
            Blackstack: 4,
            Redstack: 4,
            playMessage: 'Next player : Red'
        }
    }

    handleBoardClick = (i) => (e) => {
        var emptyOb = { img: empty, alt: "empty square" }
        var blackOb = { img: black, alt: "black square" }
        var redOb = { img: red, alt: "red square" }
        var sblackOb = { img: sblack, alt: "black square selected" }
        var sredOb = { img: sred, alt: "red square selected" }

        var pl = this.state.player.slice()
        var bd = this.state.board.slice()
        var bs = this.state.BoardSelected
        var ps = this.state.PlayerSelected
        var ibnp = this.state.isBlackNextPlay
        var bno = this.state.Blackstack
        var rno = this.state.Redstack
        var pm = this.state.playMessage
        if (this.calculate(bd) === "nowin") {
            if (ibnp) {//black is next player
                if (bd[i].alt === "empty square") {//click the empy box
                    if (bs != null && bd[bs].alt === "black square selected") {
                        bd[bs] = emptyOb
                        bd[i] = blackOb
                        ibnp = false
                        pm = "Next player: Red"
                        bs = null
                        if (this.calculate(bd) !== "nowin") {
                            pm = this.calculate(bd)
                        }
                    }
                    else if (ps === 0) {
                        bd[i] = blackOb
                        pl[0] = blackOb
                        ps = null
                        ibnp = false
                        pm = "Next player: Red"
                        bno--
                        if (this.calculate(bd) !== "nowin") {
                            pm = this.calculate(bd)
                        }
                    }
                } else {//click a non-empty box
                    if (bd[i].alt === "black square") {
                        if (bs != null) { bd[bs] = blackOb }
                        bd[i] = sblackOb
                        bs = i
                        pl[0] = blackOb
                        ps = null

                    }
                    else if (bd[i].alt === "black square selected") {
                        bd[i] = blackOb
                        bs = null
                    }

                }




            } else {//red's turn
                if (bd[i].alt === "empty square") {//click the empy box
                    if (bs != null && bd[bs].alt === "red square selected") {
                        bd[bs] = emptyOb
                        bd[i] = redOb
                        ibnp = true
                        pm = "Next player: Black"
                        bs = null
                        if (this.calculate(bd) !== "nowin") {
                            pm = this.calculate(bd)
                        }
                    }
                    else if (ps === 1) {
                        bd[i] = redOb
                        pl[1] = redOb
                        ps = null
                        ibnp = true
                        pm = "Next player: Black"
                        rno--
                        if (this.calculate(bd) !== "nowin") {
                            pm = this.calculate(bd)
                        }
                    }
                } else {//click a non-empty box

                    if (bd[i].alt === "red square") {
                        if (bs != null) { bd[bs] = redOb }
                        bd[i] = sredOb
                        bs = i
                        pl[1] = redOb
                        ps = null

                    }
                    else if (bd[i].alt === "red square selected") {
                        bd[i] = redOb
                        bs = null
                    }

                }







            }










            this.setState({
                player: pl,
                board: bd,
                BoardSelected: bs,
                PlayerSelected: ps,
                isBlackNextPlay: ibnp,
                Blackstack: bno,
                Redstack: rno,
                playMessage: pm

            })
            console.log(bs, ps)

        }

    }
    handlePlayerClick = (i) => (e) => {
        // var emptyOb = { img: empty, alt: "empty square" }
        var blackOb = { img: black, alt: "black square" }
        var redOb = { img: red, alt: "red square" }
        var sblackOb = { img: sblack, alt: "black square selected" }
        var sredOb = { img: sred, alt: "red square selected" }

        var pl = this.state.player.slice()
        var bd = this.state.board.slice()
        var bs = this.state.BoardSelected
        var ps = this.state.PlayerSelected
        var ibnp = this.state.isBlackNextPlay
        var bno = this.state.Blackstack
        var rno = this.state.Redstack
        if (this.calculate(bd) === "nowin") {

            if (ibnp && i === 0) {
                if (ps === 0) {
                    pl[0] = blackOb
                    ps = null
                }
                else if (bno > 0) {
                    ps = 0
                    pl[0] = sblackOb
                    if (bs != null) { bd[bs] = blackOb }
                    bs = null
                }

            }

            if (!ibnp && i === 1) {
                if (ps === 1) {
                    pl[1] = redOb
                    ps = null
                } else if (rno > 0) {
                    ps = 1
                    pl[1] = sredOb
                    if (bs != null) { bd[bs] = redOb }
                    bs = null
                }

            }



            this.setState({
                player: pl,
                board: bd,
                BoardSelected: bs,
                PlayerSelected: ps,
                isBlackNextPlay: ibnp,
                Blackstack: bno,
                Redstack: rno
            })

            console.log(bs, ps)
        }
    }

    calculate(bd) {
        const lines = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            [0, 5, 10, 15],
            [3, 6, 9, 12],
            [0, 3, 12, 15],
            [0, 2, 8, 10],
            [1, 3, 9, 11],
            [4, 6, 12, 14],
            [5, 7, 13, 15],
            [0, 1, 4, 5],
            [1, 2, 5, 6],
            [2, 3, 6, 7],
            [4, 5, 8, 9],
            [5, 6, 9, 10],
            [6, 7, 10, 11],
            [8, 9, 12, 13],
            [9, 10, 13, 14],
            [10, 11, 14, 15]
        ]
        var black = [], red = []
        for (var i = 0; i < 16; i++) {
            var a = bd[i]
            if (a.alt === "black square" || a.alt === "black square selected") {
                black.push(i)
            }
            if (a.alt === "red square" || a.alt === "red square selected") {
                red.push(i)
            }
        }
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d] = lines[i]
            var [aa, bb, cc, dd] = black
            if (a === aa && b === bb && c === cc && d === dd) { return "black win" }
            [aa, bb, cc, dd] = red
            if (a === aa && b === bb && c === cc && d === dd) { return "red win" }

        }


        return ("nowin")
    }



    render() {
        const imgsize = 70
        var itemplayer = []
        var itemboard = []

        for (var i = 0; i < this.state.player.length; i++) {
            var a = this.state.player[i]
            itemplayer.push(
                <img src={a.img} alt={a.alt} height={imgsize} width={imgsize}
                    onClick={this.handlePlayerClick(i)} />
            )
        }
        for (i = 0; i < this.state.board.length; i++) {
            a = this.state.board[i]
            itemboard.push(
                <img src={a.img} alt={a.alt} height={imgsize} width={imgsize}
                    onClick={this.handleBoardClick(i)} />
            )
        }




        return (
            <div align="center">
                <p></p>
                <p>{this.state.playMessage}</p>
                <div>
                    ({this.state.Blackstack}){itemplayer[0]}
                    <label>---VS---</label>
                    {itemplayer[1]}({this.state.Redstack})
                </div>

                <p></p>
                <div>
                    {itemboard[0]}{itemboard[1]}{itemboard[2]}{itemboard[3]}
                </div>
                <div>
                    {itemboard[4]}{itemboard[5]}{itemboard[6]}{itemboard[7]}
                </div>
                <div>
                    {itemboard[8]}{itemboard[9]}{itemboard[10]}{itemboard[11]}
                </div>
                <div>
                    {itemboard[12]}{itemboard[13]}{itemboard[14]}{itemboard[15]}
                </div>
            </div>






        )

    }

}


export default LineOrSquare