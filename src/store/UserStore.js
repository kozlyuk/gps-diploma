import { makeObservable, observable, computed, action } from "mobx";

class UserStore {
  _userId = null;
  _email = null;
  _token = null;
  _name = null;
  _phoneNumber = null;
  constructor() {
    makeObservable(this, {
      _userId: observable,
      _email: observable,
      _token: observable,
      _name: observable,
      _phoneNumber: observable,
      userId: computed,
      phoneNumber: computed,
      name: computed,
      token: computed,
      email: computed,
      setUserData: action,
      resetUserData: action,
    });
  }

  get userId() {
    return this._userId;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get name() {
    return this._name;
  }

  get token() {
    return this._token;
  }

  get email() {
    return this._email;
  }

  setUserData = (user) => {
    const { id, email, name, phoneNumber, token } = user;
    this._userId = id;
    this._email = email;
    this._token = token;
    this._phoneNumber = phoneNumber;
    this._name = name;
  };

  resetUserData = () => {
    this._userId = null;
    this._email = null;
    this._token = null;
    this._phoneNumber = null;
    this._name = null;
  };
}

export default UserStore;
