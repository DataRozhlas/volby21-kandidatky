import React from "react";

import { Button } from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";

const VybratVse = ({ items, filtr, setFiltr, classes }) => {
  const theme = useTheme();

  const handleClick = (variant, items, filtr, setFiltr) => {
    if (variant === "zrušit vše") {
      const settings = items.reduce((o, key) => ({ ...o, [key]: false }), {});
      setFiltr({ ...filtr, ...settings });
    } else {
      const settings = items.reduce((o, key) => ({ ...o, [key]: true }), {});
      setFiltr({ ...filtr, ...settings });
    }
  };

  const makeLink = (variant) => {
    return (
      <Button
        size="small"
        variant="text"
        color="secondary"
        disableRipple={true}
        className={classes.vybratVse}
        onClick={() => handleClick(variant, items, filtr, setFiltr)}
      >
        {variant}
      </Button>
    );
  };

  const itemValues = items.map((i) => filtr[i]);

  return (
    <div>
      {!itemValues.some(Boolean)
        ? makeLink("vybrat vše")
        : makeLink("zrušit vše")}
    </div>
  );
};

export default VybratVse;
