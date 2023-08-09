import styled from "@emotion/styled"

interface RefreshProps {
    isLoading: boolean;
}

const Refresh = styled.div<RefreshProps>`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({theme}) => theme.textColor };
  svg{
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({isLoading}) => isLoading ? "1.5s" : "0s"};
  }

  @keyframes rotate {
    from {
        transform: rotate(360deg);
    }
    to {
        transform: rotate(0deg);
    }
  }
`;

export default Refresh