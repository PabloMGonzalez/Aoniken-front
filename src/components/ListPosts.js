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
import { CheckIcon } from '@chakra-ui/icons';


function ListPosts() {

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
                        <Text p={2}>#{post.id}</Text>
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
                                <Text fontSize={'md'} pt={2} >
                                    {post.content}
                                </Text>
                            </Stack>
                        </Stack>
                        <Text>Autor:{post.nombre}</Text>
                        <Box bg={'gray.300'} px={6} py={10}>
                            <HStack>
                                <Button
                                    w={'full'}
                                    bg={'green.400'}
                                    color={'white'}
                                    rounded={'xl'}
                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}
                                    _focus={{
                                        bg: 'green.500',
                                    }}>
                                    Aprobar
                                </Button>
                                <Button
                                    w={'full'}
                                    bg={'green.400'}
                                    color={'white'}
                                    rounded={'xl'}
                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}
                                    _focus={{
                                        bg: 'green.500',
                                    }}>
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