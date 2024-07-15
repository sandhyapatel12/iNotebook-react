//imports
import { createContext } from "react";

//create context  --  share data across  component tree without having to pass props down manually at every level.
const noteContext = createContext();

export default noteContext;