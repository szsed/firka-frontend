import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';

const useStyles = makeStyles({
  root: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    minHeight: "90vh",
  }
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root} >
    <Tabs
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
  </Paper>
  );
}