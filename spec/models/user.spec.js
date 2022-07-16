const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});

it("it can't save a user, if the same user already exists", (done) => {
  const user1 = new User({
    email: "someone@example.com",
    password: "password",
  });

  user1.save((err) => {
    expect(err).toBeNull();

    User.find((err, users) => {
      expect(err).toBeNull();

      expect(users[0]).toMatchObject({
        email: "someone@example.com",
        password: "password",
      });
    });
  });
  
  const user2 = new User({
    email: "someone@example.com",
    password: "password",
  });

  user2.save((err) => {
    expect(err).toBeNull();

    User.find((err, users) => {
      expect(err).toBeNull();

      expect(users[1]).not.toMatchObject({
        email: "someone@example.com",
        password: "password",
      });
      done();
    });
  });
});

