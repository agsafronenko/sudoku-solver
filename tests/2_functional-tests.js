const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const { listeners } = require("../test-runner");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  let validPuzzle = ".2...6...45..891237....3456214..5897.658...14.9721436..31642..8.4297853197.5316.2";
  let validPuzzleSolution = "123456789456789123789123456214365897365897214897214365531642978642978531978531642"
  let unsolvablePuzzle = "111456789123456789123456789123456789123456789123456789123456789123456789123456788";

    test("Solve a puzzle with valid puzzle string", function (done) {
      chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: validPuzzle})
      .end(function(err, res) {
        let result = res.body.solution
        assert.equal(res.status, 200)
        assert.equal(res.body.solution, validPuzzleSolution)
        done()
      })
    })

    test("Solve a puzzle with missing puzzle string", function (done) {
      chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: ""})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body.error, 'Required field missing')
        done()
      })
    })

    test("Solve a puzzle with invalid characters", function (done) {
      chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: validPuzzle.replace(".", "X")})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body.error, 'Invalid characters in puzzle')
        done()
      })
    })

    test("Solve a puzzle with incorrect length", function (done) {
      chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: validPuzzle + "1"})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
    })

    test("Solve a puzzle that cannot be solved", function (done) {
      chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: unsolvablePuzzle})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body.error, 'Puzzle cannot be solved')
        done()
      })
    })

    test("Check a puzzle placement with all fields", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "A1", value: 1})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.valid, true)
        done()
      })
    })

    test("Check a puzzle placement with single placement conflict", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "A1", value: 6})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.valid, false)
        assert.deepEqual(res.body.conflict, ["row"])
        done()
      })
    })

    test("Check a puzzle placement with multiple placement conflicts", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "C2", value: 6})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.valid, false)
        assert.deepEqual(res.body.conflict, [ "row", "column" ])
        done()
      })
    })

    test("Check a puzzle placement with all placement conflicts", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "A1", value: 2})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.valid, false)
        assert.deepEqual(res.body.conflict, ["row", "column", "region"])
        done()
      })
    })

    test("Check a puzzle placement with missing required fields", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: undefined, coordinate: undefined, value: undefined})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "Required field(s) missing")
        done()
      })
    })

    test("Check a puzzle placement with invalid characters", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle.replace(".", "X"), coordinate: "A1", value: 2})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'Invalid characters in puzzle')
        done()
      })
    })

    test("Check a puzzle placement with incorrect length", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle + "1", coordinate: "A1", value: 2})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.deepEqual(res.body.error, 'Expected puzzle to be 81 characters long')
        done()
      })
    })

    test("Check a puzzle placement with invalid placement coordinate", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "X14", value: 2})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "Invalid coordinate")
        done()
      })
    })

    test("Check a puzzle placement with invalid placement value", function (done) {
      chai
      .request(server)
      .post("/api/check")
      .send({puzzle: validPuzzle, coordinate: "A1", value: 14})
      .end(function(err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, "Invalid value")
        done()
      })
    })

  });


