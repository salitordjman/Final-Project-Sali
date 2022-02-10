// const keys = require("../config/keys");
// process.env.MONGO_URL = `mongodb+srv://salitor:${keys.password}@salitur.xfafu.mongodb.net/final-project-sali-test?retryWrites=true&w=majority`;
// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app");
// const userDetails = require("../models/userDetails");
// const profileDetails = require("../models/profileDetails");
// const postDetails = require("../models/postDetails");

// const idUserOne = new mongoose.Types.ObjectId();
// let tokenUserOne = "";
// let idPostUserOne = "";
// let idProfileUserOne = "";
// let idCommentUserOne = "";
// const userOne = {
//   _id: idUserOne,
//   name: "Jon",
//   email: "jon@gmail.com",
//   password: 123456,
// };

// beforeAll(async () => {
//   await userDetails.deleteMany();
//   await profileDetails.deleteMany();
//   await postDetails.deleteMany();
// });

// test("Register", async () => {
//   await request(app).post("/api/user").send(userOne).expect(201);
//   const user1 = await userDetails.findById(idUserOne);
//   expect(user1.name).toBe(userOne.name);
//   expect(user1._id.toString()).toBe(idUserOne.toString());
//   expect(user1.email).toBe(userOne.email);
// });
// test("Fail-Register-same-mail", async () => {
//   await request(app).post("/api/user").send(userOne).expect(400);
// });
// test("Fail-Register-no-mail", async () => {
//   await request(app)
//     .post("/api/user")
//     .send({
//       name: "aaa",
//       email: "",
//       password: 123456,
//     })
//     .expect(500);
// });
// test("Fail-Register-no-invalid-mail", async () => {
//   await request(app)
//     .post("/api/user")
//     .send({
//       name: "aaa",
//       email: "aaa",
//       password: 123456,
//     })
//     .expect(500);
// });
// test("Fail-Register-short-name", async () => {
//   await request(app)
//     .post("/api/user")
//     .send({
//       name: "a",
//       email: "ccc@gmail.com",
//       password: 123456,
//     })
//     .expect(500);
// });
// test("Fail-Register-no-name", async () => {
//   await request(app)
//     .post("/api/user")
//     .send({
//       name: "",
//       email: "ccc@gmail.com",
//       password: 123456,
//     })
//     .expect(500);
// });

// test("Login-userone", async () => {
//   const token = await request(app)
//     .post("/api/auth")
//     .send({ email: "jon@gmail.com", password: "123456" })
//     .expect(201);
//   tokenUserOne = token._body.token;
// });

// test("Fail-wrong password-Login-userone", async () => {
//   await request(app)
//     .post("/api/auth")
//     .send({ email: "jon@gmail.com", password: "1111156" })
//     .expect(400);
// });
// test("Fail-wrong email-Login-userone", async () => {
//   await request(app)
//     .post("/api/auth")
//     .send({ email: "ddd@gmail.com", password: "123456" })
//     .expect(400);
// });

// test("Auth-userone", async () => {
//   const auth = await request(app)
//     .get("/api/auth")
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);

//   expect(auth._body.name).toBe(userOne.name);
//   expect(auth._body._id).toBe(idUserOne.toString());
//   expect(auth._body.email).toBe(userOne.email);
// });

// test("Fail-no token-Auth-userone", async () => {
//   const auth = await request(app)
//     .get("/api/auth")
//     .set({
//       "x-auth-token": "",
//     })
//     .send()
//     .expect(401);
// });

// test("new/edit profile-userone", async () => {
//   const newEdit = await request(app)
//     .post("/api/profile")
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       birthday: "1999-04-09",
//       status: "ggggfgfgggggdhd",
//       hobbies: "fvgd,dsfvd",
//       bio: "ggdfg",
//       facebook: "https://facebook.com/daft",
//     })
//     .expect(200);
//   const user1 = await profileDetails.findById(newEdit._body._id);

//   expect(newEdit._body.name).toBe(user1.name);
//   expect(newEdit._body._id).toBe(user1._id.toString());
//   expect(newEdit._body.user).toBe(user1.user.toString());
//   expect(newEdit._body.email).toBe(user1.email);
//   expect(newEdit._body.social.facebook).toBe(user1.social.facebook);
//   expect(newEdit._body.bio).toBe(user1.bio);
//   expect(newEdit._body.hobbies).toStrictEqual(user1.hobbies);
//   expect(newEdit._body.status).toBe(user1.status);
//   idProfileUserOne = newEdit._body._id;
// });

// test("Login by token-userone", async () => {
//   const login = await request(app)
//     .get("/api/profile/me")
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(login._body.user._id).toBe(idUserOne.toString());
// });

// test("Login by ID-userone", async () => {
//   const login = await request(app)
//     .get(`/api/profile/user/${idUserOne.toString()}`)
//     .send()
//     .expect(200);
//   expect(login._body.user._id).toBe(idUserOne.toString());
// });

// test("get all profile", async () => {
//   const login = await request(app).get("/api/profile").send().expect(200);
//   expect(login._body[0]._id).toBe(idProfileUserOne);
//   expect(login._body[0].user._id).toBe(idUserOne.toString());
//   expect(login._body[1]).toBe(undefined);
//   expect(login._body.length).toBe(1);
// });

// test("new post1-userone", async () => {
//   const newPost = await request(app)
//     .post("/api/posts")
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "aavvfvfvffvfvfa bbb ccc",
//     })
//     .expect(200);
//   const user1 = await postDetails.findById(newPost._body._id);

//   expect(newPost._body.name).toBe(user1.name);
//   expect(newPost._body._id).toBe(user1._id.toString());
//   expect(newPost._body.user).toBe(user1.user.toString());
//   expect(newPost._body.text).toBe(user1.text);
//   idPostUserOne = newPost._body._id;
// });

