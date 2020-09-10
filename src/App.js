import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [regions, setRegions] = useState([]);
  const [region, setInputRegion] = useState("India");

  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const regions = data.statewise.map((region) => ({
            name: region.state,
            code: region.statecode,
          }));
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
            <Select
              className="app__dropdown"
              variant="outlined"
              value={region}
              onChange={onStateChange}
            >
              <MenuItem value="India">India</MenuItem>
              {regions.map((region) => (
                <MenuItem value={region.code}>{region.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* graph */}
      </div>
      <div className="app__right">
        {/* Map */}

        {/* list */}
      </div>
    </div>
  );
}

export default App;
