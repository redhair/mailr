import styled from 'styled-components';

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  /* top: 80px; */
  left: ${(props) => (props.open ? '0px' : '-340px')};

  box-sizing: border-box;
  /* box-shadow: 0px 3px 49px 0px rgba(24, 38, 107, 0.16); */
  background: ${(props) => props.theme.blackBlue};
  padding: 20px;
  width: 85vw;
  max-width: 340px;
  height: 100vh;
  /* z-index: 10; */
  top: 0;
  bottom: 0;
  z-index: 3;
  transition: left 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export default MobileMenu;
