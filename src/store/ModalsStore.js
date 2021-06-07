import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _carInfo = null;
  _editingDepartmentID = null;
  _editingCarID = null;
  _addCarShowing = false;
  _addDepartmentShowing = false;
  _commandShowing = false;
  constructor() {
    makeObservable(this, {
      _editingDepartmentID: observable,
      _editingCarID: observable,
      _carInfo: observable,
      _addCarShowing: observable,
      _addDepartmentShowing: observable,
      _commandShowing: observable,
      carInfo: computed,
      editingCarID: computed,
      editingDepartmentID: computed,
      addCarShowing: computed,
      addDepartmentShowing: computed,
      commandShowing: computed,
      setCarInfo: action,
      setEditingDepartmentID: action,
      setEditingCarID: action,
      setAddCarShowing: action,
      setAddDepartmentShowing: action,
      setCommandShowing: action,
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

  setCommandShowing = (value) => {
    this._commandShowing = value;
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

  get commandShowing() {
    return this._commandShowing;
  }
}

export default ModalsStore;
