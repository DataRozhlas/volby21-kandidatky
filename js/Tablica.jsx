import React from "react";
import { DataGrid, csCZ } from "@material-ui/data-grid";
import { Tooltip, Typography } from "@material-ui/core";

const getFullName = (params) => {
  const prvniTitul = params.getValue(params.id, "t1");
  return (
    <Tooltip
      arrow
      enterTouchDelay={0}
      title={`${params.getValue(params.id, "t1") || ""} ${
        params.getValue(params.id, "j") || ""
      } ${params.getValue(params.id, "p") || ""} ${
        params.getValue(params.id, "t2") || ""
      }`}
    >
      <Typography
        style={{ cursor: "help", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <span style={{ fontSize: "70%" }}>
          {typeof prvniTitul === "undefined" ? "" : prvniTitul + "\xa0"}
        </span>
        {params.getValue(params.id, "j") || ""}&nbsp;
        <strong>{params.getValue(params.id, "p") || ""}</strong>&nbsp;
        <span style={{ fontSize: "70%" }}>
          {params.getValue(params.id, "t2") || ""}
        </span>
      </Typography>
    </Tooltip>
  );
};

const ukazPovolani = (params) => {
  return (
    <Tooltip arrow enterTouchDelay={0} title={params.getValue(params.id, "z")}>
      <span
        style={{
          fontSize: "70%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "help",
        }}
      >
        {params.getValue(params.id, "z")}
      </span>
    </Tooltip>
  );
};

const Tablica = ({ vybraniVybraniKandidati, classes, isMobile, ciselniky }) => {
  const columns = [
    {
      field: "c",
      headerName: "#",
      description: "pořadí na kandidátce",
      type: "number",
      flex: 1,
      minWidth: 70,
      disableColumnMenu: true,
    },
    {
      field: "fullName",
      headerName: "Celé jméno",
      // valueGetter: getFullName,
      // valueFormatter: getFullName,
      renderCell: getFullName,
      sortComparator: (v1, v2, cellParams1, cellParams2) =>
        cellParams1.api
          .getCellValue(cellParams1.id, "p")
          .localeCompare(
            cellParams1.api.getCellValue(cellParams2.id, "p"),
            "cs-CZ"
          ),
      flex: 3,
      minWidth: 140,
    },
    {
      field: "k",
      headerName: "Kraj",
      description: "volební kraj",
      valueGetter: (params) => {
        const kraj = ciselniky.kraje.filter((k) => k.VOLKRAJ === params.value);
        return kraj[0].NAZVOLKRAJ;
      },
      disableColumnMenu: true,
      minWidth: 100,
      flex: 2,
    },
    {
      field: "n",
      headerName: "Strana",
      description: "navrhující strana",
      renderCell: (params) => {
        const strana = ciselniky.nstrany.filter(
          (s) => s.NSTRANA === params.value
        )[0];
        return (
          <Tooltip arrow enterTouchDelay={0} title={strana.ZKRATKAN30}>
            <Typography
              style={{
                cursor: "help",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {strana.ZKRATKAN8}
            </Typography>
          </Tooltip>
        );
      },
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "a",
      headerName: "Věk",
      type: "number",
      flex: 1,
      disableColumnMenu: true,
      minWidth: 90,
    },
    {
      field: "z",
      headerName: "Povolání",
      flex: 4,
      renderCell: ukazPovolani,
      minWidth: 120,
    },
    {
      field: "b",
      headerName: "Bydliště",
      description: "bydliště kandidáta",
      flex: 3,
      minWidth: 120,
    },

    {
      field: "t1",
      headerName: "Titul před jménem",
      flex: 1,
      hide: true,
    },
    {
      field: "j",
      headerName: "Jméno",
      flex: 2,
      hide: true,
    },
    {
      field: "p",
      headerName: "Příjmení",
      flex: 2,
      hide: true,
    },
    {
      field: "t2",
      headerName: "Titul za jménem",
      flex: 1,
      hide: true,
    },

    {
      field: "o",
      headerName: "Počet obyvatel",
      flex: 2,
      hide: true,
      type: "number",
    },
  ];

  return (
    <div className={classes.tabulka}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            autoHeight
            localeText={csCZ.props.MuiDataGrid.localeText}
            density={"compact"}
            rows={vybraniVybraniKandidati}
            columns={columns}
            pageSize={isMobile ? 10 : 20}
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default Tablica;
