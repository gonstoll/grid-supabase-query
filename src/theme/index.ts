import {DefaultTheme} from 'styled-components';

const black = '#343d46';
const white = '#f6f8fa';

export const theme: DefaultTheme = {
  font: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
  },

  breakpoints: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px',
  },

  containerMaxWidths: {
    xs: '100%',
    sm: '500px',
    md: '720px',
    lg: '930px',
    xl: '1140px',
  },

  colors: {
    text: black,
    primary: white,
  },
};
