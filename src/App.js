import React, { useState, useEffect } from "react";
import "./App.css";
import { sortData } from "./utilities";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Table from "./Table";

function App() {
  const [regions, setRegions] = useState([]);
  const [region, setInputRegion] = useState("India");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const regions = data.statewise.map((region) => ({
            name: region.state,
            code: region.statecode,
          }));
          let sortedData = sortData(data.statewise);
          setTableData(sortedData);
          setRegions(regions);
        });
    };
    getStateData();
  }, []);

  const onStateChange = async (event) => {
    const stateCode = event.target.value;
    setInputRegion(stateCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>India's Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={region} onChange={onStateChange}>
              <MenuItem value="India">India</MenuItem>
              {regions.map((region) => (
                <MenuItem value={region.code}>{region.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* graph */}
        {/* Map */}
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases in States </h3>
            <Table regions={tableData} />
          </div>
        </CardContent>

        {/* list */}
      </Card>
    </div>
  );
}

export default App;
