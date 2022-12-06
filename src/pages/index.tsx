import { Heading, Link as ChakraLink, Text, ListItem, UnorderedList } from '@chakra-ui/react';
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
          <Heading as='h1' size='xl'>
            Maple Calculator
          </Heading>
          <Text>メイプルストーリーに関するツールが使えます。開発中です。</Text>
          <Heading as='h2' size='md'>
            ツール一覧
          </Heading>
          <UnorderedList>
            <ListItem>
              <NextLink href='/sf' passHref>
                <ChakraLink color='teal.400'>スターフォースシミュレーター</ChakraLink>
              </NextLink>
              <UnorderedList>
                <ListItem>スターフォースが体験できるだけ。実用性0のツールです。</ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <NextLink href='/statcalculator' passHref>
                <ChakraLink color='teal.400'>ステータス計算機</ChakraLink>
              </NextLink>
              <UnorderedList>
                <ListItem>ステータスを入力して効率を計算できるやつです。</ListItem>
              </UnorderedList>
            </ListItem>
          </UnorderedList>
        </Main>
      </Container>
    </>
  );
}

export default Index;
