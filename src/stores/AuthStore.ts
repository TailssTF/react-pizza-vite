import { makeAutoObservable } from "mobx";
import AuthService from "../API/api.auth";

class AuthStore {
  isAuth = false;
  isAuthInProgress = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  *login(email: string, password: string) {
    this.isAuthInProgress = true;
    try {
      const { data } = yield AuthService.login(email, password);
      localStorage.setItem("token", data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.log("login error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  *checkAuth() {
    this.isAuthInProgress = true;
    try {
      const { data } = yield AuthService.refreshToken();
      localStorage.setItem("token", data.accessToken);
      this.isAuth = true;
    } catch (err) {
      console.log("login error");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  *logout() {
    this.isAuthInProgress = true;
    try {
      yield AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    }
  }
}

export default new AuthStore();
