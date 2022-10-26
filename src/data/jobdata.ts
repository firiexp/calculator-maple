type Stats = 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP';

type IndivisualWeaponData = {
    JMSName: string;
    weaponMultiplier: number;
};

const WeaponData: { [k: string]: IndivisualWeaponData } = {
    Wand: {
        JMSName: '杖 (ワンド)',
        weaponMultiplier: 1.2,
    },
    Staff: {
        JMSName: '棒 (スタッフ)',
        weaponMultiplier: 1.2,
    },
    ShiningRod: {
        JMSName: 'シャイニングロッド',
        weaponMultiplier: 1.2,
    },
    PsyLimiter: {
        JMSName: 'ESPリミッター',
        weaponMultiplier: 1.2,
    },
    MagicGauntlet: {
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
    Katana: {
        JMSName: '刀',
        weaponMultiplier: 1.25,
    },
    Bow: {
        JMSName: '弓',
        weaponMultiplier: 1.3,
    },
    Dagger: {
        JMSName: '短剣',
        weaponMultiplier: 1.3,
    },
    DualBowgun: {
        JMSName: 'デュアルボウガン',
        weaponMultiplier: 1.3,
    },
    Cane: {
        JMSName: 'ケイン',
        weaponMultiplier: 1.3,
    },
    Desperado: {
        JMSName: 'デスペラード',
        weaponMultiplier: 1.3,
    },
    Chain: {
        JMSName: 'チェーン',
        weaponMultiplier: 1.3,
    },
    AncientBow: {
        JMSName: 'エンシェントボウ',
        weaponMultiplier: 1.3,
    },
    RitualFan: {
        JMSName: '術扇',
        weaponMultiplier: 1.3,
    },
    Tuner: {
        JMSName: 'チューナー',
        weaponMultiplier: 1.3,
    },
    BreathShooter: {
        JMSName: 'ブレスシューター',
        weaponMultiplier: 1.3,
    },
    EnergySword: {
        JMSName: 'エナジーソード',
        weaponMultiplier: 1.3125,
    },
    THBW: {
        JMSName: '両手鈍器',
        weaponMultiplier: 1.34,
    },
    ZeroAlpha: {
        JMSName: '太刀 (アルファ)',
        weaponMultiplier: 1.34,
    },
    TamerStick: {
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
    CrossBow: {
        JMSName: 'クロスボウ (弩)',
        weaponMultiplier: 1.34,
    },
    Fan: {
        JMSName: '扇',
        weaponMultiplier: 1.35,
    },
    Spear: {
        JMSName: '槍',
        weaponMultiplier: 1.49,
    },
    Polearm: {
        JMSName: '鉾',
        weaponMultiplier: 1.49,
    },
    ZeroBeta: {
        JMSName: '大剣 (ベータ)',
        weaponMultiplier: 1.49,
    },
    Gun: {
        JMSName: '銃',
        weaponMultiplier: 1.5,
    },
    Cannon: {
        JMSName: 'ハンドキャノン',
        weaponMultiplier: 1.5,
    },
    Knuckle: {
        JMSName: 'ナックル',
        weaponMultiplier: 1.7,
    },
    SoulShooter: {
        JMSName: 'ソウルシューター',
        weaponMultiplier: 1.7,
    },
    Revolver: {
        JMSName: 'ガントレットリボルバー',
        weaponMultiplier: 1.7,
    },
    Claw: {
        JMSName: '籠手',
        weaponMultiplier: 1.75,
    },
};

type Job = {
    JMSName: string;
    mainStats: Stats[];
    subStats: Stats[];
    equippableWeapon: string[];
};

export const jobdata: { [k: string]: Job } = {
    Hero: {
        JMSName: 'ヒーロー',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['OHAxe', 'OHSword', 'THAxe', 'THSword'],
    },
    Paladin: {
        JMSName: 'パラディン',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['OHBW', 'OHSword', 'THBW', 'THSword'],
    },
    DarkKnight: {
        JMSName: 'ダークナイト',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Spear', 'Polearm'],
    },
    ArchMageFP: {
        JMSName: 'アークメイジ (火、毒)',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Wand', 'Staff'],
    },
    ArchMageIL: {
        JMSName: 'アークメイジ (雷、氷)',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Wand', 'Staff'],
    },
    Bishop: {
        JMSName: 'ビショップ',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Wand', 'Staff'],
    },
    Bowmaster: {
        JMSName: 'ボウマスター',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['Bow'],
    },
    Marksman: {
        JMSName: 'クロスボウマスター',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['CrossBow'],
    },
    Pathfinder: {
        JMSName: 'パスファインダー',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['AncientBow'],
    },
    NightLord: {
        JMSName: 'ナイトロード',
        mainStats: ['LUK'],
        subStats: ['DEX'],
        equippableWeapon: ['Claw'],
    },
    Shadower: {
        JMSName: 'シャドー',
        mainStats: ['LUK'],
        subStats: ['STR', 'DEX'],
        equippableWeapon: ['Dagger'],
    },
    DualBlade: {
        JMSName: 'デュアルブレイド',
        mainStats: ['LUK'],
        subStats: ['STR', 'DEX'],
        equippableWeapon: ['Dagger'],
    },
    Buccaneer: {
        JMSName: 'バイパー',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Knuckle'],
    },
    Corsair: {
        JMSName: 'キャプテン',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['Gun'],
    },
    Cannoneer: {
        JMSName: 'キャノンマスター',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Cannon'],
    },
    Jett: {
        JMSName: 'ジェット',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['Gun'],
    },
    DawnWarrior: {
        JMSName: 'ソウルマスター',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['OHSword', 'THSword'],
    },
    BlazeWizard: {
        JMSName: 'フレイムウィザード',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Staff', 'Wand'],
    },
    WindArcher: {
        JMSName: 'ウィンドシューター',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['Bow'],
    },
    NightWalker: {
        JMSName: 'ナイトウォーカー',
        mainStats: ['LUK'],
        subStats: ['DEX'],
        equippableWeapon: ['Claw'],
    },
    ThunderBreaker: {
        JMSName: 'ストライカー',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Knuckle'],
    },
    Mihile: {
        JMSName: 'ミハエル',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['OHSword'],
    },
    Aran: {
        JMSName: 'アラン',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Polearm'],
    },
    Evan: {
        JMSName: 'エヴァン',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Staff', 'Wand'],
    },
    Mercedes: {
        JMSName: 'メルセデス',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['DualBowgun'],
    },
    Phantom: {
        JMSName: 'ファントム',
        mainStats: ['LUK'],
        subStats: ['DEX'],
        equippableWeapon: ['Cane'],
    },
    Luminous: {
        JMSName: 'ルミナス',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['ShiningRod'],
    },
    Shade: {
        JMSName: '隠月',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Knuckle'],
    },
    Blaster: {
        JMSName: 'ブラスター',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Revolver'],
    },
    DemonSlayer: {
        JMSName: 'デーモンスレイヤー',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['OHAxe', 'OHBW'],
    },
    DemonAvenger: {
        JMSName: 'デーモンアヴェンジャー',
        mainStats: ['HP'],
        subStats: ['STR'],
        equippableWeapon: ['Desperado'],
    },
    BattleMage: {
        JMSName: 'バトルメイジ',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Staff'],
    },
    WildHunter: {
        JMSName: 'ワイルドハンター',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['CrossBow'],
    },
    Mechanic: {
        JMSName: 'メカニック',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['Gun'],
    },
    Xenon: {
        JMSName: 'ゼノン',
        mainStats: ['STR', 'DEX', 'LUK'],
        subStats: [],
        equippableWeapon: ['EnergySword'],
    },
    Kaiser: {
        JMSName: 'カイザー',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['THSword'],
    },
    AngelicBuster: {
        JMSName: 'エンジェリックバスター',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['SoulShooter'],
    },
    Cadena: {
        JMSName: 'カデナ',
        mainStats: ['LUK'],
        subStats: ['DEX', 'STR'],
        equippableWeapon: ['Chain'],
    },
    Kain: {
        JMSName: 'カイン',
        mainStats: ['DEX'],
        subStats: ['STR'],
        equippableWeapon: ['BreathShooter'],
    },
    Adele: {
        JMSName: 'アデル',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Tuner'],
    },
    Ark: {
        JMSName: 'アーク',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Knuckle'],
    },
    Illium: {
        JMSName: 'イリウム',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['MagicGauntlet'],
    },
    Hoyoung: {
        JMSName: '虎影',
        mainStats: ['LUK'],
        subStats: ['DEX'],
        equippableWeapon: ['RitualFan'],
    },
    Lara: {
        JMSName: 'ララ',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Wand'],
    },
    Zero: {
        JMSName: 'ゼロ',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['ZeroAlpha', 'ZeroBeta'],
    },
    Kinesis: {
        JMSName: 'キネシス',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['PsyLimiter'],
    },
    Hayato: {
        JMSName: 'ハヤト',
        mainStats: ['STR'],
        subStats: ['DEX'],
        equippableWeapon: ['Katana'],
    },
    Kanna: {
        JMSName: 'カンナ',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['Fan'],
    },
    BeastTamer: {
        JMSName: 'ビーストテイマー',
        mainStats: ['INT'],
        subStats: ['LUK'],
        equippableWeapon: ['TamerStick'],
    },
};

export default jobdata;
