import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';



function Meteo() {
    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const convertKelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
      };
    
  
    const getWeather = async () => {
      const apiKey = 'bd079ed8e14a3c506d9f5811a97121de';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
      try {
        const currentWeatherResponse = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentWeatherResponse.data);
        console.log(currentWeatherResponse.data)
  
        const forecastResponse = await axios.get(forecastUrl);
        setForecast(forecastResponse.data);
        console.log(forecastResponse.data)

      } catch (error) {
        console.error('Errore nella richiesta API:', error);
      }
    };
  
    return (
      <>
      <Container className="forecast-info App uno rounded text center">
        <Row className=' d-flex justify-content-center'>
        <Col>
        <h1>Meteo App</h1>
        <Form.Control className='w-75 justify-content-center'
          type="text"
          id="cityInput"
          placeholder="Inserisci la città"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button className='mt-3' onClick={getWeather}>Ottieni Previsioni</Button>
        </Col>
        </Row>
        </Container>
        {currentWeather && (
          <Container className="forecast-info text-center App uno rounded">
        <Row className='justify-content-center'>
        <Col className='col-6 text-center'>
    <p>Temperatura attuale: {convertKelvinToCelsius(currentWeather.main.temp)}°C</p>
    <p>Condizioni attuali: {currentWeather.weather[0].description}</p>
    {currentWeather.weather[0].main === 'Rain' && (
      <FontAwesomeIcon icon={faCloudShowersHeavy} title="Pioggia" />
    )}
    {currentWeather.weather[0].main === 'Clear' && (
      <FontAwesomeIcon icon={faSun} title="Sole" />
    )}
    </Col>
    </Row>
    </Container>
)}

      {forecast && (
        <Container className="forecast-info App uno rounded">
        <Row>
        <Col>
          <h2>Previsioni per i prossimi giorni:</h2>
          {forecast.list.map((item) => (
            <>
            <p key={item.dt}>
              {item.dt_txt}: {convertKelvinToCelsius(item.main.temp)}°C, {item.weather[0].description}
            </p>
            <hr/>
            </>
          ))}
          </Col>
          </Row>
          </Container>
      )}

    </>
  );
}

export default Meteo;