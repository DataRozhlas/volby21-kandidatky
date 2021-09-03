import React from "react";
import { DataGrid, csCZ } from "@material-ui/data-grid";

const columns = [
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

const Tablica = ({ kandidati, vybraniKandidati }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        localeText={csCZ.props.MuiDataGrid.localeText}
        density={"compact"}
        rows={vybraniKandidati}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Tablica;
