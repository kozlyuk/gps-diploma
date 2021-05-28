import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _showIntervalModal = false;
  _carInfo = null;
  _editingDepartmentID = null;
  constructor() {
    makeObservable(this, {
      _showIntervalModal: observable,
      _editingDepartmentID: observable,
      _carInfo: observable,
      showIntervalModal: computed,
      carInfo: computed,
      editingDepartmentID: computed,
      setShowIntervalModal: action,
      setCarInfo: action,
      setEditingDepartmentID: action,
    });
  }

  setShowIntervalModal = (value) => {
    this._showIntervalModal = value;
  };

  setCarInfo = (value) => {
    this._carInfo = value;
  };

  setEditingDepartmentID = (id) => {
    this._editingDepartmentID = id;
  };

  get carInfo() {
    return this._carInfo;
  }

  get showIntervalModal() {
    return this._showIntervalModal;
  }

  get editingDepartmentID() {
    return this._editingDepartmentID;
  }
}

export default ModalsStore;
