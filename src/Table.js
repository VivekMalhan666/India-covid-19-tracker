import React from "react";
import numeral from "numeral";
import "./Table.css";

function Table({ regions }) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>
              <strong>States</strong>
            </th>
            <th>
              <strong>Confimed</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {regions.map((region) => (
            <tr key={region.statecode}>
              <td>{region.state}</td>
              <td>
                <strong>{numeral(region.confirmed).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
