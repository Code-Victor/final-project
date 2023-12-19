import { createServer, Response } from "miragejs";
const allowedUsers = [
  { name: "Cool guy", email: "coolemail@gmail.com", password: "123123" },

  { name: "Big boy", email: "anotheremail@gmail.com", password: "098098" },
];
export default function () {
  createServer({
    routes() {
      this.post("/api/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = allowedUsers.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          let token = Math.random().toString(36).substring(7);
          user.token = token;
          return {
            token,
            user,
          };
        } else {
          return new Response(
            401,
            {},
            {
              message: "Invalid credentials",
            }
          );
        }
      });
      this.get("/api/me", (schema, request) => {
        const token = request.requestHeaders.Authorization.split(" ")[1];
        const user = allowedUsers.find((user) => user.token === token);
        if (user) {
          return {
            user: {
              name: user.name,
              email: user.email,
            },
          };
        }
        return new Response(
          401,
          {},
          {
            message: "Invalid credentials",
          }
        );
      });
      this.passthrough(
        "http://api.geoapify.com/**",
        "https://api.openweathermap.org/**"
      );
    },
  });
}
