import { Button, Center, Grid, GridItem, Select, Stack, Text } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import jobData from '../data/jobdata';
import weaponData from '../data/weapondata';
import { InputStats, OutputStats } from '../data/statstype';
import CalcOutputStats from '../lib/CalcOutputStats';
import RhfStatInput from './RhfStatInput';
import StatInputSchema from '../lib/StatInputSchema';

type Props = {
  updateResult: (stats: OutputStats) => void;
};

function StatInputForm({ updateResult }: Props) {
  const { register, control, handleSubmit, getValues, reset, formState } = useForm<InputStats>({
    resolver: yupResolver(StatInputSchema),
  });
  const watchJob = useWatch({
    control,
    name: 'job',
    defaultValue: '',
  });

  const watchWeapon = useWatch({
    control,
    name: 'weapon',
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
  const jobandweaponform = (
    <Grid templateRows='repeat(2, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
      <GridItem bg='blue.100'>
        <Text p='1'>職業</Text>
      </GridItem>
      <GridItem>
        <Select
          placeholder='未選択'
          size='sm'
          isInvalid={formState.errors.job !== undefined}
          {...register('job', {
            required: true,
          })}>
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
        <Select
          placeholder='未選択'
          size='sm'
          isInvalid={formState.errors.weapon !== undefined}
          {...register('weapon', { required: true })}>
          {watchJob !== '' &&
            jobData[watchJob].equippableWeapon.map((weapon) => (
              <option key={weapon} value={weapon}>
                {weaponData[weapon].JMSName}
              </option>
            ))}
        </Select>
      </GridItem>
    </Grid>
  );

  const otherform = (
    <Stack>
      <Grid templateColumns='1fr 3fr' rowGap='1'>
        <RhfStatInput
          stat='playerLevel'
          label='レベル'
          placeholder='275'
          register={register}
          formState={formState}
          bg='blue.100'
        />

        <RhfStatInput
          stat='statATT'
          label='最大ステータス攻撃力'
          placeholder='100000000'
          register={register}
          formState={formState}
          bg='blue.100'
        />
      </Grid>

      <Grid templateRows='repeat(6, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
        <RhfStatInput
          stat='mainStatsWithMH'
          label={watchJob !== '' && jobData[watchJob].mainStats.join('+').concat(' (MH適用)')}
          placeholder='50000'
          register={register}
          formState={formState}
          tooltipMessage='メイプルヒーロー系スキルを使ったときの値'
          bg='blue.100'
        />

        <RhfStatInput
          stat='mainStatsWithoutMH'
          label={watchJob !== '' && jobData[watchJob].mainStats.join('+').concat(' (MH未適用)')}
          placeholder='49000'
          register={register}
          formState={formState}
          tooltipMessage='メイプルヒーロー系スキルを切ったときの値'
          bg='blue.100'
        />

        <RhfStatInput
          stat='MHLevel'
          label='MHレベル'
          placeholder='30'
          register={register}
          formState={formState}
          tooltipMessage='メイプルヒーロー系スキルのレベル'
          bg='blue.100'
        />

        <RhfStatInput
          stat='subStatsWithBuff'
          label={watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' (バフ適用)')}
          placeholder='4000'
          register={register}
          formState={formState}
          tooltipMessage='バフを使ってサブステータスを上げた後の値'
          bg='blue.100'
        />

        <RhfStatInput
          stat='subStatsWithoutBuff'
          label={watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' (素)')}
          placeholder='3900'
          register={register}
          formState={formState}
          bg='blue.100'
        />

        <RhfStatInput
          stat='subStatsBuffAmount'
          label={watchJob !== '' && jobData[watchJob].subStats.join('+').concat(' バフ量')}
          placeholder='100'
          register={register}
          formState={formState}
          bg='blue.100'
        />
      </Grid>

      <Grid templateRows='repeat(5, 1fr)' templateColumns='3fr 5fr' rowGap='1'>
        <RhfStatInput
          stat='ArcaneSymbolStats'
          label='アーケインシンボル増加量'
          placeholder='13200'
          register={register}
          formState={formState}
          bg='green.100'
        />

        <RhfStatInput
          stat='AuthenticSymbolStats'
          label='オーセンティックシンボル増加量'
          placeholder='5000'
          register={register}
          formState={formState}
          bg='green.100'
        />

        <RhfStatInput
          stat='HyperStats'
          label={watchJob !== '' && 'ハイパーステータス '.concat(jobData[watchJob].mainStats.join('+'))}
          placeholder='5000'
          register={register}
          formState={formState}
          bg='green.100'
        />

        <RhfStatInput
          stat='AbilityStats'
          label={watchJob !== '' && 'アビリティ '.concat(jobData[watchJob].mainStats.join('+'))}
          placeholder='5000'
          register={register}
          formState={formState}
          bg='green.100'
        />

        <RhfStatInput
          stat='UnionAttackerStats'
          label={watchJob !== '' && 'ユニオン攻撃隊員効果 '.concat(jobData[watchJob].mainStats.join('+'))}
          placeholder='1000'
          register={register}
          formState={formState}
          tooltipMessage='攻撃隊占領効果とは異なります。'
          bg='green.100'
        />
      </Grid>

      <Grid templateRows='repeat(5, 1fr)' templateColumns='1fr 3fr' rowGap='1'>
        <RhfStatInput
          stat='DamagePercent'
          label='ダメージ (%)'
          placeholder='50'
          register={register}
          formState={formState}
          bg='red.100'
        />

        <RhfStatInput
          stat='BossDamagePercent'
          label='ボスダメージ (%)'
          placeholder='450'
          register={register}
          formState={formState}
          bg='red.100'
        />

        <RhfStatInput
          stat='FinalDamagePercent'
          label='最終ダメージ (%)'
          placeholder='90.40'
          register={register}
          formState={formState}
          bg='red.100'
        />

        <RhfStatInput
          stat='IgnoreDEFPercent'
          label='防御率無視 (%)'
          placeholder='90.40'
          register={register}
          formState={formState}
          bg='red.100'
        />

        <RhfStatInput
          stat='CriticalDamagePercent'
          label='クリダメージ (%)'
          placeholder='89.00'
          register={register}
          formState={formState}
          bg='red.100'
        />

        <RhfStatInput
          stat='ATTPercent'
          label={
            jobData[watchJob] !== undefined &&
            (jobData[watchJob].mainStats.includes('INT') ? '魔力' : '攻撃力').concat('% (合計)')
          }
          placeholder='90'
          register={register}
          formState={formState}
          bg='red.100'
          tooltipMessage={`装備、ファミリア、ファミリアバッジ${watchJob === 'Hayato' ? '、剣気バフ' : ''}の合計`}
        />
      </Grid>
    </Stack>
  );
  return (
    <form
      onSubmit={handleSubmit((data) => {
        try {
          updateResult(CalcOutputStats(data));
        } catch (e) {
          console.error(e);
        }
      })}>
      <Stack>
        {jobandweaponform}
        {watchWeapon !== '' && otherform}
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
    </form>
  );
}

export default StatInputForm;
