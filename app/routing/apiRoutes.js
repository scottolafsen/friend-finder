var friendData = require("../data/friends");

module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  app.post("/api/friends", function (req, res) {

    var match = {
        name: "",
        photo: "",
        difference: 1000
    };
    var userScore = req.body.scores;
    var totalDifference = 0;

    for (var i = 0; i < friendData.length; i++) {
        totalDifference = 0;

        for (var j = 0; j < friendData[i].scores[j]; j++) {
            totalDifference += Math.abs(parseInt(userScore[j] - friendData[i].scores[j]));

            if (totalDifference <= match.difference) {

                match.name = friendData[i].name;
                match.photo = friendData[i].photo;
                match.difference = totalDifference;

            }
        }
    }

    friendData.push(req.body);
    res.json(match);
});

};

