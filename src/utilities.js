import React from "react";
import numeral from "numeral";

export const sortData = (data) => {
  let sortedData = [...data];
  console.log(sortedData);
  sortedData.sort((a, b) => {
    if (a > b) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
