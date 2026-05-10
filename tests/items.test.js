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

describe("Items API", () => {

  test("should get bill items", async () => {

    const response = await request(app)
      .get("/api/items?bill_id=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

  });

  test("should create item", async () => {

    const response = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bill_id: 1,
        name: "Burger",
        price: 250
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

  });

});