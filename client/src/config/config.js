import moment from 'moment';

moment.locale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s",
        s:  "s",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1mth",
        MM: "%dmth",
        y:  "1y",
        yy: "%dy"
    }
});

const config = {
  defaultPaletteColors: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
    },
    secondary: {
      light: '#ffff6e',
      main: '#009688',
      dark: '#009692',
    },
  },
}

export default config;
