import { ButtonV2 } from "./ButtonV2";
import styled from "styled-components";
export const Button_OW_Style = styled(ButtonV2)`
  border-color: #003547;
  background: white;
  color: #003547;
`;

export const Button_OW_StyleV2 = styled(ButtonV2)`
  border-color: #520120;
  background: ${(props) => (props.propName ? "#520120" : "white")};
  color: ${(props) => (props.propName ? "white" : "#520120")};
`;
