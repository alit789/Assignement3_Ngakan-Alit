const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { Photo } = require("../models");

let user;

const dataUser = {
    id: 1,
    username: "alit",
    email: "alit@gmail.com",
    password: "qwe3",
};

const dataPhoto = {
    id: 1,
    title: "test JUDUL",
    caption: "test",
    image_url: "qweqwe",
};


describe("POST /photos", () => {
  beforeAll(async () => {
    try {
      await User.create(dataUser);
      await Photo.create(dataPhoto);
    } catch (err) {
      console.log(err);
    }
  });
  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
      await Photo.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
  it("should send response with 201", (done) => {

    request(app)
      .post("/users/login")
      .send({
        email: dataUser.email,
        password: dataUser.password,
      })

      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        const token = res.body.token;
        request(app)
          .post("/photos")
          .set("authorization", token)
          .send({
            title: dataPhoto.title,
            caption: dataPhoto.caption,
            image_url: dataPhoto.image_url,
          })

          .expect(201)
          .end((err, res) => {
            if (err) done(err);

            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("title");
            expect(res.body).toHaveProperty("caption");
            expect(res.body).toHaveProperty("image_url");
            expect(res.body.title).toEqual("test JUDUL");
            expect(res.body.caption).toEqual("test");
            expect(res.body.image_url).toEqual("qweqwe");
            done();
          });
      });
  });

  it("should send response with 401", (done) => {

    request(app)
      .post("/photos")
      .send({
        title: dataPhoto.title,
        caption: dataPhoto.caption,
        image_url: dataPhoto.image_url,
      })

      .expect(401)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });
});

describe("GET /photos", () => {
  beforeAll(async () => {
    let user;
    try {
      const result = await User.create(dataUser);
      const photo = await Photo.create(
        { ...dataPhoto, UserId: result.id },
      );
    } catch (err) {
      console.log(err);
    }
  });
  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
      await Photo.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
  
  it("should send response with 200", (done) => {

    request(app)
      .post("/users/login")
      .send({
        email: dataUser.email,
        password: dataUser.password,
      })

      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        const token = res.body.token;
        request(app)
          .get("/photos")
          .set("authorization", token)
 
          .expect(200)
          .end((err, res) => {
            if (err) done(err);

            expect(res.body).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  title: expect.any(String),
                  caption: expect.any(String),
                  image_url: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  UserId: expect.any(Number),
                }),
              ])
            );
            done();
          });
      });
  });

  it("should send response with 401", (done) => {

    request(app)
      .get("/photos")

      .expect(401)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });
});

//test untuk API get photo by ID
describe("GET /photos/:id", () => {
  beforeAll(async () => {
    try {
      const result = await User.create(dataUser);
      const photo = await Photo.create(
        { ...dataPhoto, UserId: result.id },
      );
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
      await Photo.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  it("should send response with 200", (done) => {
    //setup
    request(app)
      .post("/users/login")
      .send({
        email: dataUser.email,
        password: dataUser.password,
      })
      //execute
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        const token = res.body.token;
        request(app)
          .get("/photos/1")
          .set("authorization", token)
          //execute
          .expect(200)
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                caption: expect.any(String),
                image_url: expect.any(String),
                UserId: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              })
            );
            done();
          });
      });
  });

  it("should send response with 401", (done) => {
    //setup
    request(app)
      .get("/photos/1")
      //execute
      .expect(401)
      .end((err, res) => {
        if (err) done(err);

        done();
      });
  });
});
