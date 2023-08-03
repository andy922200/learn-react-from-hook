import styled from "@emotion/styled"

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({theme}) => theme.textColor };;
  svg{
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

export default Refresh