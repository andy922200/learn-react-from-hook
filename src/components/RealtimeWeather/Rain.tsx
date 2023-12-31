import styled from "@emotion/styled"

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor };;
  svg{
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

export default Rain