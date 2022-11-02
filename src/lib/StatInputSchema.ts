import * as yup from 'yup';
import { InputStats } from '../data/statstype';

const StatInputSchema: yup.SchemaOf<InputStats> = yup.object({
  job: yup.string().required(),
  weapon: yup.string().required(),
  playerLevel: yup
    .number()
    .required()
    .min(200, '200以上300以下でなければいけません')
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
    .min(1, '1以上30以下でなければいけません')
    .max(30, '1から30以下でなければいけません')
    .integer(),
  ArcaneSymbolStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  AuthenticSymbolStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  HyperStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  AbilityStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  UnionAttackerStats: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  DamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  BossDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください').integer(),
  FinalDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  IgnoreDEFPercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  CriticalDamagePercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  ATTPercent: yup.number().required().min(0, '値が負です').typeError('整数を入力してください'),
  kannaHP: yup.number().min(0, '値が負です').typeError('整数を入力してください').integer(),
});

export default StatInputSchema;
