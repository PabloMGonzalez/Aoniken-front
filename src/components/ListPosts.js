import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Text
} from '@chakra-ui/react'
import Header from './Header.js'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { listPosts } from '../utilities/loaders.js';


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
            <TableContainer w="100%"
                justify={"center"}
                maxW='1044px'
                mx='auto'
            >
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Titulo</Th>
                            <Th>Contenido</Th>
                            <Th>Nombre</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {posts && posts.map((post) => (
                            <Tr key="post.id">
                                <Td fontSize="sm"
                                width={"10px"}
                                >{post.id}
                                </Td>

                                  <Td fontSize="sm"
                                   width={"30px"}
                                > {post.title}
                                </Td>


                                <Td fontSize="sm"                                   
                                > 
                                
                                <Text width={"10px"}>
                                {post.content}
                                </Text>



                                </Td>
                                <Td fontSize="sm"
                                >{post.nombre}
                                </Td>
                            </Tr>

                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ListPosts;