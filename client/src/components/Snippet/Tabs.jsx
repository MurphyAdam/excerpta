import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const AntTabs = withStyles({
  root: {
    minHeight: 'fit-content',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  scroller: {
    height: 'fit-content',
  },
})(Tabs);

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
      color: '#fff',
      opacity: 1,
    },
    '&$selected': {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#fff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
