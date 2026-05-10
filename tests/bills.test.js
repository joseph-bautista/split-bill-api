const request = require("supertest");

const app = require("../server");

let token = "";

beforeAll(async () => {

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email: "joseph@gmail.com",
      password: "123456"
    });

  token = loginResponse.body.token;

});

describe("Bills API", () => {

  test("should get authenticated user bills", async () => {

    const response = await request(app)
      .get("/api/bills")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

  });

  test("should create bill", async () => {

    const response = await request(app)
      .post("/api/bills")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Bill"
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

  });

});