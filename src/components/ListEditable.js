import React from 'react';
import {
    Center,
    Stack,
    Button,
    Text,
    Box,
    Divider,
    useDisclosure,
    useColorModeValue,
    useToast

} from "@chakra-ui/react";
import { useState, useRef, useEffect } from 'react';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { editPost, listUnapprovedPosts } from '../utilities/loaders.js';


const ListEditable = () => {
    const navigate = useNavigate();
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

    return (
        <>
            <Header />
            {posts && posts.map((post) => (
                <Center py={6}
                    key={post.id}>
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
                                onClick={() => navigate('/edit_post', { state: { post_id: post.id } })}>
                                Editar
                            </Button>
                        </Box>
                    </Box>
                </Center>
            ))}
        </>
    );
};

export default ListEditable;