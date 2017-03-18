module.exports = {
    "extends": "airbnb-base",
    "env": {
      browser: true
    },
    "plugins": [
        "import"
    ],
    "rules": {
      "space-before-function-paren" : [2, "always"],
      "func-names"                  : 0,
      'no-param-reassign'           : 0,
      "consistent-return"           : 1,
      "no-plusplus"                 : 0,
      "quotes"                      : [2, "single"],
      'class-methods-use-this'      : 0,
    }
};
