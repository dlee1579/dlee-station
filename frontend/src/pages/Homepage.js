import Banner from "../components/Banner";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { useState, useEffect, useRef } from 'react';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Homepage = () => {
    const [northbound, setNorthbound] =  useState([]);
    const [southbound, setSouthbound] = useState([]);
    const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
    const fetchDataIntervalId = useRef();
    const url = "http://127.0.0.1:5000/"

    const fetchTrainUpdates= async () => {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log("API call made");
                    setNorthbound(result['northbound']);
                    setSouthbound(result['southbound']);
                }
            )
    };

    useEffect(() => {
        const interval = setInterval(() => {
          fetchTrainUpdates();
        }, 1000*30);
      
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        fetchTrainUpdates();
        return ()=> clearInterval(fetchDataIntervalId.current);
    }, [fetchDataTrigger]);

    const setFetchDataInterval = (interval) => {
        // Clear old interval
        if (fetchDataIntervalId.current) {
          clearInterval(fetchDataIntervalId.current);
          fetchDataIntervalId.current = undefined;
        }
    
        // Set new interval
        if (interval > 0) {
          fetchDataIntervalId.current = setInterval(() => {
            setFetchDataTrigger(Date.now());
          }, interval);
        }
      };


    const lineStyle = {
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: '90%',
        padding: '3px 5px 3px 5px',
        // width: '33%',
        // paddingBottom: '5%',
        fontWeight: 'bold',
    };

    const directionToStationMap = {
        'N': '8 Av',
        'S': 'Canarsie-Rockaway Pkwy',
    };

    const scheduleTable = (direction) => {
        var updates;
        if (direction === "N") {
            updates = northbound;
        }
        else if (direction === "S") {
            updates = southbound;
        }

        return (
            <div>
                {directionToStationMap[direction]}
                <Table bordered hover variant="dark" >
                <thead>
                    <tr>
                    <th>Line</th>
                    <th>Arrival Time</th>
                    </tr>
                </thead>
                <tbody>
                    {updates.map(update => {
                        return <tr>
                            <td style={lineStyle} >{update.line}</td>
                            <td>{update.arrival_time}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
            </div>
        )
    };

    return (
        <div>
            <Banner></Banner>
            <br></br>
            <Container>
                <Row>
                    <Col>{ scheduleTable("N")}</Col>
                    <Col>{ scheduleTable("S")}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Homepage;