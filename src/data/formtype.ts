export type InputStats = {
  job: string;
  weapon: string;
  playerlevel: number;
  statATT: number;
  mainStatsWithMH: number;
  mainStatsWithoutMH: number;
  subStatsWithBuff: number;
  subStatsWithoutBuff: number;
  subStatsBuffAmount: number;
  MHlevel: number;
  ArcaneSymbolStats: number;
  AuthenticSymbolStats: number;
  HyperStats: number;
  AbilityStats: number;
  UnionAttackerStats: number;
  DamagePercent: number;
  BossDamagePercent: number;
  FinalDamagePercent: number;
  IgnoreDEFPercent: number;
  CriticalDamagePercent: number;
  ATTPercent: number;
};

export type OutputStats = {
  mainStatsPercent: number;
  subStatsPercent: number;
  OverAllAttackPower: number;
};
