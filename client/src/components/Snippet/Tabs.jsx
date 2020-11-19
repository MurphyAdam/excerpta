import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const AntTabs = withStyles((theme) => ({
  root: {
    minHeight: 'fit-content',
  },
  indicator: {
    backgroundColor: theme.palette.getContrastText(theme.palette.background.paper),
  },
  scroller: {
    height: 'fit-content',
  },
}))(Tabs);

export const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    minHeight: 35,
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.background.paper),
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.getContrastText(theme.palette.background.paper),
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
