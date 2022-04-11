import styled from 'styled-components';

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${props => props.bgColor};
  width:200px;
  height:200px;
  border-radius:100px;
  border: 2px solid ${props => props.borderColor};
`

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "none" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
