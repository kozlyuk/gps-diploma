import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from "mobx";
import axios from "axios";

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

  _currentTrips = [];
  _currentCars = [];

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
      _currentTrips: observable,
      _currentCars: observable,

      data: computed,
      cars: computed,
      departments: computed,
      trips: computed,
      showTrips: computed,
      showCars: computed,
      showHistory: computed,
      searchHistory: computed,
      currentCars: computed,
      currentTrips: computed,

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
      updateDepartment: action,
      addDepartment: action,
      updateCar: action,
      addCar: action,
      setCurrentTrips: action,
      setCurrentCars: action,
    });
    this._data = mock;
    runInAction(async () => {
      this._cars =
        //(await axios.get(`${process.env.REACT_APP_CARS}/`)) ?? 
        mock.cars;
    });
    runInAction(async () => {
      this._departments =
        // (await axios.get(`${process.env.REACT_APP_DEPARTMENTS}/`))?.map(
        //   (el) => ({ ...el, show: true })
        // ) ?? 
        mock.departments.map((el) => ({ ...el, show: true }));
    });
    this._trips = mock.trips;
    this._showCars = mock.cars.map((car) => car.uuid);
    this.userStore = new UserStore();
    this.modalStore = new ModalsStore();
    this._currentCars = this._cars;
    this._currentTrips = this._trips;
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

  updateDepartment = (id, name) => {
    const updatedItem = this._departments.find((dep) => dep.id === id);
    const toUpdateCars = this._cars.filter(
      (car) => car.department === updatedItem.name
    );
    console.log(toUpdateCars);
    updatedItem.name = name;
    toUpdateCars.forEach((car) => {
      car.department = name;
    });
  };

  addDepartment = (department) => {
    this._departments.unshift(department);
  };

  updateCar = (car) => {
    const index = this._cars.findIndex((c) => c.uuid === car.uuid);
    this._cars[index] = car;
    const curIndex = this._currentCars.findIndex((c) => c.uuid === car.uuid);
    this._currentCars[curIndex] = car;
  };

  addCar = (car) => {
    this._cars.unshift(car);
    this._currentCars.push(car);
  };

  setCurrentCars = (cars) => {
    this._currentCars = cars;
  };

  setCurrentTrips = (trips) => {
    this._currentTrips = trips;
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
    return this._cars.filter((car) => this._showCars.includes(car.uuid));
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

  get currentCars() {
    return this._currentCars;
  }

  get currentTrips() {
    return this._currentTrips;
  }

  get data() {
    return this._data;
  }
}

export default new AppStore();
