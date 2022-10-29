import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import { OutputStats } from '../data/formtype';

type Props = {
  result: OutputStats | undefined;
};

function statOutput({ result }: Props) {
  return (
    <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
      <GridItem>
        <HStack>
          <Text p='1'>補正ステータス攻撃力</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Text p='1'>{result && result.OverAllAttackPower}</Text>
      </GridItem>
      <GridItem>
        <HStack>
          <Text p='1'>ステータス%</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Text p='1'>{result && result.mainStatsPercent}</Text>
      </GridItem>
    </Grid>
  );
}

export default statOutput;
