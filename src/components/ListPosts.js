import {
    Center,
    Stack,
    Button,
    Text,
    Box,
    Divider,
    HStack
} from '@chakra-ui/react'
import Header from './Header.js'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { approvePost, listPendingApprovalPosts, rejectPost } from '../utilities/loaders.js';



function ListPosts() {

    const [posts, setPosts] = useState([]);

    const selectPosts = async () => {
        try {
            const res = await listPendingApprovalPosts();
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

    const handleApprove = async (e, key) => {
        try {
            const formData = {}
            formData.id = e.target.id
            const res = await approvePost(formData);           
        } catch (error) {
            console.log(error)
        }
        posts.splice(key, 1);
        setPosts([...posts]);
    }

    const handleReject = async (e, key) => {

        try {
            const formData = {}
            formData.id = e.target.id
            const res = await rejectPost(formData);
        } catch (error) {
            console.log(error)
        }

        posts.splice(key, 1);
        setPosts([...posts]);

    }

    return (
        <>
            <Header />
            {posts && posts.map((post) => (
                <Center py={6} key = {post.id}>
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
                                    id={post.id}
                                    w={'30%'}
                                    color={'white'}
                                    rounded={'xl'}
                                    bg={'blue.400'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}
                                    onClick={handleApprove}
                                >
                                    Aprobar
                                </Button>
                                <Button
                                    id={post.id}
                                    w={'30%'}
                                    color={'white'}
                                    rounded={'xl'}
                                    bg={'blue.400'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}
                                    onClick={handleReject}
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