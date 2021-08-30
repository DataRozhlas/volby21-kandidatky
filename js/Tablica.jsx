import React from "react";
import { DataGrid, csCZ } from "@material-ui/data-grid";

const columns = [
  {
    field: "j",
    headerName: "Jméno",
    width: 150,
  },
  {
    field: "p",
    headerName: "Příjmení",
    width: 150,
  },
  {
    field: "a",
    headerName: "Věk",
    type: "number",
    width: 20,
  },
  {
    field: "z",
    headerName: "Povolání",
    width: 210,
  },
];

const Tablica = ({ kandidati, vybraniKandidati }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        localeText={csCZ.props.MuiDataGrid.localeText}
        density={"compact"}
        rows={vybraniKandidati.length > 0 ? vybraniKandidati : kandidati}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Tablica;
