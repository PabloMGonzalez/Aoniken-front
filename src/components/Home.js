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
    Badge,
} from '@chakra-ui/react'
import Header from './Header.js'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createComment, getComments, listApprovedPosts } from '../utilities/loaders.js';
import { useLocalStorage } from 'react-use';

function Home() {

    const [content, setContent] = useState("");

    const [postsComments, setPostsComments] = useState();
    const [isLoggedIn, setIsLoggIn] = useLocalStorage('isLoggedIn');


    const selectPostsComments = async () => {
        try {
            const posts = await listApprovedPosts();
            const comments = await getComments();
            const result = posts.data.map(post => {
                return {
                    ...post,
                    comments: comments.data.filter(comment => comment.id === post.id)
                }
            })
            setPostsComments(result)
          
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        selectPostsComments()
    }, []);


    const handleComment = async (e) => {

        const formData = {}
        formData.user_id = localStorage.getItem("user_id");
        formData.post_id = e.target.id;
        formData.content = content;       
        const response = await createComment(formData)    

        const updatedPostsComments = postsComments.map(post => {
            if (post.id == formData.post_id) {            
              post.comments = [...post.comments, {content: content, nombre: localStorage.getItem("nombre")}];    
          
          }
          return post;
          });
          setPostsComments(updatedPostsComments);     
      
    }


    return (
        <>
            <Header />
            {postsComments && postsComments.map((post) => (
                <Center py={6} key={post.id} >

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
                        <Divider />

                        {post.comments.map((comment,i) => (<Box ml='3' key={`${comment.id}+${i}`}>
                            <Text >
                                <Badge
                                    rounded={"lg"}
                                    fontSize={"sm"}
                                    py={1}
                                    px={4}
                                    my={2}
                                    colorScheme='green'>
                                    {comment.nombre}
                                </Badge>
                            </Text>

                            <Text
                                fontSize='md'
                                mb={3}>
                                {comment.content}
                            </Text>
                            <Divider />
                        </Box>))}


                        {isLoggedIn && <Box bg={'gray.200'}
                            borderTop={1}
                            borderStyle={'solid'}
                            px={6}
                            py={10}>
                            <FormControl>
                                <FormLabel> Deja tu comentario</FormLabel>
                                <Textarea
                                    mb="1em"
                                    bg={"white"}
                                    onChange={(e) => setContent(e.target.value)}
                                >
                                </Textarea>
                                <Button
                                    id={post.id}
                                    onClick={handleComment}>
                                    Enviar comentario
                                </Button>
                            </FormControl>
                        </Box>}
                    </Box>
                </Center>
            ))}

        </>
    );
}

export default Home;