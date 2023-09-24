import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`
