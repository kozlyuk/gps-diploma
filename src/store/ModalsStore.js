import { makeObservable, observable, computed, action } from "mobx";

class ModalsStore {
  _carInfo = null;
  _editingDepartmentID = null;
  _editingCarID = null;
  constructor() {
    makeObservable(this, {
      _editingDepartmentID: observable,
      _editingCarID: observable,
      _carInfo: observable,
      carInfo: computed,
      editingCarID: computed,
      editingDepartmentID: computed,
      setCarInfo: action,
      setEditingDepartmentID: action,
      setEditingCarID: action,
    });
  }

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
}

export default ModalsStore;
