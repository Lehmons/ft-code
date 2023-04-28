// ****************************************/
// Home
// ****************************************/

import styled from "styled-components";
import { font, media, underline } from "../Styles";
import  { motion } from 'framer-motion';

const HomeStyles = styled(motion.section)`
  background: ${props => props.theme.white};
`;

export default HomeStyles;
