import styled from 'styled-components';

const MobileMenuBackdrop = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(13, 15, 20, 0.6);
  width: 100%;
  height: ${(props) => (props.open ? '100%' : 0)};
  display: flex;
  position: absolute;
  z-index: ${(props) => (props.open ? 11 : -10)};
  top: 0;
  left: 0;
  opacity: ${(props) => (props.open ? 100 : 0)};
  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);

  @media (min-width: ${(props) => props.theme.xs}) {
    width: 100%;
  }
`;

export default MobileMenuBackdrop;
