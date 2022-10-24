import { Heading, Text } from '@chakra-ui/react'
import Container from '../components/Container'
import Main from '../components/Main'
import Header from '../components/Header'

function Index() {
  return <Container>
    <Header />
    <Main>
      <Heading>Head!!!</Heading>
      <Text fontSize='xl'>Test</Text>
    </Main>

  </Container>
}

export default Index
