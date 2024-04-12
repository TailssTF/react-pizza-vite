import { makeAutoObservable } from "mobx";

class AuthStore {
  isAuth = false;
  email: string = "";

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
}

export default new AuthStore();
