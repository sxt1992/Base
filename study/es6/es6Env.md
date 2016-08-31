### install environment
  `npm install -g babel`
  `npm install -g babel-cli`
#### ES2015转码规则
  `npm install --save-dev babel-preset-es2015`

#### react转码规则
  `npm install --save-dev babel-preset-react`

#### ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
  `npm install --save-dev babel-preset-stage-0`
  `npm install --save-dev babel-preset-stage-1`
  `npm install --save-dev babel-preset-stage-2`
  `npm install --save-dev babel-preset-stage-3`

配置.babelrc文件
`{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }`
改写package.json。
{
	"devDependencies": {
		"babel-cli": "^6.0.0"
	},
	"scripts": {
		"build": "babel src -d lib"
	}
}
转码 的时候，执行下面的命令。
  `npm run build`
运行 的时候，执行下面的命令。
  `babel-node --harmony xx.js`