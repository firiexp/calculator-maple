import {
  Button,
  Center,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';
import { QuestionIcon } from '@chakra-ui/icons';
import jobData from '../data/jobdata';
import weaponData from '../data/weapondata';
import { InputStats, OutputStats } from '../data/statstype';
import CalcOutputStats from '../lib/CalcOutputStats';

type Props = {
  updateResult: (stats: OutputStats) => void;
};

function StatInputForm({ updateResult }: Props) {
  const { register, control, handleSubmit, getValues, reset } = useForm<InputStats>({});
  const watchJob = useWatch({
    control,
    name: 'job',
    defaultValue: '',
  });

  const debugSaveJson = (data: InputStats) => {
    const fileName = 'statcalculator.json';

    const json = JSON.stringify(data, null, '  ');

    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const debugLoadJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (f) => {
        const text = f.target?.result;
        if (typeof text !== 'string') return;
        const data = JSON.parse(text);
        reset(data);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          updateResult(CalcOutputStats(data));
        } catch (e) {
          console.error(e);
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
                {...register('playerLevel', {
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

          <Grid templateRows='repeat(6, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
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
                {...register('MHLevel', {
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
                <Text p='1'>{watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' バフ量')}</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Input
                placeholder='10'
                size='sm'
                {...register('subStatsBuffAmount', {
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
                <Tooltip
                  label={`装備、ファミリア、ファミリアバッジ${watchJob === 'Hayato' ? '、剣気バフ' : ''}の合計`}
                  fontSize='sm'>
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
          <Center>
            <Button colorScheme='teal' onClick={() => debugSaveJson(getValues())}>
              保存
            </Button>
            <Button ml='1' colorScheme='teal' onClick={() => debugLoadJson()}>
              復元
            </Button>
          </Center>
          <Button mt={4} colorScheme='teal' type='submit'>
            計算
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
}

export default StatInputForm;
