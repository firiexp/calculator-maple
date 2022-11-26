import { Heading, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import Container from '../components/Container';
import Main from '../components/Main';
import Header from '../components/Header';
import SiteHead from '../components/SiteHead';

function Index() {
  return (
    <>
      <SiteHead title='Maple Calculator' />
      <Container>
        <Header />
        <Main>
          <Heading>Maple Calculator</Heading>
          <NextLink href='/sf' passHref>
            <ChakraLink>スターフォースシミュレーター</ChakraLink>
          </NextLink>
          <NextLink href='/statcalculator' passHref>
            <ChakraLink>ステータス計算機</ChakraLink>
          </NextLink>
        </Main>
      </Container>
    </>
  );
}

export default Index;
