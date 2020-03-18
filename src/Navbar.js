import React from 'react'
import { Nav} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

const Navigation=(props)=>{
    return(
        
            
           
                <Nav className="mr-auto">
                    '<Nav.Link href="/Tic">Tic-Tac-Toe</Nav.Link>'
                      ~~  
                    '<Nav.Link href="/Game24"> Twenty-Four</Nav.Link>'
                    ~~
                    '<Nav.Link href="/LineOrSquare">Line-Or-Square</Nav.Link>'

                </Nav>
           
        
    )
}

export default withRouter(Navigation);