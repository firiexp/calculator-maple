import { InputStats, OutputStats } from '../data/statstype';
import jobData from '../data/jobdata';
import weaponData from '../data/weapondata';

function CalcOutputStats(player: InputStats): OutputStats {
  const pureStats = player.playerLevel * 5 + 18;
  const combinedStats = player.mainStatsWithMH * 4 + player.subStatsWithoutBuff;
  const MHAmount = Math.floor(pureStats * (player.MHLevel / 200));
  const fixedMainStats =
    player.ARCMainStats + player.AUTMainStats + player.hyperMainStats + player.abilityMainStats + player.unionMainStats;
  const unfixedMainStats = player.mainStatsWithoutMH - fixedMainStats;

  const calcStatATT = (ATT: number) => {
    const innerATT = Math.round((weaponData[player.weapon].weaponMultiplier * combinedStats * ATT) / 100);
    return Math.floor(innerATT * (1 + player.DamagePercent / 100) * (1 + player.FinalDamagePercent / 100));
  };

  // 攻撃力を二分探索で求める
  const buffedATT = (() => {
    let ok = 0;
    let ng = 1;
    while (calcStatATT(ng) <= player.statATT) ng *= 2;
    while (ng - ok > 1) {
      const mid = Math.floor((ok + ng) / 2);
      // console.log([mid, calcStatATT(mid)]);
      if (calcStatATT(mid) <= player.statATT) ok = mid;
      else ng = mid;
    }
    return ok;
  })();

  // ステータス%がかかる対象のステータスと、ステータス%の近似値を求め、その周辺を探索し真の値を求める
  const determineMainStatsStructure = (): [number, number] => {
    const deltaMainStats = player.mainStatsWithMH - player.mainStatsWithoutMH;

    const approxPercent = Math.floor(100 * (deltaMainStats / ((pureStats * player.MHLevel) / 2 / 100) - 1));
    for (let Percent = approxPercent - 1; Percent <= approxPercent + 2; Percent++) {
      const approxValue = Math.floor(unfixedMainStats / (1 + Percent / 100));
      for (let buffableMainStats = approxValue - 1; buffableMainStats <= approxValue + 2; buffableMainStats++) {
        if (
          Math.floor(buffableMainStats * (1 + Percent / 100) + fixedMainStats) === player.mainStatsWithoutMH &&
          Math.floor((buffableMainStats + MHAmount) * (1 + Percent / 100) + fixedMainStats) === player.mainStatsWithMH
        ) {
          return [Percent, buffableMainStats];
        }
      }
    }
    return [NaN, NaN];
  };

  const [mainStatsPercent, buffableMainStats] = determineMainStatsStructure();
  const subStatsPercent = Math.ceil(
    100 * ((player.subStatsWithBuff - player.subStatsWithoutBuff) / player.subStatsBuffAmount - 1)
  );
  const baseATT = Math.ceil(
    (buffedATT - (player.kannaHP ? Math.floor(player.kannaHP / 700) : 0)) /
      (1 + (player.ATTPercent + jobData[player.job].skillATTPercent) / 100)
  );

  return {
    ...player,
    mainStatsPercent,
    subStatsPercent,
    baseATT,
    buffableMainStats,
    fixedMainStats,
  };
}

export default CalcOutputStats;
