import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import './style.scss'


function Footer() {
  return (
      <>
      
       <footer className="footer">
        <Container>

            <div className="footer__inner">
                <div className="footer__author">Автор сайта:<br/>
                    Бородинов Николай Владимирович</div>

                <div className="footer__year">2023г.</div>
             
            </div>
        </Container>
    </footer>
 
      </> 
    
  
 
  )
}

export default Footer