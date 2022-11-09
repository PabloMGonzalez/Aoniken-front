import React from 'react';
import Header from './Header.js'
import {
    Container,
    FormControl,
    Heading,
    Textarea,
    FormLabel,
    Button
} from '@chakra-ui/react';

function Home() {
    return (
        <>
            <Header />
            <Container justify={"center"}
                w='100%'
                mt="3em"
                maxW='1044px'
                px='10em'
            >
                <Heading pb="1em">Titulo Post</Heading>
                There are many benefits to a joint design and development system. Not only
                does it bring benefits to the design team, but it also brings benefits to
                engineering teams. It makes sure that our experiences have a consistent look
                and feel, not just in our design specs, but in production

                <FormControl pt="2em">
                    <FormLabel> Deja tu comentario</FormLabel>

                    <Textarea mb="1em">

                    </Textarea>

                    <Button>
                        Enviar comentario
                    </Button>
                </FormControl>
            </Container>

        </>
    );
}

export default Home;