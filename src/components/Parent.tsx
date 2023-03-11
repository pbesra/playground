import { useNavigate } from "react-router-dom";
import { Child } from "./Child";
import { useState } from "react";
import { DialogMenu } from "./Dialog";

export const Parent = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const setHasChangedInputs = (_hasChanged: boolean) => {
    setHasChanged(_hasChanged);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const onClickBack = () => {
    if (hasChanged) {
      setOpenDialog(hasChanged);
      return;
    }
    navigate(-1);
  };
  return (
    <>
      <div>
        <div>
          <span
            style={{ width: 100, border: "1px solid green", cursor: "pointer" }}
            onClick={onClickBack}
          >
            Go back to previous page
          </span>
        </div>
        <br />
        <br />
        <Child setHasChanged={setHasChangedInputs} />
      </div>
      <DialogMenu open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};
