import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {

} from '@chakra-ui/react';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const App = () => {
  const [detection, setDetection] = useState([]);

  useEffect(() => {
    fetchDetection();
  }) 

  const fetchDetection = async () => {
    try {
      const response = await axios.get(`${serverUrl}`)
      setDetection(response.data);
    }catch(error) {
      console.error('error fetching detection:', error);
    }
}

}