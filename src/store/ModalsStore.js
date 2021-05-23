import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _showIntervalModal = false;
  _carInfo = null;
  constructor() {
    makeObservable(this, {
      _showIntervalModal: observable,
      _carInfo: observable,
      showIntervalModal: computed,
      carInfo: computed,
      setShowIntervalModal: action,
      setCarInfo: action,
    });
  }

  setShowIntervalModal = (value) => {
    this._showIntervalModal = value;
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
}

export default ModalsStore;
