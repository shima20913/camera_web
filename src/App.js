import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';

const serverUrl = process.env.REACT_APP_SERVER_URL;


const App = () => {
  const [detection, setDetection] = useState([]);

  useEffect(() => {
    // fetchDetection()
    const fetchDetection = async () => {
      try {
        console.log('Server URL:', serverUrl);
        const response = await axios.get(`${serverUrl}/detection`);
        console.log('Detection data:', response.data);
        setDetection(response.data.reverse());
      } catch(error) {
        console.error('error fetching detection:', error);
      }
    }

    const interval = setInterval(() => {
      fetchDetection();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

return (
  <Container maxW="container.lg" py={4}>
      <Heading as="h1" mb={6} textAlign="center">
        最新の検知情報
      </Heading>
      <VStack spacing={6}>
        {detection.map((detection, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            boxShadow="md"
          >
            <HStack>
              <Image
                boxSize="150px"
                objectFit="cover"
                src={`${serverUrl}/image` + detection.imageUrl}
                alt={`Detection ${index + 1}`}
              />
              <VStack align="start">
                <Text fontWeight="bold">検知時間: {detection.time}</Text>
                <Text>天気: {detection.weather}</Text>
                <Badge colorScheme="green">Person Detected</Badge>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default App;