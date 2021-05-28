import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _showIntervalModal = false;
  _carInfo = null;
  _editingDepartmentID = null;
  _editingCarID = null;
  constructor() {
    makeObservable(this, {
      _showIntervalModal: observable,
      _editingDepartmentID: observable,
      _editingCarID: observable,
      _carInfo: observable,
      showIntervalModal: computed,
      carInfo: computed,
      editingCarID: computed,
      editingDepartmentID: computed,
      setShowIntervalModal: action,
      setCarInfo: action,
      setEditingDepartmentID: action,
      setEditingCarID: action,
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

  setEditingCarID = (uuid) => {
    this._editingCarID = uuid;
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

  get editingCarID() {
    return this._editingCarID;
  }
}

export default ModalsStore;
