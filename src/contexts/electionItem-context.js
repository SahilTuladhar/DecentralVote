import { createContext , useState } from "react";

const ElectionItemContext = createContext({
  title: "",
  organizer: "",
  startDate: "",
  endDate: "",
});

export function ElectionItemContextProvider(props) {
const [itemTitle, setItemTitle] = useState("");
const [itemOrganizer, setItemOrganizer] = useState("");
const [itemStartDate, setItemStartDate] = useState("");
const [itemEndDate, setItemEndDate] = useState("");

  const context = {
    title: itemTitle,
    organizer: itemOrganizer,
    startDate: itemStartDate,
    endDate: itemEndDate,
    setItemTitle, 
    setItemOrganizer,
    setItemStartDate,
    setItemEndDate,
  };

  return (
    <ElectionItemContext.Provider value={context}>
      {props.children}
    </ElectionItemContext.Provider>
  );
}

export default ElectionItemContext;
