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
import { useLocalStorage } from 'react-use';


export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log("Estado del logueo: " + localStorage.getItem("isLoggedIn"));
    navigate('/login');

  }

  const [isLoggedIn, setIsLoggIn] = useLocalStorage('isLoggedIn');

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

        <Stack
          ml={'left'}
          direction={'reverse-row'}
          spacing={6}>

          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => { navigate('/home') }}>
            Home
          </Button>

          {isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            mx="25px"
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => { navigate('/create_post') }}>
            Nuevo Posteo
          </Button>}

          {isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate('/listar_posts')}>
            Listar Posteos
          </Button>}

          {isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'red.400'}
            ml={"25px"}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate('/listar_posts_editables')}>
            Edit
          </Button>}


        </Stack>

        <Stack
          ml={'auto'}
          direction={'row'}
          spacing={6}>
          {!isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate("/login/")}>
            Log In
          </Button>}

          {!isLoggedIn && <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'blue.400'}
            _hover={{
              bg: 'green.300',
            }}
            onClick={() => navigate("/register/")}>
            Registrate
          </Button>}

          {isLoggedIn && <Button
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
        </Stack>
      </Flex>
    </Box>
  );
}
