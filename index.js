var Xray = require("x-ray");
var x = Xray({
  filters: {
    trim: function (value) {
      return typeof value === "string" ? value.trim() : value;
    },
    replace: function (value) {
      return typeof value === "string"
        ? value.replace("evaluation", "privacy-report")
        : value;
    },
  },
});

function fetch(query) {
  x(`https://privacy.commonsense.org/search/${query}/1`, ".col", {
    title: "div.title",
    link: x("a.evaluation-teaser@href | trim | replace"),
  })
    .then((res) => {
      return x(res.link, ["table.report-table > tbody > tr > td"]);
    })
    .then(console.log);
}

fetch("google");
