import { Link as ChakraLink, Flex, FlexProps, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import DarkModeSwitch from './DarkModeSwitch';

export default function Header(props: FlexProps) {
  return (
    <Flex as='header' p={3} bgColor='red.100' width='100%' {...props}>
      <NextLink href='/' passHref>
        <ChakraLink fontSize='2xl'>Maple Calculator</ChakraLink>
      </NextLink>
      <Spacer />
      <DarkModeSwitch />
    </Flex>
  );
}
