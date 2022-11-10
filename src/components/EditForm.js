import React from 'react';
import {
    Center,
    Stack,
    Button,
    Text,
    Box,
    Divider,
    HStack,
    useDisclosure,
    useColorModeValue,
    useToast

} from "@chakra-ui/react";
import { useState, useRef, useEffect } from 'react';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { editPost, listUnapprovedPosts } from '../utilities/loaders.js';


const EditForm = () => {
    const textColor = useColorModeValue("gray.400", "white");
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    const toast = useToast();
    const toastIdRef = useRef();
    const { isOpen, onOpen } = useDisclosure()
    const [posts, setPosts] = useState();

    const selectPosts = async () => {
        try {
            const res = await listUnapprovedPosts();
            if (res.status === 200) {
                setPosts(res.data)
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
    const validateRegister = () => {
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

        const validate = validateRegister();
        if (validate) {
            const formData = {};
            formData.title = title;
            formData.content = content;
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
            {posts && posts.map((post) => (

                <Center py={6}>
                    <Box
                        maxW={'660px'}
                        w={'full'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Text p={2} fontSize={"sm"}>#{post.id}</Text>
                        <Stack
                            textAlign={'center'}
                            p={6}
                            align={'center'}>
                            <Text
                                fontSize={'2xl'}
                                fontWeight={500}
                                p={2}
                                px={3}
                            >
                                {post.title}
                            </Text>
                            <Divider />
                            <Stack direction={'row'} align={'center'} justify={'center'}>
                                <Text fontSize={'md'} py={7} >
                                    {post.content}
                                </Text>
                            </Stack>
                        </Stack>

                        <Text
                            fontSize={'sm'}
                            align={'right'}
                            mr={"10px"}
                            mb={"10px"}>
                            Autor:{post.nombre}
                        </Text>
                        <Box bg={'blue.50'}
                            borderTop={1}
                            borderStyle={'solid'}
                            px={6}
                            align={'center'}
                            justify={"center"}
                            py={10}>
                            <Button        
                                id={post.id}
                                w={'30%'}
                                color={'white'}
                                rounded={'xl'}
                                bg={'blue.400'}
                                _hover={{
                                    bg: 'green.300',
                                }}
                            >
                                Editar
                            </Button>
                        </Box>
                    </Box>
                </Center>
            ))}
        </>
    );
};

export default EditForm;