// test("new post2-userone", async () => {
//   await request(app)
//     .post("/api/posts")
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "eeeeeeeeeeeeeee",
//     })
//     .expect(200);
// });

// test("get all posts-userOne", async () => {
//   const all = await request(app)
//     .get("/api/posts")
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(all._body[1]._id).toBe(idPostUserOne);
//   expect(all._body[0].user).toBe(idUserOne.toString());
//   expect(all._body[1].user).toBe(idUserOne.toString());
//   expect(all._body[2]).toBe(undefined);
//   expect(all._body.length).toBe(2);
// });

// test("Fail-no Token-get all posts-userOne", async () => {
//   await request(app).get("/api/posts").send().expect(401);
// });

// test("get post by id-userOne", async () => {
//   const post = await request(app)
//     .get(`/api/posts/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(post._body._id).toBe(idPostUserOne);
//   expect(post._body.user).toBe(idUserOne.toString());
// });

// test("put Like on post -userOne", async () => {
//   const like = await request(app)
//     .put(`/api/posts/like/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);

//   expect(like._body[0].user).toBe(idUserOne.toString());
//   expect(like._body.length).toBe(1);
// });

// test("Fail-put again Like on post -userOne", async () => {
//   const like = await request(app)
//     .put(`/api/posts/like/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(400);
//   expect(like._body).toBe(undefined);
// });

// test("put UnLike on post -userOne", async () => {
//   const like = await request(app)
//     .put(`/api/posts/unlike/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(like._body.length).toBe(0);
// });

// test("Fail-put again UnLike on post -userOne", async () => {
//   const like = await request(app)
//     .put(`/api/posts/unlike/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(400);
//   expect(like._body).toBe(undefined);
// });

// test("post comment1 on post -userOne", async () => {
//   const comment = await request(app)
//     .post(`/api/posts/comment/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "aaaaa fghfg fgg gghfgf hj",
//     })
//     .expect(200);
//   expect(comment._body[0].user).toBe(idUserOne.toString());
//   expect(comment._body.length).toBe(1);
//   idCommentUserOne = comment._body[0]._id;
// });
// test("post comment2 on post -userOne", async () => {
//   const comment = await request(app)
//     .post(`/api/posts/comment/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "cccccccc ccccc",
//     })
//     .expect(200);
//   expect(comment._body[0].user).toBe(idUserOne.toString());
//   expect(comment._body[1]._id).toBe(idCommentUserOne);
//   expect(comment._body[1].user).toBe(idUserOne.toString());
//   expect(comment._body.length).toBe(2);
// });

// test("Fail- no token-post comment on post -userOne", async () => {
//   const comment = await request(app)
//     .post(`/api/posts/comment/${idPostUserOne}`)
//     .send({
//       text: "cccccccc ccccc",
//     })
//     .expect(401);
//   expect(comment._body).toBe(undefined);
// });
// test("Fail- no id-post comment on post -userOne", async () => {
//   const comment = await request(app)
//     .post("/api/posts/comment")
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "cccccccc ccccc",
//     })
//     .expect(404);
//   expect(comment._body).toBe(undefined);
// });

// test("Fail- no text-post comment on post -userOne", async () => {
//   const comment = await request(app)
//     .post(`/api/posts/comment/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(500);
// });

// test("Fail-no token- Delete-comment on post -userOne", async () => {
//   const comment = await request(app)
//     .delete(`/api/posts/comment/${idPostUserOne}/${idCommentUserOne}`)
//     .send()
//     .expect(401);
//   expect(comment._body).toBe(undefined);
// });

// test("Fail-no id post- Delete-comment on post -userOne", async () => {
//   await request(app)
//     .delete(`/api/posts/comment//${idCommentUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(404);
// });

// test("Fail-wrong id post- Delete-comment on post -userOne", async () => {
//   const comment = await request(app)
//     .delete(`/api/posts/comment/ghjg7jguyjghj67/${idCommentUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(500);
// });

// test("Fail-no id comment- Delete-comment on post -userOne", async () => {
//   const comment = await request(app)
//     .delete(`/api/posts/comment/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(404);
//   expect(comment._body).toBe(undefined);
// });

// test("Fail-wrong id comment- Delete-comment on post -userOne", async () => {
//   const comment = await request(app)
//     .delete(`/api/posts/comment/${idPostUserOne}/fhfhfh654rtbf5gbgb`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(404);
//   expect(comment._body).toBe(undefined);
// });

// test("Fail-no id - Delete-comment on post -userOne", async () => {
//   await request(app)
//     .delete(`/api/posts/comment`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(400);
// });

// test("Delete-comment on post -userOne", async () => {
//   const comment = await request(app)
//     .delete(`/api/posts/comment/${idPostUserOne}/${idCommentUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(comment._body.length).toBe(1);
// });

// test("delete post by id-userOne", async () => {
//   const post = await request(app)
//     .delete(`/api/posts/${idPostUserOne}`)
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(post._body).toBe(undefined);
// });

// test("delete user by token-userOne", async () => {
//   const login = await request(app)
//     .delete("/api/profile")
//     .set({ "x-auth-token": tokenUserOne })
//     .send()
//     .expect(200);
//   expect(login._body).toBe(undefined);
// });

// test("Fail- after delete userOne-new post-userone", async () => {
//   await request(app)
//     .post("/api/posts")
//     .set({ "x-auth-token": tokenUserOne })
//     .send({
//       text: "eeeeeeeeeeeeeee",
//     })
//     .expect(500);
// });
// //!npm test (- to start)
