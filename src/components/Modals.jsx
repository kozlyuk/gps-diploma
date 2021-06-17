import React from "react";
import { observer } from "mobx-react";

import { CarInfoModal } from "./Modals/CarInfoModal";
import { EditDepartmentModal } from "./Modals/EditDepartmentModal";
import { EditCarModal } from "./Modals/EditCarModal";
import { AddCarModal } from "./Modals/AddCarModal";
import { AddDepartmentModal } from "./Modals/AddDepartmentModal";
import { StoreContext } from "../store/StoreContext";
import { CommandModal } from "./Modals/CommandModal";

export const Modals = observer(() => {
  const {
    modalStore: {
      carInfo,
      setCarInfo,
      setAddCarShowing,
      setAddDepartmentShowing,
      addDepartmentShowing,
      addCarShowing,
      setEditingCarID,
      editingCarID,
      setEditingDepartmentID,
      editingDepartmentID,
      commandShowing,
      setCommandShowing,
    },
  } = React.useContext(StoreContext);

  return (
    <>
      <CarInfoModal
        open={carInfo !== null}
        handleClose={() => setCarInfo(null)}
        carInfo={carInfo}
      />

      <EditDepartmentModal
        onClose={() => setEditingDepartmentID(null)}
        departmentID={editingDepartmentID}
      />
      <EditCarModal
        onClose={() => setEditingCarID(null)}
        carID={editingCarID}
      />
      <AddDepartmentModal
        show={addDepartmentShowing}
        onClose={() => setAddDepartmentShowing(false)}
      />
      <AddCarModal
        show={addCarShowing}
        onClose={() => setAddCarShowing(false)}
      />
      <CommandModal
        show={commandShowing}
        onClose={() => setCommandShowing(false)}
      />
    </>
  );
});
