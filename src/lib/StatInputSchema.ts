import * as yup from 'yup';
import { InputStats } from '../data/statstype';

const StatInputSchema: yup.SchemaOf<InputStats> = yup.object({
  job: yup.string().required(),
  weapon: yup.string().required(),
  playerLevel: yup
    .number()
    .required()
    .min(200, '200以上300以下の整数を入力してください')
    .max(300, '200以上300以下でなければいけません')
    .typeError('整数を入力してください')
    .integer(),
  statATT: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  mainStatsWithMH: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  mainStatsWithoutMH: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  subStatsWithBuff: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  subStatsWithoutBuff: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  subStatsBuffAmount: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  MHLevel: yup
    .number()
    .required()
    .min(1, '1以上30以下の整数を入力してください')
    .max(30, '1から30以下の整数を入力してください')
    .typeError('1以上30以下の整数を入力してください')
    .integer(),
  ARCMainStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  AUTMainStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  hyperMainStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  abilityMainStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  unionMainStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  hyperSubStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  abilitySubStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  unionSubStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  DamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  BossDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  FinalDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  IgnoreDEFPercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  CriticalDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  ATTPercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  kannaHP: yup.number().min(0, '値が負です').typeError('整数を入力してください').integer(),
});

export default StatInputSchema;
