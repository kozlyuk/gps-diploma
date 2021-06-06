import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _carInfo = null;
  _editingDepartmentID = null;
  _editingCarID = null;
  _addCarShowing = false;
  _addDepartmentShowing = false;
  constructor() {
    makeObservable(this, {
      _editingDepartmentID: observable,
      _editingCarID: observable,
      _carInfo: observable,
      _addCarShowing: observable,
      _addDepartmentShowing: observable,
      carInfo: computed,
      editingCarID: computed,
      editingDepartmentID: computed,
      addCarShowing: computed,
      addDepartmentShowing: computed,
      setCarInfo: action,
      setEditingDepartmentID: action,
      setEditingCarID: action,
      setAddCarShowing: action,
      setAddDepartmentShowing: action,
    });
  }

  setAddDepartmentShowing = (value) => {
    this._addDepartmentShowing = value;
  };

  setAddCarShowing = (value) => {
    this._addCarShowing = value;
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

  get editingDepartmentID() {
    return this._editingDepartmentID;
  }

  get editingCarID() {
    return this._editingCarID;
  }

  get addCarShowing() {
    return this._addCarShowing;
  }

  get addDepartmentShowing() {
    return this._addDepartmentShowing;
  }
}

export default ModalsStore;
