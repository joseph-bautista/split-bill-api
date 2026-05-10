const request = require("supertest");

const app = require("../server");

describe("Authentication API", () => {

  test("should fail login with invalid credentials", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@gmail.com",
        password: "wrongpassword"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

  });

  test("should register user", async () => {

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456"
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

  });

});