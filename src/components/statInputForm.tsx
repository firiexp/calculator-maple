import { Button, FormControl, Grid, GridItem, HStack, Input, Select, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';
import { QuestionIcon } from '@chakra-ui/icons';
import jobData from '../data/jobdata';
import weaponData from '../data/weapondata';
import { InputStats, OutputStats } from '../data/formtype';

type Props = {
  updateResult: (stats: OutputStats) => void;
};

function StatInputForm({ updateResult }: Props) {
  const { register, control, handleSubmit } = useForm<InputStats>({});
  const watchJob = useWatch({
    control,
    name: 'job',
    defaultValue: '',
  });

  const CalcResult = (player: InputStats): OutputStats => {
    const baseStats = player.playerlevel * 5 + 14;
    const CombinedStats = player.mainStatsWithMH * 4 + player.subStatsWithoutBuff;
    const calcStatATT = (ATT: number) => {
      const innerATT = Math.round((Math.floor(weaponData[player.weapon].weaponMultiplier) * CombinedStats * ATT) / 100);
      return innerATT * (1 + player.DamagePercent / 100) * (1 + player.FinalDamagePercent / 100);
    };
    const buffedATT = (() => {
      let ok = 0;
      let ng = 1;
      while (calcStatATT(ng) <= player.statATT) ng *= 2;
      while (ng - ok > 1) {
        const mid = Math.floor((ok + ng) / 2);
        if (calcStatATT(mid) <= player.statATT) ok = mid;
        else ng = mid;
      }
      return ok;
    })();
    return {
      mainStatsPercent: Math.ceil(
        100 * ((player.mainStatsWithMH - player.mainStatsWithoutMH) / ((baseStats * player.MHlevel) / 100) - 1)
      ),
      subStatsPercent: Math.ceil(
        100 * ((player.subStatsWithBuff - player.subStatsWithoutBuff) / (player.subStatsBuffAmount * 0.01) - 1)
      ),
      OverAllAttackPower: (Math.floor(weaponData[player.weapon].weaponMultiplier) * CombinedStats) / 100,
    };
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          updateResult(CalcResult(data));
        } catch (e) {
          console.log(e);
        }
      })}>
      <FormControl>
        <Stack>
          <Grid templateRows='repeat(4, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
            <GridItem bg='blue.100'>
              <Text p='1'>職業</Text>
            </GridItem>
            <GridItem>
              <Select placeholder='未選択' size='sm' {...register('job')}>
                {Object.entries(jobData).map(
                  (job) =>
                    job[0] !== 'Xenon' &&
                    job[0] !== 'DemonAvenger' && (
                      <option key={job[0]} value={job[0]}>
                        {job[1].JMSName}
                      </option>
                    )
                )}
              </Select>
            </GridItem>

            <GridItem bg='blue.100'>
              <Text p='1'>武器</Text>
            </GridItem>
            <GridItem>
              <Select placeholder='未選択' size='sm' {...register('weapon')}>
                {watchJob !== '' &&
                  jobData[watchJob].equippableWeapon.map((weapon) => (
                    <option key={weapon} value={weapon}>
                      {weaponData[weapon].JMSName}
                    </option>
                  ))}
              </Select>
            </GridItem>

            <GridItem bg='blue.100'>
              <Text p='1'>レベル</Text>
            </GridItem>
            <GridItem>
              <Input
                type='number'
                placeholder='275'
                size='sm'
                {...register('playerlevel', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='blue.100'>
              <Text p='1'>最大ステータス攻撃力</Text>
            </GridItem>
            <GridItem>
              <Input
                placeholder='100000000'
                size='sm'
                {...register('statATT', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>
          </Grid>

          <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
            <GridItem bg='blue.100'>
              <HStack>
                <Text p='1'>{watchJob !== '' && jobData[watchJob].mainStats.join('+').concat(' (MH適用)')}</Text>
                <Tooltip label='メイプルヒーロー系スキルを使ったときの値' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='50000'
                size='sm'
                {...register('mainStatsWithMH', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='blue.100'>
              <HStack>
                <Text p='1'>{watchJob !== '' && jobData[watchJob].mainStats.join('+').concat(' (MH未適用)')}</Text>
                <Tooltip label='メイプルヒーロー系スキルを切ったときの値' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='49000'
                size='sm'
                {...register('mainStatsWithoutMH', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='blue.100'>
              <HStack>
                <Text p='1'>{watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' (バフ)')}</Text>
                <Tooltip label='バフを使ってサブステータスを上げた後の値' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='50000'
                size='sm'
                {...register('subStatsWithBuff', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='blue.100'>
              <HStack>
                <Text p='1'>{watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' (素)')}</Text>
                <Tooltip label='素の値' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='49000'
                size='sm'
                {...register('subStatsWithoutBuff', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='blue.100'>
              <HStack>
                <Text p='1'>MHレベル</Text>
                <Tooltip label='メイプルヒーロー系スキルのレベル' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='30'
                size='sm'
                {...register('MHlevel', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>
          </Grid>

          <Grid templateRows='repeat(5, 1fr)' templateColumns='3fr 5fr' rowGap='1'>
            <GridItem bg='green.100'>
              <HStack>
                <Text p='1'>アーケインシンボル増加量</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='13200'
                size='sm'
                {...register('ArcaneSymbolStats', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='green.100'>
              <HStack>
                <Text p='1'>オーセンティックシンボル増加量</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='5000'
                size='sm'
                {...register('AuthenticSymbolStats', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='green.100'>
              <HStack>
                <Text p='1'>ハイパーステータス</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='120'
                size='sm'
                {...register('HyperStats', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='green.100'>
              <HStack>
                <Text p='1'>アビリティ</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='0'
                size='sm'
                {...register('AbilityStats', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='green.100'>
              <HStack>
                <Text p='1'>ユニオン攻撃隊員効果</Text>
                <Tooltip label='攻撃隊占領効果とは異なります。' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='1000'
                size='sm'
                {...register('UnionAttackerStats', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>
          </Grid>

          <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>ダメージ (%)</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='50'
                size='sm'
                {...register('DamagePercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>ボスダメージ (%)</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='450'
                size='sm'
                {...register('BossDamagePercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>最終ダメージ (%)</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='90.40'
                size='sm'
                {...register('FinalDamagePercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>防御率無視 (%)</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='95.00'
                size='sm'
                {...register('IgnoreDEFPercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>クリダメージ (%)</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='90'
                size='sm'
                {...register('CriticalDamagePercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>

            <GridItem bg='red.100'>
              <HStack>
                <Text p='1'>
                  {jobData[watchJob] !== undefined &&
                    (jobData[watchJob].mainStats.includes('INT') ? '魔力' : '攻撃力').concat('% (合計)')}
                </Text>
                <Tooltip label='装備、ファミリア、ファミリアバッジの合計' fontSize='sm'>
                  <QuestionIcon />
                </Tooltip>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='90'
                size='sm'
                {...register('ATTPercent', {
                  valueAsNumber: true,
                })}
              />
            </GridItem>
          </Grid>
          <Button mt={4} colorScheme='teal' type='submit'>
            Submit
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}

export default StatInputForm;
