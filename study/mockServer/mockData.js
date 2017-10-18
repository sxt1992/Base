let Mock = require('mockjs');
let Random = Mock.Random;

module.exports = [
    {
        u: '/tao.json',
        d: () => Mock.mock({
            'str':'fs@constellation 在@CONSTELLATION @pick({a:"56",b:"fd"})',
            'str2': '@datetime("yyyy年MM月dd日 HH时mm分ss秒 SS毫秒") @cword("男女",1)',
            'num1|+1': 12,
            'num2|+2': 12,
            'num3|1': 12,
            'num4|2': 12,
            'num5|200-19': 12,
            'num6|-9--92.10-99': 12,
            'name1|12': ['tao','xue','jiao','zhen','shuai'],
            'name2|2': ['tao','xue','jiao','zhen','shuai'],
            'name3|+1': ['tao','xue','jiao','zhen','shuai'],
            'name4|+2': ['tao','xue','jiao','zhen','shuai']
        })
    },
    {
        u: '/xue.json',
        d: () => Mock.mock({
            "array|1": [
                "AMD",
                "CMD",
                "UMD"
            ]
        })
    }
];
