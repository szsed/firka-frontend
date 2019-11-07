import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    rigth: 0,
    bottom: 0,
    left: 0,
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      className={classes.root}
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
      aria-label="icon label tabs example"
    >
      <Tab icon={<DashboardRoundedIcon />} label="Főoldal" />
      <Tab icon={<TrendingUpRoundedIcon />} label="Ranglista" />
      <Tab icon={<ContactSupportRoundedIcon />} label="Szabályok" />
    </Tabs>
  );
}