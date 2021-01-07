import "reflect-metadata";
import express from "express";
import {
  CurrentUser,
  Get,
  JsonController,
  Post,
  Session,
  useExpressServer,
} from "routing-controllers";
import session from "express-session";

export const app = express();

app.use(session({ secret: "secret" }));

type User = {
  id: string;
  name: string;
};

@JsonController("/users")
class BaseController {
  @Get("/")
  getLoggedInUser(@CurrentUser({ required: true }) user: User) {
    return user;
  }

  @Post("/login")
  login(@Session() session: any) {
    session.userId = "fizz";
    return { ok: true };
  }
}

useExpressServer(app, {
  controllers: [BaseController],
  currentUserChecker: () => {
    // returning a valid user works
    // return { id: "foo", name: "bar" };
    // returning something falsy fails
    return false;
    // throwing an error fails
    // throw new UnauthorizedError();
  },
});
