import {
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";

import mock from "../mock.json";


class AppStore {
  _data = {};
  _cars = [];
  constructor() {
    makeObservable(this, {
      _data: observable,
      _cars: observable,
      data: computed,
      cars: computed,
      updateData: action,
      updateCars: action
    });
    this._data = mock;
    this._cars = mock.cars;
  }
  
  updateData = (newData) => {
    this._data = newData;
  }

  updateCars = (newData) => {
    this._cars = newData;
  }
  
  get cars(){
    return this._cars;
  }
  
  get data(){
    return this._data;
  }

}

export default new AppStore();
