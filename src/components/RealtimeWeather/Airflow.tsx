import styled from "@emotion/styled"

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${( { theme }) => theme.textColor };
  margin-bottom: 20px;
  svg{
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

export default AirFlow