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
  _showTrips = [];
  constructor() {
    makeObservable(this, {
      _data: observable,
      _cars: observable,
      _departments: observable,
      _trips: observable,
      _showTrips: observable,
      data: computed,
      cars: computed,
      departments: computed,
      trips: computed,
      showTrips: computed,
      updateData: action,
      updateCars: action,
      addToShowTrips: action,
      removeFromShowTrips: action
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

  
  addToShowTrips = (tripID) => {
    if(!this._showTrips.includes(tripID))
      this._showTrips.push(tripID);
  }

  removeFromShowTrips = (tripID) => {
    this._showTrips = this._showTrips.filter(id => id !== tripID);
  }
  
  get cars(){
    return this._cars;
  }

  get departments(){
    return this._departments;
  }

  get showTrips(){
    return this._trips.filter(trip => this._showTrips.includes(trip.id));
  }

  get trips(){
    return this._trips;
  }
  
  get data(){
    return this._data;
  }

}

export default new AppStore();
