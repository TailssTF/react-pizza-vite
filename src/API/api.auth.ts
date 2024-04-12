import { instance } from "./api.config.js";

class AuthService {
  login(email: string, password: string) {
    return instance.post("/api/login", { email, password });
  }

  refreshToken() {
    return instance.get("/api/refresh");
  }

  logout() {
    return instance.post("/api/logout");
  }
}

export default new AuthService();
