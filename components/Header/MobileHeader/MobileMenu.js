import styled from 'styled-components';

const MobileMenu = styled.div`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 80px;
  box-sizing: border-box;
  box-shadow: 0px 3px 49px 0px rgba(24, 38, 107, 0.16);
  left: 0;
  background: white;
  padding: 20px;
  width: 100%;
  z-index: 10;
`;

export default MobileMenu;
