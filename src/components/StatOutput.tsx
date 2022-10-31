import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import jobData from '../data/jobdata';
import { OutputStats } from '../data/statstype';

type Props = {
  result: OutputStats;
};

function statOutput({ result }: Props) {
  return (
    <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
      <GridItem>
        <HStack>
          <Text p='1'>{result.job !== '' && jobData[result.job].mainStats.join('+').concat(' %')}</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Text p='1'>{result && result.mainStatsPercent}</Text>
      </GridItem>

      <GridItem>
        <HStack>
          <Text p='1'>{result.job !== '' && jobData[result.job].subStats.join('+').concat(' %')}</Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Text p='1'>{result && result.subStatsPercent}</Text>
      </GridItem>

      <GridItem>
        <HStack>
          <Text p='1'>
            {result.job !== '' &&
              (jobData[result.job].mainStats.includes('INT') ? '魔力' : '攻撃力').concat('% (合計)')}
          </Text>
        </HStack>
      </GridItem>
      <GridItem>
        <Text p='1'>{result && result.subStatsPercent}</Text>
      </GridItem>
    </Grid>
  );
}

export default statOutput;
