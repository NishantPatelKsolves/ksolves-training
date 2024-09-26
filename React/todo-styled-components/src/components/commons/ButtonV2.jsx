import styled from "styled-components";

export const ButtonV2 = styled.button`
  margin: 1em;
  border: 2px solid #663399;
  border-radius: 3px;
  padding: 0.25em 1em;
  font-size: 1em;
  background: ${(props) => (props.primary ? "#663399" : "white")};
  color: ${(props) => (props.primary ? "white" : "#663399")};
`;
