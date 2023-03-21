const chai = require("chai");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { response } = require("express");
const server = require("../index");
chai.use(chaiHttp);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4NDczNTAyNTBhOTIyOWQxMWNkMmIiLCJpYXQiOjE2NzkzMTI2OTR9.PI2MXZZ2aNJVP87SsWiw96oUammt8JA9PsDkT6txuIM";

describe("get single post", async(req, res) => {
  it("get single post with id", (done) => {
    chai
      .request(server)
      .get("/api/posts/641847960250a9229d11cd30")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        if (err) {
          done(err);
        }
        console.log(response.body);
        expect(response.body).to.have.property("title");
        done();
      });
  });
});

describe("liked a post",async (req, res) => {
  it("post liked by user", (done) => {
    chai
      .request(server)
      .post("/api/like/641847a60250a9229d11cd32")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        if (err) {
          done(err);
        }
        expect(response.body).to.have.property("msg");
        done();
      });
  });
});

describe("Post deleted", async(req, res) => {
  it("delete post", (done) => {
    chai
      .request(server)
      .delete("/api/posts/641847960250a9229d11cd30")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, response) => {
        if (err) {
          done(err);
        }
        expect(response.body).to.have.property("message");
        done();
      });
  });
});
