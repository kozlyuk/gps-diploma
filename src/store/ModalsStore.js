import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _showIntervalModal = false;
  _carInfo = null;
  _showTripsModal = false;
  constructor() {
    makeObservable(this, {
      _showIntervalModal: observable,
      _showTripsModal: observable,
      _carInfo: observable,
      showIntervalModal: computed,
      showTripsModal: computed,
      carInfo: computed,
      setShowIntervalModal: action,
      setShowTripsModal: action,
      setCarInfo: action,
    });
  }

  setShowIntervalModal = (value) => {
    this._showIntervalModal = value;
  };

  setShowTripsModal = (value) => {
    this._showTripsModal = value;
  };

  setCarInfo = (value) => {
    this._carInfo = value;
  };

  get carInfo() {
    return this._carInfo;
  }

  get showIntervalModal() {
    return this._showIntervalModal;
  }

  get showTripsModal() {
    return this._showTripsModal;
  }
}

export default ModalsStore;
