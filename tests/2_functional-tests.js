const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  // let validPuzzle = "759236.1.816495..2432178...174569...395842.6.62......9......1.45....4..79473..6..";
  //   test("validPuzzle is a string", function (done) {
  //     chai
  //     .request(server)
  //     .post("/api/solve")
  //     .send({puzzle: validPuzzle})
  //     .end(function(err, res) {
  //       assert.typeOf(res.body.solution.length, "number")
  //     })
  //   })
 
  // });

});
