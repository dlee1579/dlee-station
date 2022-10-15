import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

const Banner = () => {
    const [time, setTime] = useState();
    useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date().toLocaleString());
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <Navbar bg="dark" variant="dark" fixed="top" size='xl'>
            <Container>
            {/* <div></div> */}
            <Navbar.Brand>
                First Ave Station
            </Navbar.Brand>
            <div>{time}</div>
            </Container>
        </Navbar>
    )
}

export default Banner;