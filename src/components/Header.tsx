import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,

} from '@chakra-ui/react';
import { useNavigate } from "react-router";
import { logout } from '../utilities/loaders';

import React from 'react';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/')
  }



  return (
    <Box>
      <Flex
        bg={useColorModeValue('blue.50', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        {/* <Stack
          ml={'105em'}
          direction={'row'}
          spacing={6}>

          {localStorage.getItem('isLoggedIn') && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate("/login")}>
            Log In
          </Button>}

          {!localStorage.getItem('isLoggedIn') && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate("/register")}>
            Sign Up
          </Button>}

          {!localStorage.getItem('isLoggedIn') && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={handleLogout}>
            Log Out
          </Button>}

        </Stack> */}
      </Flex>

    </Box>
  );
}
