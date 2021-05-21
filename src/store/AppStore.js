import { makeObservable, observable, computed, action } from "mobx";

import mock from "../mock.json";

class AppStore {
  _data = {};
  _cars = [];
  _trips = [];
  _departments = [];
  _showTrips = [];
  _showCars = [];
  constructor() {
    makeObservable(this, {
      _data: observable,
      _cars: observable,
      _departments: observable,
      _trips: observable,
      _showTrips: observable,
      _showCars: observable,
      data: computed,
      cars: computed,
      departments: computed,
      trips: computed,
      showTrips: computed,
      showCars: computed,
      updateData: action,
      updateCars: action,
      addToShowTrips: action,
      removeFromShowTrips: action,
      addToShowCars: action,
      removeFromShowCars: action,
    });
    this._data = mock;
    this._cars = mock.cars;
    this._departments = mock.departments;
    this._trips = mock.trips;
    this._showCars = mock.cars.map(car => car.id);
  }

  updateData = (newData) => {
    this._data = newData;
  };

  updateCars = (newData) => {
    this._cars = newData;
  };

  addToShowTrips = (tripID) => {
    if (!this._showTrips.includes(tripID)) this._showTrips.push(tripID);
  };

  removeFromShowTrips = (tripID) => {
    this._showTrips = this._showTrips.filter((id) => id !== tripID);
  };

  addToShowCars = (carID) => {
    if (!this._showCars.includes(carID)) this._showCars.push(carID);
  };

  removeFromShowCars = (carID) => {
    this._showCars = this._showCars.filter((id) => id !== carID);
  };

  get cars() {
    return this._cars;
  }

  get departments() {
    return this._departments;
  }

  get showTrips() {
    return this._trips.filter((trip) => this._showTrips.includes(trip.id));
  }

  get showCars() {
    return this._cars.filter((car) => this._showCars.includes(car.id));
  }

  get trips() {
    return this._trips;
  }

  get data() {
    return this._data;
  }
}

export default new AppStore();
