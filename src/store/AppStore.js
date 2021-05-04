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
  _departments = [];
  constructor() {
    makeObservable(this, {
      _data: observable,
      _cars: observable,
      _departments: observable,
      data: computed,
      cars: computed,
      departments: computed,
      updateData: action,
      updateCars: action
    });
    this._data = mock;
    this._cars = mock.cars;
    this._departments = mock.departments;
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

  get departments(){
    return this._departments;
  }
  
  get data(){
    return this._data;
  }

}

export default new AppStore();
