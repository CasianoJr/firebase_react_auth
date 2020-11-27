import { useState } from "react";
export default function useStateCallback(initialState) {
   const [state, setState] = useState(initialState);

   return [
      state,
      (value, callback) => {
         setState(value);
         if (typeof callback === "function") {
            callback(value);
         }
      },
   ];
}
