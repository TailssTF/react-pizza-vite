import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuth = false;
  email: string = "";
  fromPath: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  signIn = (email: string) => {
    this.isAuth = true;
    this.email = email;
  };

  signOut = () => {
    this.isAuth = false;
    this.email = "";
  };

  setFromPath = (path: string) => {
    this.fromPath = path;
  };
}

export default new AuthStore();
