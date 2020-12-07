module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    // "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": ["error", 2],
    "semi": 2,
    "no-trailing-spaces": 1,
    "no-irregular-whitespace": 0,
    "comma-spacing": [2, {'before': false, 'after': true}],
    "no-spaced-func": 2,
    "no-unused-vars": 0,
  }
};
