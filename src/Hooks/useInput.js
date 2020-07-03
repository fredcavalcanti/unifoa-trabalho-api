import { useState } from "react";

export const useInput = (valueInitial, setFiles = undefined) => {

  const [value, setValue] = useState(valueInitial);

  return {

    value,

    setValue,

    reset: () => setValue(""),

    bind: {
      value,

      onChange: evt => [setFiles ? setFiles(evt.target.files): "", setValue(evt.target.value)],

    },

  };
  
};

