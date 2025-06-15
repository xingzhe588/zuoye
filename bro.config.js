const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "artcollab.main": "/artcollab",
    "artcollab.collection": "/artcollab/collection",
    "artcollab.create-nft": "/artcollab/create-nft",
    "artcollab.contact": "/artcollab/contact",
    "artcollab.detail-kaban": "/artcollab/detail-kaban",
    "artcollab.detail-monkey": "/artcollab/detail-monkey",
    "artcollab.detail-hero": "/artcollab/detail-hero",
  },
  features: {
    "artcollab": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "artcollab.api": "http://localhost:8000",
  },
};
