import request from "supertest";
import { app } from "./server";

describe("User Controller Tests", () => {
  describe("GET /users", () => {
    it("should throw an error if the user cannot be found", async () => {
      const agent = request.agent(app);
      await agent.post("/users/login").send({});

      const result = await agent.get("/users");
      expect(result.status).toEqual(401);
      expect(result.text).toMatch("Authorization is required");
    });
  });
});
