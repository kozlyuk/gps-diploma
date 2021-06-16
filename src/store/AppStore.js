import { makeObservable, observable, computed, action } from "mobx";
import axios from "axios";

import mock from "../mock.json";
import ModalsStore from "./ModalsStore";
import UserStore from "./UserStore";

class AppStore {
  _cars = [];
  _trips = [];
  _departments = [];
  _models = [];
  _company = [];
  _showTrips = [];
  _showCars = [];
  _showHistory = [];
  _searchHistory = [];

  _currentTrips = [];
  _currentCars = [];

  _loading = true;

  userStore = null;
  modalStore = null;
  constructor() {
    makeObservable(this, {
      userStore: observable,
      _cars: observable,
      _departments: observable,
      _trips: observable,
      _company: observable,
      _models: observable,
      _showTrips: observable,
      _showCars: observable,
      _showHistory: observable,
      _searchHistory: observable,
      _currentTrips: observable,
      _currentCars: observable,
      _loading: observable,

      cars: computed,
      departments: computed,
      trips: computed,
      models: computed,
      company: computed,
      showTrips: computed,
      showCars: computed,
      showHistory: computed,
      searchHistory: computed,
      currentCars: computed,
      currentTrips: computed,
      loading: computed,

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
      resetState: action,
      loadData: action,
      setLoading: action,
    });
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

  updateDepartment = (id, name) => {
    const updatedItem = this._departments.find((dep) => dep.id === id);
    const toUpdateCars = this._cars.filter(
      (car) => car.department === updatedItem.name
    );
    updatedItem.name = name;
    toUpdateCars.forEach((car) => {
      car.department = name;
    });
  };

  addDepartment = (department) => {
    this._departments.unshift(department);
  };

  updateCar = (car) => {
    const index = this._cars.findIndex((c) => c.id === car.id);
    this._cars[index] = car;
    const curIndex = this._currentCars.findIndex((c) => c.id === car.id);
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

  resetState = () => {
    this._cars = [];
    this._trips = [];
    this._departments = [];
    this._models = [];
    this._company = [];
    this._showTrips = [];
    this._showCars = [];
    this._showHistory = [];
    this._searchHistory = [];

    this._loading = true;

    this._currentTrips = [];
    this._currentCars = [];
  };

  loadData = async () => {
    const headers = { Authorization: `Token ${this.userStore.token}` };

    this._trips = mock.trips;
    this._cars = mock.cars;
    this._departments = mock.departments;

    //  load cars
    await axios
      .get(`${process.env.REACT_APP_CARS}`, { headers: headers })
      .then(({ data: dd }) => {
        console.log(dd);
        this._cars = [...this._cars, ...dd];
        this._currentCars = this._cars;
        this._showCars = this._cars.map((car) => car.id);
      });
    //  load departments
    await axios
      .get(`${process.env.REACT_APP_DEPARTMENTS}`, { headers: headers })
      .then(({ data: dd }) => {
        console.log(dd);
        this._departments = [
          ...this._departments.map((el) => ({ ...el, show: true })),
          ...dd.map((el) => ({ ...el, show: true })),
        ];
      });
    //  load mpdels
    await axios
      .get(`${process.env.REACT_APP_MODELS}`, { headers: headers })
      .then(({ data: dd }) => {
        console.log(dd);
        this._models = [...dd];
      });
    //  load company
    await axios
      .get(`${process.env.REACT_APP_COMPANY}`, { headers: headers })
      .then(({ data: dd }) => {
        console.log(dd);
        this._company = [...dd];
      });

    this._currentTrips = this._trips;
    this._showTrips = this._trips;

    console.log("loaded cars: ", this._cars);

    this._loading = false;
  };

  setLoading = (value) => {
    this._loading = value;
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

  get currentCars() {
    return this._currentCars;
  }

  get currentTrips() {
    return this._currentTrips;
  }

  get models() {
    return this._models;
  }

  get company() {
    return this._company;
  }

  get loading() {
    return this._loading;
  }
}

export default new AppStore();
