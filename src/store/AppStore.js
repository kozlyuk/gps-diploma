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
  _trips = [];
  _departments = [];
  constructor() {
    makeObservable(this, {
      _data: observable,
      _cars: observable,
      _departments: observable,
      _trips: observable,
      data: computed,
      cars: computed,
      departments: computed,
      trips: computed,
      updateData: action,
      updateCars: action
    });
    this._data = mock;
    this._cars = mock.cars;
    this._departments = mock.departments;
    this._trips = mock.trips;
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

  get trips(){
    return this._trips;
  }
  
  get data(){
    return this._data;
  }

}

export default new AppStore();
