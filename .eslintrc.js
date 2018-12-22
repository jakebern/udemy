//https://medium.com/the-react-native-log/getting-eslint-right-in-react-native-bd27524cc77b
module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        // overrides
    }
};