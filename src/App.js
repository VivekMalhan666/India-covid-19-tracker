import React, { useState, useEffect } from "react";
import "./App.css";
import { sortData } from "./utilities";
import numeral from "numeral";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import Table from "./Table";
import InfoBox from "./InfoBox";

function App() {
  const [regions, setRegions] = useState([]);
  const [region, setInputRegion] = useState("None");
  const [tableData, setTableData] = useState([]);
  const [stateInfo, setStateInfo] = useState({});

  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const regions = data.statewise.map((region) => {
            return region;
          });
          let sortedData = sortData(data.statewise);
          setTableData(sortedData);
          setRegions(regions);
        });
    };
    getStateData();
  }, []);

  const onStateChange = async (event) => {
    const stateCode = event.target.value;
    setStateInfo(stateCode);
    setInputRegion(stateCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>India's Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onStateChange} value={region}>
              <MenuItem value="None">Select Here</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region.statecode} value={region}>
                  {region.state}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Confirmed"
            cases={stateInfo.deltaconfirmed}
            total={numeral(stateInfo.confirmed).format("0.0a")}
          />
          <InfoBox
            title="Active"
            cases={stateInfo.active}
            total={numeral(stateInfo.confirmed).format("0.0a")}
          />
          <InfoBox
            title="Recovered"
            cases={stateInfo.deltarecovered}
            total={numeral(stateInfo.recovered).format("0.0a")}
          />
          <InfoBox
            title="Deceased"
            cases={stateInfo.deltadeaths}
            total={numeral(stateInfo.deaths).format("0.0a")}
          />
        </div>
        {/* Map */}
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases in States </h3>
            <Table regions={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
