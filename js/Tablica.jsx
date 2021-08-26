import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "j",
    headerName: "Jméno",
    width: 150,
    editable: true,
  },
  {
    field: "p",
    headerName: "Příjmení",
    width: 150,
    editable: true,
  },
  {
    field: "a",
    headerName: "Věk",
    type: "number",
    width: 110,
    editable: true,
  },
];

const Tablica = ({ kandidati, vybraniKandidati }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
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
