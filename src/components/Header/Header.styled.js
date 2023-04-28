// ****************************************/
// Header
// ****************************************/

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const HeaderStyles = styled.header`
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8.8rem;
  background: ${(props) => props.theme.pink100};
  ${media.smallDesktopAndBelow`
		height: 88px;
	`}

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 50rem;
    ${media.smallDesktopAndBelow`
		max-width: 250px;
    `}
    ${media.tabletPortraitAndBelow`
		max-width: 200px;
    `}
  }

  svg {
    position: relative;
  }

  .nav-column {
    margin-left: 1rem;
    ${media.smallDesktopAndBelow`
      margin-left: 10px;
    `}
  }

  .hamburger .search {
    display: flex;
    position: flex-start;
  }

  .search {
    margin-left: 2rem;
    ${media.smallDesktopAndBelow`
      margin-right: 20px;
    `}
    ${media.tabletPortraitAndBelow`
      display: none;
    `}
  }

  .myFT {
    display: flex;
    position: flex-end;
    margin-right: 1rem;
    ${media.smallDesktopAndBelow`
      margin-right: 10px;
    `}
  }
`;

export default HeaderStyles;
