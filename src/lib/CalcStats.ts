import { InputStats, OutputStats } from '../data/formtype';
import weaponData from '../data/weapondata';

function CalcStats(player: InputStats): OutputStats {
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
}

export default CalcStats;
