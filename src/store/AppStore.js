import { makeObservable, observable, computed, action } from "mobx";

import mock from "../mock.json";
import ModalsStore from "./ModalsStore";
import UserStore from "./UserStore";

class AppStore {
  _data = {};
  _cars = [];
  _trips = [];
  _departments = [];
  _showTrips = [];
  _showCars = [];
  _showHistory = [];
  _searchHistory = [];

  userStore = null;
  modalStore = null;
  constructor() {
    makeObservable(this, {
      userStore: observable,
      _data: observable,
      _cars: observable,
      _departments: observable,
      _trips: observable,
      _showTrips: observable,
      _showCars: observable,
      _showHistory: observable,
      _searchHistory: observable,

      data: computed,
      cars: computed,
      departments: computed,
      trips: computed,
      showTrips: computed,
      showCars: computed,
      showHistory: computed,
      searchHistory: computed,

      updateData: action,
      updateCars: action,
      addToShowTrips: action,
      removeFromShowTrips: action,
      addToShowCars: action,
      removeFromShowCars: action,
      addToShowHistory: action,
      removeFromShowHistory: action,
      addToSearchHistory: action,
      changeShowDepartment: action,
    });
    this._data = mock;
    this._cars = mock.cars;
    this._departments = mock.departments.map((el) => ({ ...el, show: true }));
    this._trips = mock.trips;
    this._showCars = mock.cars.map((car) => car.id);
    this.userStore = new UserStore();
    this.modalStore = new ModalsStore();
  }

  updateData = (newData) => {
    this._data = newData;
  };

  updateCars = (newData) => {
    this._cars = newData;
  };

  addToShowTrips = (tripID) => {
    if (!this._showTrips.includes(tripID)) this._showTrips.unshift(tripID);
  };

  removeFromShowTrips = (tripID) => {
    this._showTrips = this._showTrips.filter((id) => id !== tripID);
  };

  addToShowCars = (carID) => {
    if (!this._showCars.includes(carID)) this._showCars.unshift(carID);
  };

  removeFromShowCars = (carID) => {
    this._showCars = this._showCars.filter((id) => id !== carID);
  };

  addToShowHistory = (itemID) => {
    if (!this._showHistory.includes(itemID)) this._showHistory.unshift(itemID);
  };

  removeFromShowHistory = (itemID) => {
    this._showHistory = this._showHistory.filter((id) => id !== itemID);
  };

  addToSearchHistory = (item) => {
    if (!this._searchHistory.includes(item)) this._searchHistory.unshift(item);
  };

  changeShowDepartment = (id, value) => {
    const index = this._departments.findIndex((dep) => dep.id === id);
    if (index !== -1) this._departments[index].show = value;
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

  get searchHistory() {
    return this._searchHistory;
  }

  get showHistory() {
    return this._searchHistory.filter((item) =>
      this._showHistory.includes(item.id)
    );
  }

  get data() {
    return this._data;
  }
}

export default new AppStore();