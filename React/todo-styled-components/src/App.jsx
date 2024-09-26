import styled from "styled-components";
import { Button } from "./components/commons/Button";
import { ButtonV2 } from "./components/commons/ButtonV2";
import {
  Button_OW_Style,
  Button_OW_StyleV2,
} from "./components/commons/ButtonOverwrittenStyle";

//M1 to create styled-components
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
`;
const Title = styled.h1`
  color: palevioletred;
  text-align: center;
  font-size: 1.5em;
`;

function App() {
  return (
    <Wrapper>
      {/* 'Wrapper': an styled-component */}
      <Title>Hello this is styled-component</Title>
      {/* another styled-component */}
      <Button>Click</Button>
      {/* imported styled component */}
      <ButtonV2>Click !</ButtonV2>
      <ButtonV2 primary={true}>Click !</ButtonV2>
      {/* styled component(s) with prpops */}
      <Button_OW_Style>Style OW</Button_OW_Style>
      {/* overwriting existing styles with new styles */}
      <Button_OW_StyleV2>Style OW props</Button_OW_StyleV2>
      <Button_OW_StyleV2 propName={false}>Style OW props</Button_OW_StyleV2>
      <Button_OW_StyleV2 propName={true}>Style OW props</Button_OW_StyleV2>
      {/* overwriting existing styles with new styles */}
    </Wrapper>
  );
}

export default App;
