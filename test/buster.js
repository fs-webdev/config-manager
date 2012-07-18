var config = module.exports;

// run these with 'buster test -e node'
config["Node"] = {
  environment: "node",
  tests: ["server/*-test.js"]
};