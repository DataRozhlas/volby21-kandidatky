import React from "react";
import { DataGrid, csCZ } from "@material-ui/data-grid";
import { mergeClasses } from "@material-ui/styles";

const columns = [
  {
    field: "c",
    headerName: "Pořadí",
    width: 130,
  },
  {
    field: "t1",
    headerName: "Titul před",
    width: 130,
  },
  {
    field: "j",
    headerName: "Jméno",
    width: 130,
  },
  {
    field: "p",
    headerName: "Příjmení",
    width: 130,
  },
  {
    field: "t2",
    headerName: "Titul za",
    width: 130,
  },
  {
    field: "b",
    headerName: "Bydliště",
    width: 130,
  },
  {
    field: "o",
    headerName: "Počet obyvatel",
    width: 130,
  },
  {
    field: "a",
    headerName: "Věk",
    width: 130,
  },
  {
    field: "z",
    headerName: "Povolání",
    width: 350,
  },
];

const Tablica = ({ vybraniVybraniKandidati, classes }) => {
  return (
    <div className={classes.tabulka}>
      <DataGrid
        localeText={csCZ.props.MuiDataGrid.localeText}
        density={"compact"}
        rows={vybraniVybraniKandidati}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Tablica;
