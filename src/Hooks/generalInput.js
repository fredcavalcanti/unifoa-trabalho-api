// import { useState } from "react";

// export const generalInput = (valueInitial, setFiles = undefined) => {

  // const [value, setValue] = useState(valueInitial);

  // return {

  //   value,

  //   setValue,

  //   reset: () => setValue(""),

  //   bind: {
  //     value,

  //     onChange: evt => [setFiles ? setFiles(evt.target.files): "", setValue(evt.target.value)],

  //   },

  // };

// };

import { useState } from "react";

export const generalInput = (initialValue, setFiles = undefined) => {
  const [value, setValue] = useState(initialValue);

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

