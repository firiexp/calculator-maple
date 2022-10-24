import { Flex, FlexProps } from '@chakra-ui/react'

export default function Container(props: FlexProps) {
  return <Flex
    direction="column"
    justifyContent="flex-start"
    bg="gray.50"
    color="black"
    _dark={{
      bg: 'gray.900',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    minWidth='max-content'
    {...props}
  />
}
