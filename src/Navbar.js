import React from 'react'
import { Nav} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

const Navigation=(props)=>{
    return(
        
            
           
                <Nav className="mr-auto">
                    <Nav.Link href="/Tic">Tic-Tac-Toe</Nav.Link>
                    
                    <Nav.Link href="/Home"> Second Game</Nav.Link>
                </Nav>
           
        
    )
}

export default withRouter(Navigation);