import {
    Center,
    Stack,
    Button,
    Text,
    Box,
    Divider,
    FormControl,
    FormLabel,
    Textarea,
    HStack
} from '@chakra-ui/react'
import Header from './Header.js'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { listPosts } from '../utilities/loaders.js';

function Home() {


    const [posts, setPosts] = useState();

    const selectPosts = async () => {
        try {
            const res = await listPosts();
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
                        <Box bg={'gray.200'}
                            borderTop={1}
                            borderStyle={'solid'}
                            px={6}
                            py={10}>
                            <FormControl>
                                <FormLabel> Deja tu comentario</FormLabel>
                                <Textarea
                                    mb="1em"
                                    bg={"white"}
                                >
                                </Textarea>
                                <Button>
                                    Enviar comentario
                                </Button>
                            </FormControl>

                        </Box>
                    </Box>
                </Center>
            ))}

        </>
    );
}

export default Home;