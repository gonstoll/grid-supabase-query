import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      fontFamily: string;
      fontSize: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    containerMaxWidths: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
      text: string;
      primary: string;
    };
  }
}
