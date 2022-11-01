import * as yup from 'yup';
import { InputStats } from '../data/statstype';

export const StatInputSchema: yup.SchemaOf<InputStats> = yup.object({
  job: yup.string().required(),
  weapon: yup.string().required(),
  playerLevel: yup
    .number()
    .required()
    .min(200, '200以上300以下でなければいけません')
    .max(300, '200以上300以下でなければいけません')
    .integer(),
  statATT: yup.number().required().min(0, '値が負です').integer(),
  mainStatsWithMH: yup.number().required().min(0, '値が負です').integer(),
  mainStatsWithoutMH: yup.number().required().min(0, '値が負です').integer(),
  subStatsWithBuff: yup.number().required().min(0, '値が負です').integer(),
  subStatsWithoutBuff: yup.number().required().min(0, '値が負です').integer(),
  subStatsBuffAmount: yup.number().required().min(0, '値が負です').integer(),
  MHLevel: yup
    .number()
    .required()
    .min(1, '1以上30以下でなければいけません')
    .max(30, '1から30以下でなければいけません')
    .integer(),
  ArcaneSymbolStats: yup.number().required().min(0, '値が負です').integer(),
  AuthenticSymbolStats: yup.number().required().min(0, '値が負です').integer(),
  HyperStats: yup.number().required().min(0, '値が負です').integer(),
  AbilityStats: yup.number().required().min(0, '値が負です').integer(),
  UnionAttackerStats: yup.number().required().min(0, '値が負です').integer(),
  DamagePercent: yup.number().required().min(0, '値が負です').integer(),
  BossDamagePercent: yup.number().required().min(0, '値が負です').integer(),
  FinalDamagePercent: yup.number().required().min(0, '値が負です'),
  IgnoreDEFPercent: yup.number().required().min(0, '値が負です'),
  CriticalDamagePercent: yup.number().required().min(0, '値が負です'),
  ATTPercent: yup.number().required().min(0, '値が負です'),
  kannaHP: yup.number().min(0, '値が負です').integer(),
});

export default StatInputSchema;
