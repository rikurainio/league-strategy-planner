interface Champion {
    name: string;
    image: string;
    splashImage: string;
}

const champions = {
    '1': 'Annie',
    '2': 'Olaf',
    '3': 'Galio',
    '4': 'Twisted Fate',
    '5': 'Xin Zhao',
    '6': 'Urgot',
    '7': 'LeBlanc',
    '8': 'Vladimir',
    '9': 'Fiddlesticks',
    '10': 'Kayle',
    '11': 'Master Yi',
    '12': 'Alistar',
    '13': 'Ryze',
    '14': 'Sion',
    '15': 'Sivir',
    '16': 'Soraka',
    '17': 'Teemo',
    '18': 'Tristana',
    '19': 'Warwick',
    '20': 'Nunu & Willump',
    '21': 'Miss Fortune',
    '22': 'Ashe',
    '23': 'Tryndamere',
    '24': 'Jax',
    '25': 'Morgana',
    '26': 'Zilean',
    '27': 'Singed',
    '28': 'Evelynn',
    '29': 'Twitch',
    '30': 'Karthus',
    '31': "Cho'Gath",
    '32': 'Amumu',
    '33': 'Rammus',
    '34': 'Anivia',
    '35': 'Shaco',
    '36': 'Dr.Mundo',
    '37': 'Sona',
    '38': 'Kassadin',
    '39': 'Irelia',
    '40': 'Janna',
    '41': 'Gangplank',
    '42': 'Corki',
    '43': 'Karma',
    '44': 'Taric',
    '45': 'Veigar',
    '48': 'Trundle',
    '50': 'Swain',
    '51': 'Caitlyn',
    '53': 'Blitzcrank',
    '54': 'Malphite',
    '55': 'Katarina',
    '56': 'Nocturne',
    '57': 'Maokai',
    '58': 'Renekton',
    '59': 'JarvanIV',
    '60': 'Elise',
    '61': 'Orianna',
    '62': 'Wukong',
    '63': 'Brand',
    '64': 'Lee Sin',
    '67': 'Vayne',
    '68': 'Rumble',
    '69': 'Cassiopeia',
    '72': 'Skarner',
    '74': 'Heimerdinger',
    '75': 'Nasus',
    '76': 'Nidalee',
    '77': 'Udyr',
    '78': 'Poppy',
    '79': 'Gragas',
    '80': 'Pantheon',
    '81': 'Ezreal',
    '82': 'Mordekaiser',
    '83': 'Yorick',
    '84': 'Akali',
    '85': 'Kennen',
    '86': 'Garen',
    '89': 'Leona',
    '90': 'Malzahar',
    '91': 'Talon',
    '92': 'Riven',
    '96': "Kog'Maw",
    '98': 'Shen',
    '99': 'Lux',
    '101': 'Xerath',
    '102': 'Shyvana',
    '103': 'Ahri',
    '104': 'Graves',
    '105': 'Fizz',
    '106': 'Volibear',
    '107': 'Rengar',
    '110': 'Varus',
    '111': 'Nautilus',
    '112': 'Viktor',
    '113': 'Sejuani',
    '114': 'Fiora',
    '115': 'Ziggs',
    '117': 'Lulu',
    '119': 'Draven',
    '120': 'Hecarim',
    '121': "Kha'Zix",
    '122': 'Darius',
    '126': 'Jayce',
    '127': 'Lissandra',
    '131': 'Diana',
    '133': 'Quinn',
    '134': 'Syndra',
    '136': 'Aurelion Sol',
    '141': 'Kayn',
    '142': 'Zoe',
    '143': 'Zyra',
    '145': "Kai'sa",
    '147': "Seraphine",
    '150': 'Gnar',
    '154': 'Zac',
    '157': 'Yasuo',
    '161': "Vel'Koz",
    '163': 'Taliyah',
    '166': "Akshan",
    '164': 'Camille',
    '201': 'Braum',
    '202': 'Jhin',
    '203': 'Kindred',
    '221': 'Zeri',
    '222': 'Jinx',
    '223': 'Tahm Kench',
    '234': 'Viego',
    '235': 'Senna',
    '236': 'Lucian',
    '238': 'Zed',
    '240': 'Kled',
    '245': 'Ekko',
    '246': 'Qiyana',
    '254': 'Vi',
    '266': 'Aatrox',
    '267': 'Nami',
    '268': 'Azir',
    '350': 'Yuumi',
    '360': 'Samira',
    '412': 'Thresh',
    '420': 'Illaoi',
    '421': "Rek'Sai",
    '427': 'Ivern',
    '429': 'Kalista',
    '432': 'Bard',
    '497': 'Rakan',
    '498': 'Xayah',
    '516': 'Ornn',
    '517': 'Sylas',
    '526': 'Rell',
    '518': 'Neeko',
    '523': 'Aphelios',
    '555': 'Pyke',
    '875': "Sett",
    '711': "Vex",
    '777': "Yone",
    '887': "Gwen",
    '876': "Lillia",
    '888': 'Renata Glasc'
}

const removeQuotationMark = (name: string): string => {
    return name.replace(/'/g, '')
}

const removeDot = (name: string): string => {
    return name.replace(/\./g, '')
}

const removeSpace = (name: string): string => {
    return name.replace(/ /g, '')
}

const getAllChampions = (): Champion[] => {
    const allChampions: Champion[] = [];

    let championKey: keyof typeof champions;
    for(championKey in champions){
        const champion: Champion = getChampionById(championKey)
        allChampions.push(champion)
    }

    return allChampions
}

const getChampionById = (id: string): Champion => {
    type ObjectKey = keyof typeof champions
    const championKey = id as ObjectKey
    const championName: string = champions[championKey]
    let tempName: string = championName;

    // NAMING INCONSISTENCIES FIX TO FIND DATA FROM CDN
    if(tempName === 'Nunu & Willump'){
        tempName = 'Nunu'
    }
    if(tempName === 'Vel\'Koz'){
        tempName = 'Velkoz'
    }
    if(tempName === 'Kha\'Zix'){
        tempName = 'Khazix'
    }
    if(tempName === 'Kog\'Maw'){
        tempName = 'KogMaw'
    }
    if(tempName === 'Cho\'Gath'){
        tempName = 'Chogath'
    }
    if(tempName === 'Wukong'){
        tempName = 'MonkeyKing'
    }
    if(tempName === 'LeBlanc'){
        tempName = 'Leblanc'
    }
    if(tempName === 'Renata Glasc'){
        tempName= 'Renata'
    }
    else{
        tempName = removeQuotationMark(tempName)
        tempName = removeDot(tempName)
        tempName = removeSpace(tempName)
    }

    const patch: string = '12.10.1'
    const communityDragonPatch: string = '12.6.1'
    const cdnImage: string = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${tempName}.png`
    const cdnSplash: string = `https://cdn.communitydragon.org/${communityDragonPatch}/champion/${tempName}/splash-art/centered`
    const cdnDDSplash: string = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${tempName}_0.jpg`

    const champion: Champion = {
        name: championName, 
        image: cdnImage,
        splashImage: cdnDDSplash
    }
    return champion;
}

export { getChampionById, getAllChampions, type Champion }