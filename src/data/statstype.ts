export type InputStats = {
  job: string;
  weapon: string;
  playerLevel: number;
  statATT: number;
  mainStatsWithMH: number;
  mainStatsWithoutMH: number;
  subStatsWithBuff: number;
  subStatsWithoutBuff: number;
  subStatsBuffAmount: number;
  MHLevel: number;
  ARCMainStats: number;
  AUTMainStats: number;
  hyperMainStats: number;
  abilityMainStats: number;
  unionMainStats: number;
  DamagePercent: number;
  BossDamagePercent: number;
  FinalDamagePercent: number;
  IgnoreDEFPercent: number;
  CriticalDamagePercent: number;
  ATTPercent: number;
  kannaHP?: number;
};

export type OutputStats = InputStats & {
  mainStatsPercent: number;
  subStatsPercent: number;
  baseATT: number;
  buffableMainStats: number;
  fixedMainStats: number;
};
