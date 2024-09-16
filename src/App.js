import { Divider, Heading } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";

import { CardComponent } from "./components/Card";
import { getData } from "./api/api";

function App() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => {
    let currentPage = 1;
    let isFetching = false;
    let intervalID;

    const getLeads = async () => {
      if (isFetching) return;
      setError(null);
      isFetching = true;

      const { data } = await getData(
        `/api/v4/leads?limit=${3}&page=${currentPage}`
      );

      if (data.error) {
        setError(data.error);
        clearInterval(intervalID);
        isFetching = false;
        return;
      }
      if (data.length === 0) {
        clearInterval(intervalID);
        isFetching = false;
        return;
      }

      setLeads((prev) => [...prev, ...data._embedded.leads]);
      currentPage += 1;
      isFetching = false;
    };

    getLeads().then(() => {
      intervalID = setInterval(getLeads, 1000);
    });

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="App flex justify-center pt-5">
      {error && <span style={{ color: "red" }}>{error}</span>}
      <div className=" max-w-lg w-full ">
        <Heading className="pb-5">Leads</Heading>
        <Divider />
        <div className="pt-5 flex flex-col gap-3">
          {leads.length > 0 &&
            leads.map((lead) => {
              return (
                <CardComponent
                  isOpen={openCard}
                  setOpen={setOpenCard}
                  key={lead.id}
                  info={lead}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
