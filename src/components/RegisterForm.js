import React from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,  
  FormLabel,
  Input,
  InputGroup,
  Heading,
  HStack,
  Link,
  InputRightElement,
  useToast,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure

} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { register } from "../utilities/loaders";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Header from './Header.js'



function SignUp() {

  const { isOpen, onOpen } = useDisclosure()

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef();

  const handleRegistro = () => {
    if (passConfirmation !== password) {
      messageError("Las contraseñas no coinciden");
      return;
    }
    sendUserToAPI();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const sendUserToAPI = async () => {

    const validateForm = validate();

    if (validateForm) {

      const formData = {};
      formData.nombre = nombre;
      formData.password = password;
      formData.email = email;

      const response = await register(formData)
      if (response.status === 200) {
        onOpen()
      }
      else {
        messageError("Error: Email ya registrado.")
      }
    }

  };

  const validate = () => {
    let isValid = true;

    if (nombre === "" || nombre.length < 3 || nombre.length > 50) {
      isValid = false;
      messageError("El nombre debe tener entre 3 y 50 caracteres");
      return
    }
    if (validateEmail(email) === false) {
      isValid = false;
      messageError("El email no es valido");
      return
    }
    if (password.length < 4 || password.length > 20) {
      isValid = false;
      messageError("La contraseña debe tener entre 6 y 20 caracteres");
      return
    }
    return isValid;
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const messageError = (message) => {
    if (!toast.isActive(toastIdRef.current))
      toastIdRef.current = toast({
        title: 'Error',
        position: 'bottom-left',
        description: message,
        status: 'error',
        isClosable: true,
      })
  }

  const titleColor = useColorModeValue("blue.800", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  return (
    <>
      <Header />

      <Flex justify={"center"}>
        <Flex
          justify={"center"}
          w='100%'
          maxW='1044px'
          mx='auto'
        >
          <Flex
            alignItems='center'
            justifyContent='start'
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "62%" }}>
            <Flex
              direction='column'
              w='100%'
              background='transparent'
              p='20px'
              mt={{ md: "150px", lg: "80px" }}>
              <Heading color={titleColor} fontSize='48px' mb='10px' >
                Registrate
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColor}
                fontWeight='bold'
                fontSize='20px'>
                Completá tus datos
              </Text>
              <FormControl>
                <HStack w="100%" spacing={3}>
                  <Box w="50%">
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                      Nombre
                    </FormLabel>
                    <Input
                      id='nombre'
                      fontSize='sm'
                      ms='4px'
                      borderRadius='5px'
                      placeholder='Nombre'
                      mb='24px'
                      size='lg'
                      onChange={(e) => setNombre(e.target.value)}
                      
                    />
                  </Box>
                </HStack>
                <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                  Email
                </FormLabel>
                <Input
                  id='email'
                  fontSize='sm'
                  ms='4px'
                  borderRadius='5px'
                  type='email'
                  placeholder='Tu email'
                  mb='24px'
                  size='lg'
                  onChange={(e) => setEmail(e.target.value)}

                />
                <HStack w="100%" spacing={3}>
                  <Box w="50%">
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal' textOverflow="ellipsis" whiteSpace="nowrap">
                      Contraseña
                    </FormLabel>
                    <InputGroup size='md'>
                      <Input
                        id='password'
                        fontSize='sm'
                        ms='4px'
                        borderRadius='5px'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Tu contraseña'
                        mb='24px'
                        size='lg'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width='4.5rem'>
                        <Flex onClick={handleShowPassword}>
                          {showPassword ?
                            <ViewIcon w={6} h={6} _hover={{ cursor: "pointer" }} mt="25%" ml="25%" /> :
                            <ViewOffIcon w={6} h={6} _hover={{ cursor: "pointer" }} mt="25%" ml="25%" />}
                        </Flex>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                  <Box w="50%">
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal' textOverflow="ellipsis" whiteSpace="nowrap">
                      Confirmar contraseña
                    </FormLabel>
                    <InputGroup size='md'>
                      <Input
                        fontSize='sm'
                        ms='4px'
                        borderRadius='5px'
                        mb='24px'
                        size='lg'
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        placeholder='Confirmar contraseña'
                        required
                        onChange={(e) => setPassConfirmation(e.target.value)}
                      />
                      <InputRightElement width='4.5rem' overflow="hidden">
                        <Flex onClick={handleShowPasswordConfirmation}>
                          {showPasswordConfirmation ?
                            <ViewIcon w={6} h={6} _hover={{ cursor: "pointer" }} mt="25%" ml="25%" /> :
                            <ViewOffIcon w={6} h={6} _hover={{ cursor: "pointer" }} mt="25%" ml="25%" />}
                        </Flex>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </HStack>
                <Button
                  type='submit'
                  bg='muni.celeste'
                  fontSize='10px'
                  color='white'
                  fontWeight='bold'
                  w='100%'
                  h='45'
                  mb='24px'
                  onClick={handleRegistro}
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
                  }}>
                  <Text fontWeight={'bold'} fontSize={'13px'}>REGISTRARME</Text>
                </Button>

                <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Se ha registrado con éxito</ModalHeader>
                  <ModalBody>
                    <p>Se creo el usuario con exito</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      bg='muni.celeste'
                      fontSize='10px'
                      color='white'
                      fontWeight='bold'
                      w='100%'
                      h='45'
                      mb='24px'
                      onClick={() => navigate("/login")}
                      _hover={{
                        bg: "teal.200",
                      }}
                      _active={{
                        bg: "teal.400",
                      }}>
                      <Text fontWeight={'bold'} fontSize={'13px'}>SIGUIENTE</Text>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                <Link
                  color={titleColor}
                  ms='5px'
                  onClick={() => navigate("/login/")}
                  fontWeight='bold'>
                  Inicia Sesion
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      );
    </>)
}

export default SignUp;