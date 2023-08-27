const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  let validPuzzle = "759236.1.816495..2432178...174569...395842.6.62......9......1.45....4..79473..6..";
  // test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
  //   chai
  //     .request(server)
  //     .post("/api/solve")
  //     .send({ puzzle: validPuzzle })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.solution, "759236418816495372432178956174569283395842761628713549283657194561924837947381625");
  //       done();
  //     });
  // });
  // test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
  //   let invalidCharacters = "..invalid..chars..";
  //   let puzzle = invalidCharacters + validPuzzle.slice(0, -invalidCharacters.length);
  //   chai
  //     .request(server)
  //     .post("/api/solve")
  //     .send({ puzzle: puzzle })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.error, "Invalid characters in puzzle");
  //       done();
  //     });
  // });
  // test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
  //   let puzzle = validPuzzle + "......89";
  //   chai
  //     .request(server)
  //     .post("/api/solve")
  //     .send({ puzzle: puzzle })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
  //       done();
  //     });
  // });

  // test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
  //   let puzzle = validPuzzle.slice(0, -2) + "66";
  //   chai
  //     .request(server)
  //     .post("/api/solve")
  //     .send({ puzzle: puzzle })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.error, "Puzzle cannot be solved");
  //       done();
  //     });
  // });
  // test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
  //   let puzzle = validPuzzle;
  //   chai
  //     .request(server)
  //     .post("/api/check")
  //     .send({ puzzle: puzzle, coordinate: "I9", value: 5 })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.valid, true);
  //       done();
  //     });
  // });
  // test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
  //   let puzzle = validPuzzle;
  //   chai
  //     .request(server)
  //     .post("/api/check")
  //     .send({ puzzle: puzzle, coordinate: "I9", value: 3 })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.valid, false);
  //       assert.deepEqual(res.body.conflict, ["row"]);
  //       done();
  //     });
  // });
  // test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
  //   let puzzle = validPuzzle;
  //   chai
  //     .request(server)
  //     .post("/api/check")
  //     .send({ puzzle: puzzle, coordinate: "I9", value: 9 })
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.equal(res.body.valid, false);
  //       assert.deepEqual(res.body.conflict, ["row", "column"]);
  //       done();
  //     });
  // });
  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    let puzzle = validPuzzle;
    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle: puzzle, coordinate: "I9", value: 7 })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.valid, false);
        assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
        done();
      });
  });

  // Check a puzzle placement with missing required fields: POST request to /api/check
  // Check a puzzle placement with invalid characters: POST request to /api/check
  // Check a puzzle placement with incorrect length: POST request to /api/check
  // Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  // Check a puzzle placement with invalid placement value: POST request to /api/check
});
