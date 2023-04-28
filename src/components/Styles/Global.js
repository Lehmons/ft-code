// ****************************************/
// Global Styles & Resets
// ****************************************/

import { createGlobalStyle } from "styled-components";
import media from "./Media";
import font from "./Font";
import animation from "./Animation";

const GlobalStyles = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
	}


	html{
		box-sizing: border-box;
		-webkit-print-color-adjust: exact;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

	*, *:before, *:after{
		box-sizing: inherit;
	}

	body,h1,h2,h3,h4,p{
		border: 0;
	}

	body {
		line-height: 1;
    font-family: ${font.family100};
    background: var(--colourTwo);
	};

	::selection{
		background: ${(props) => props.theme.selectionHighlightColor};
		color: ${(props) => props.theme.selectionColor};
	}

	#site .temporary-disable-scroll,
	.temporary-disable-scroll{
		overflow: hidden;
	}

  button:focus {
    outline: none;
  }

	#site{
		margin-left: auto;
		margin-right: auto;
	}

  .page {
    position: relative;
    width: 100%;
    height: 100%;
  }

  html,body {
    height: 100%;
  }

  a,
  a:hover {
    cursor: pointer;
  }


	button {
		border: 0;
    font-family: ${font.family100};
    background: transparent;
	}

  fieldset {
    border: 0;
  }

	.flexwrap main,
	.flexwrap-item{
		flex: 1;
	}

	.main-wrapper{
		background: white;
		width: 100%;
	}

	body, h1,h2,h3,h4,p,a, ul, ol{
		text-rendering: optimizelegibility;
		-webkit-font-smoothing: antialiased;
		-ms-text-size-adjust: 100%;
		color: ${(props) => props.theme.black};
		letter-spacing: ${font.letterSpacing};
		${media.smallDesktopAndBelow`
			letter-spacing: ${font.letterSpacingMobile};
		`}
	}

	a {
		outline: 0;
		text-decoration: none;
	}

	ul{
		text-decoration: none;
		list-style-type: none;
		padding: 0;
	}

	.no-select{
		user-select: none;
	}

	.page-context{
		position: relative;
		font-size: 0;
	}

	button:hover {
		cursor: pointer;
	}

	.disabled{
		pointer-events: none;
	}

  input {
    -webkit-appearance: none;
  };

  input[type="password"]{
    font-family: arial;
    letter-spacing: 0.3rem;
    ${media.smallDesktopAndBelow`
      letter-spacing: 3px;
    `};
  }

  input:-webkit-autofill div {
    padding-left: 1.2rem;
    ${media.smallDesktopAndBelow`
      padding-left: 12px; 
    `}
  }

  img[alt] {
    border: none;
    outline: none;
    color: white;
  }

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
    padding-left: 1.2rem;
		-webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.grey100} inset;
		transition: background-color 5000s ease-in-out 0s;
    ${media.smallDesktopAndBelow`
      padding-left: 12px;
    `};
	}

	h1, h2, h3, h4, h5, h6, p, a, li, span, input, label, button, em, figcaption{
		text-rendering: optimizelegibility;
		-webkit-font-smoothing: antialiased;
		-webkit-text-size-adjust: 100%;
		-ms-text-size-adjust: 100%;
		font-weight: normal;
		font-feature-settings: "kern" 1;
	}

	html, body{
		font-size:  ${(props) =>
      (props.theme.baseline * 100) / props.theme.viewport}vmax;
		/* font-size: 0.694vmax */
		/* 1440px times 0.694 = 10px base */
	}

`;

export default GlobalStyles;
