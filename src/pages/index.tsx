import { Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';

function Index() {
    return (
        <Container>
            <Header />
            <Main>
                <Heading>Head!!!</Heading>
                <Text fontSize='xl'>Test</Text>
                <NextLink href='/sf' passHref>
                    <ChakraLink>スターフォースシミュレーター</ChakraLink>
                </NextLink>
            </Main>
        </Container>
    );
}

export default Index;
