import React from "react";
import numeral from "numeral";
import "./Table.css";

function Table({ regions }) {
  return (
    <div className="table">
      {regions.map(({ state, confirmed }) => (
        <tr>
          <td>{state}</td>
          <td>
            <strong>{numeral(confirmed).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
