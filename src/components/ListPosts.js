import {
    Center,
    useColorModeValue,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    Text,
    Box,
    Divider,
    HStack
} from '@chakra-ui/react'
import Header from './Header.js'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { listPosts } from '../utilities/loaders.js';
import { useNavigate } from "react-router";



function ListPosts() {

    const [posts, setPosts] = useState();
    const navigate = useNavigate();

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
                        <Box bg={'blue.50'}
                            borderTop={1}
                            borderStyle={'solid'}
                            px={6}
                            py={10}>
                            <HStack
                                align={'center'}
                                justify={'center'}>
                                <Button
                                    w={'30%'}
                                    color={'white'}
                                    rounded={'xl'}
                                    bg={'blue.400'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}
                                    onClick={() => { navigate('/post/approve_post/' + post.id) }}
                                >
                                    Aprobar
                                </Button>
                                <Button
                                    w={'30%'}
                                    color={'white'}
                                    rounded={'xl'}
                                    bg={'blue.400'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}
                                    onClick={() => { navigate('/post/reject_post/' + post.id) }}
                                >
                                    Rechazar
                                </Button>
                            </HStack>
                        </Box>
                    </Box>
                </Center>
            ))}

        </>
    );
}

export default ListPosts;