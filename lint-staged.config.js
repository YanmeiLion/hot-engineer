
// eslint-disable-next-line no-undef
module.exports = {
  "src/**/*.{js,ts,vue}": [
    "eslint --fix --ext .js,.ts,.vue",
    "prettier --write",
  ],
};
