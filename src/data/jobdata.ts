type Stats = 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP';

type IndivisualWeaponData = {
    JMSName: string;
    weaponMultiplier: number;
};

const WeaponData: Record<string, IndivisualWeaponData> = {
    wand: {
        JMSName: '杖 (ワンド)',
        weaponMultiplier: 1.2,
    },
    staff: {
        JMSName: '棒 (スタッフ)',
        weaponMultiplier: 1.2,
    },
    shiningRod: {
        JMSName: 'シャイニングロッド',
        weaponMultiplier: 1.2,
    },
    psyLimiter: {
        JMSName: 'ESPリミッター',
        weaponMultiplier: 1.2,
    },
    magicGauntlet: {
        JMSName: 'マジックガントレット',
        weaponMultiplier: 1.2,
    },
    OHBluntWeapon: {
        JMSName: '片手鈍器',
        weaponMultiplier: 1.2,
    },
    OHAxe: {
        JMSName: '片手斧',
        weaponMultiplier: 1.2,
    },
    OHSword: {
        JMSName: '片手剣',
        weaponMultiplier: 1.24,
    },
    katana: {
        JMSName: '刀',
        weaponMultiplier: 1.25,
    },
    bow: {
        JMSName: '弓',
        weaponMultiplier: 1.3,
    },
    dagger: {
        JMSName: '短剣',
        weaponMultiplier: 1.3,
    },
    dualBowgun: {
        JMSName: 'デュアルボウガン',
        weaponMultiplier: 1.3,
    },
    cane: {
        JMSName: 'ケイン',
        weaponMultiplier: 1.3,
    },
    desperado: {
        JMSName: 'デスペラード',
        weaponMultiplier: 1.3,
    },
    chain: {
        JMSName: 'チェーン',
        weaponMultiplier: 1.3,
    },
    ancientBow: {
        JMSName: 'エンシェントボウ',
        weaponMultiplier: 1.3,
    },
    buchae: {
        JMSName: '術扇',
        weaponMultiplier: 1.3,
    },
    tuner: {
        JMSName: 'チューナー',
        weaponMultiplier: 1.3,
    },
    breathShooter: {
        JMSName: 'ブレスシューター',
        weaponMultiplier: 1.3,
    },
    energySword: {
        JMSName: 'エナジーソード',
        weaponMultiplier: 1.3125,
    },
    THBW: {
        JMSName: '両手鈍器',
        weaponMultiplier: 1.34,
    },
    zeroAlpha: {
        JMSName: '太刀 (アルファ)',
        weaponMultiplier: 1.34,
    },
    tamerStick: {
        JMSName: 'テイマースティック',
        weaponMultiplier: 1.34,
    },
    THSword: {
        JMSName: '両手剣',
        weaponMultiplier: 1.34,
    },
    THAxe: {
        JMSName: '両手斧',
        weaponMultiplier: 1.34,
    },
    crossBow: {
        JMSName: 'クロスボウ (弩)',
        weaponMultiplier: 1.34,
    },
    fan: {
        JMSName: '扇',
        weaponMultiplier: 1.35,
    },
    spear: {
        JMSName: '槍',
        weaponMultiplier: 1.49,
    },
    polearm: {
        JMSName: '鉾',
        weaponMultiplier: 1.49,
    },
    zeroBeta: {
        JMSName: '大剣 (ベータ)',
        weaponMultiplier: 1.49,
    },
    gun: {
        JMSName: '銃',
        weaponMultiplier: 1.5,
    },
    cannon: {
        JMSName: 'ハンドキャノン',
        weaponMultiplier: 1.5,
    },
    knuckle: {
        JMSName: 'ナックル',
        weaponMultiplier: 1.7,
    },
    soulShooter: {
        JMSName: 'ソウルシューター',
        weaponMultiplier: 1.7,
    },
    revolver: {
        JMSName: 'ガントレットリボルバー',
        weaponMultiplier: 1.7,
    },
    claw: {
        JMSName: '籠手',
        weaponMultiplier: 1.75,
    },
};

type Job = {
    name: string;
    mainStats: Stats[];
    subStats: Stats[];
    equippableWeapon: string[];
    weaponMultiplierBoost: number;
};

export const jobdata: Job[] = [];
export default jobdata;
