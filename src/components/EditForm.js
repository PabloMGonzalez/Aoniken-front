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
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from "@chakra-ui/react";
import { useState, useRef, useEffect } from 'react';
import Header from './Header.js';
import { editPost, selectPost } from '../utilities/loaders';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';



function EditForm() {

  const { state } = useLocation();
  const { post_id } = state;
  const [post, setPost] = useState([]);
  const titleColor = useColorModeValue("blue.800", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef();
  const { isOpen, onOpen } = useDisclosure()

  const selectPosts = async () => {
    try {
      const formData = {}
      formData.id = post_id
      const res = await selectPost(formData);
      if (res.status === 200) {
        setPost(res.data)       
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    selectPosts()
  }, []);


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

  const validateForm = () => {
    let isValid = true;
    console.log(title)

    if (title === undefined) {
      isValid = false;
      messageError("El Post debe contener un Titulo");
      return
    }
    if (content === undefined) {
      isValid = false;
      messageError("El Post debe tener contenido");
      return
    }
    return isValid;
  };


  const sendPost = async () => {

    const validate = validateForm();
    if (validate) {
      const formData = {};
      formData.title = title;
      formData.content = content;
      formData.id = post_id;
      formData.user_id = localStorage.getItem('user_id');
      try {
        const res = await editPost(formData);
        if (res.status === 200) {
          onOpen()
        }
      } catch (error) {
        messageError("Se expiro el tiempo de la sesion, o no estas logueado para postear.")
      }
    };
  }

  return (
    <>
      <Header />
      {post && post.reverse().map((selectedPost) => (
        <Flex
        key={selectedPost.id}
          align={"center"}
          justify={"center"}>
          <Flex
            justify={"center"}
            w='100%'
            maxW='1044px'
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
                  Editar Post{post.content}
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
                        defaultValue={selectedPost?.title}
                        fontSize='sm'
                        ms='4px'
                        borderRadius='5px'
                        placeholder={post.title}
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
                        defaultValue={selectedPost?.content}
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
                    Editar Post
                  </Button>

                  <Modal isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Se edito el post con exito</ModalHeader>
                      <ModalBody>
                        <p>El post tiene que ser aprobado por alguno los editores, luego saldra en el inicio de la app</p>
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
                          onClick={() => navigate("/listar_post_editables")}
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
              </Flex>
            </Flex>
          </Flex>
        </Flex>))}

    </>

  );
}
export default EditForm;