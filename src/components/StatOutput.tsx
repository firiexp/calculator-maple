import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';
import jobData from '../data/jobdata';
import { OutputStats } from '../data/statstype';

type Props = {
  result: OutputStats;
};

function StatOutput({ result }: Props): JSX.Element | null {
  if (!result || result.job === '') {
    return null;
  }

  const { mainStats } = jobData[result.job];
  // const { subStats } = jobData[result.job];
  const mainStatsStr = jobData[result.job].mainStats.join('+');
  const subStatsStr = jobData[result.job].subStats.join('+');
  const ATTStr = mainStats.includes('INT') ? '魔力' : '攻撃力';

  const percentFormatter = new Intl.NumberFormat('en-US', { style: 'percent', maximumSignificantDigits: 3 });

  return (
    <>
      <Text fontSize='2xl'>非表示ステータス</Text>
      <Grid templateRows='repeat(3, 1fr)' templateColumns='1fr 3fr' rowGap='1' border='1px'>
        <GridItem>
          <HStack>
            <Text p='1'>{mainStatsStr.concat(' %')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{result.mainStatsPercent}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{subStatsStr.concat(' %')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{result.subStatsPercent}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{ATTStr}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{result.baseATT}</Text>
        </GridItem>
      </Grid>
      <Text fontSize='2xl'>最終ダメージ換算</Text>
      <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1' border='1px'>
        <GridItem>
          <HStack>
            <Text p='1'>{mainStatsStr.concat(' 1% = ')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(
            result.buffableMainStats / (100 * (result.mainStatsWithMH + result.subStatsWithBuff / 4))
          )}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{mainStatsStr.concat(' 1 = ')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(
            (1 + result.mainStatsPercent / 100) / (result.mainStatsWithMH + result.subStatsWithBuff / 4)
          )}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{subStatsStr.concat(' 1% = ')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(
            result.buffableSubStats / (100 * (result.mainStatsWithMH * 4 + result.subStatsWithBuff))
          )}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{subStatsStr.concat(' 1 = ')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(
            (1 + result.subStatsPercent / 100) / (result.mainStatsWithMH * 4 + result.subStatsWithBuff)
          )}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{ATTStr.concat(' 1 = ')}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(1 / result.baseATT)}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{'ボスダメージ 1% = '}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(
            1 / (100 + result.DamagePercent + result.BossDamagePercent)
          )}`}</Text>
        </GridItem>

        <GridItem>
          <HStack>
            <Text p='1'>{'クリダメージ 1% = '}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text p='1'>{`最終ダメージ ${percentFormatter.format(1 / (135 + result.CriticalDamagePercent))}`}</Text>
        </GridItem>
      </Grid>
    </>
  );
}

export default StatOutput;
