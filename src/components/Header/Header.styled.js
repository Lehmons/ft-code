// ****************************************/
// Header
// ****************************************/

import styled from "styled-components";
import { font, media, underline } from "../Styles";

const HeaderStyles = styled.header`
  position: fixed;
	width: 100%;
	height: 6rem;
	background: ${props => props.theme.pink100};
	${media.smallDesktopAndBelow`
		height: 60px;
	`}

	.logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export default HeaderStyles;
