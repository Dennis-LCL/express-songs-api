const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {
  it("POST /songs should return a new song object", async () => {
    const response = await request(app)
      .post("/songs")
      .send({ name: "ABC Song", artist: "unknwon" });

    // console.log(response.body);
    expect(response.body).toMatchObject({
      id: 1,
      name: "ABC Song",
      artist: "unknwon"
    });
  });

  it("GET /songs should return a non empty array", async () => {
    const response = await request(app).get("/songs");
    // console.log(response.body.length);
    expect(response.body.length).not.toBe(0);
  });

  it("GET /songs/:id should return song with id specified", async () => {
    const response = await request(app).get("/songs/1");
    // console.log(response.body.id);
    expect(response.body.id).toBe(1);
  });

  it("PUT /songs/:id should return the updated song", async () => {
    const response = await request(app)
      .put("/songs/1")
      .send({ name: "Bah Bah Black Sheep", artist: "unknwon" });
    // console.log(response.body);
    expect(response.body).toMatchObject({
      id: 1,
      name: "Bah Bah Black Sheep",
      artist: "unknwon"
    });
  });

  it("DELETE /songs/:id should return the deleted song", async () => {
    const response = await request(app).delete("/songs/1");
    // console.log(response.body);
    expect(response.body).toMatchObject({
      id: 1,
      name: "Bah Bah Black Sheep",
      artist: "unknwon"
    });
  });

  it("GET /songs should return an empty array", async () => {
    const response = await request(app).get("/songs");
    expect(response.body.length).toBe(0);
  });
});
