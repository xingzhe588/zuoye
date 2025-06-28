const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  navigations: {
    "project-monday.main": "/project-monday",
    "project-monday.collection": "/project-monday/collection",
    "project-monday.create-nft": "/project-monday/create-nft",
    "project-monday.contact": "/project-monday/contact",
    "project-monday.detail-kaban": "/project-monday/detail-kaban",
    "project-monday.detail-monkey": "/project-monday/detail-monkey",
    "project-monday.detail-hero": "/project-monday/detail-hero",
    "project-monday.auth": "/project-monday/auth",
    "project-monday.user-center": "/project-monday/user-center",
  },
  features: {
    "project-monday": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "project-monday.api": "http://localhost:3002",
  },
};
