import React from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  Textarea,
  Button

} from "@chakra-ui/react";
import { useState } from 'react';
import Header from './Header.js';
import { createPost } from '../utilities/loaders';
import { useNavigate } from 'react-router-dom';

function PostForm() {

  const titleColor = useColorModeValue("blue.800", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [user_id, setUserId] = useState();

  const navigate = useNavigate();


  const sendPost = async () => {

    const formData = {};
    formData.title = title;
    formData.content = content;
    formData.user_id = localStorage.getItem('user_id');

    try {
      const res = await createPost(formData);
      if (res.status === 200) {       
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <>
      <Header />
      <Flex justify={"center"}>
        <Flex
          justify={"center"}
          w='100%'
          maxW='1044px'
          mx='auto'
          ml='26em'
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
              <Heading color={titleColor} fontSize='32px' mb='10px' >
                Nuevo post
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColor}
                fontWeight='bold'
                fontSize='20px'>
                Completá los datos
              </Text>
              <FormControl>
                <HStack w="100%" spacing={3}>
                  <Box w="50%">
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                      Titulo
                    </FormLabel>
                    <Input
                      id='title'
                      fontSize='sm'
                      ms='4px'
                      borderRadius='5px'
                      placeholder='Titulo del post'
                      mb='24px'
                      size='lg'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>
                </HStack>
                <HStack w="100%" spacing={3}>
                  <Box w="75%">
                    <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                      Descripcion
                    </FormLabel>
                    <Textarea
                      id='content'
                      fontSize='sm'
                      ms='4px'
                      borderRadius='5px'
                      placeholder='Cuerpo del post'
                      mb='24px'
                      size='lg'
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Box>
                </HStack>
                <Button
                  colorScheme={"blue"}
                  variant={"solid"}
                  onClick={sendPost}
                >
                  Enviar
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>

  );
}
export default PostForm;