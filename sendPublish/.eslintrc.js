module.exports = {
    'extends': 'xadillax-style',
    'rules': {
        // enable additional rules
        'indent': ['error', 4],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'ignore'
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'keyword-spacing': [ 'error', {
            before: true,
            after: true,
        }],
        'valid-jsdoc': 'off',
        'prefer-template': 'off'
    }
}
