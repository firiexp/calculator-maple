import {
  Link as ChakraLink,
  List,
  ListIcon,
  ListItem,
  Button,
  HStack,
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import Hero from '../components/Hero'
import Container from '../components/Container'
import { Main } from '../components/Main'
import DarkModeSwitch from '../components/DarkModeSwitch'

function Index() {
  return <Container>
    <HStack as="header" py={4} spacing='12px'>
        <Button colorScheme='blue'>Button</Button>
        <Button colorScheme='red'>Button2</Button>
        <Button colorScheme='yellow'>Button3</Button>
    </HStack>
    <Hero />
    <Main>
      
      <List spacing={3} my={0} color="text">
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />

  </Container>
}

export default Index
