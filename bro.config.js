const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  // navigations: {
  //   "artcollab.main": "/sportsart",
  //   "artcollab.collection": "/sportsart/collection",
  //   "artcollab.create-nft": "/sportsart/create-artwork",
  //   "artcollab.contact": "/sportsart/contact",
  //   "artcollab.detail-kaban": "/sportsart/detail-football",
  //   "artcollab.detail-monkey": "/sportsart/detail-basketball",
  //   "artcollab.detail-hero": "/sportsart/detail-tennis",
  //   "artcollab.buy": "/sportsart/buy",
  //   "artcollab.bid": "/sportsart/bid",
  // },
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
