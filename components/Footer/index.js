import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Heading, Text } from '../Typography';
import { Container, Row, Column } from '../Grid';

Footer.propTypes = {};
const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-top: 1px solid #bbbcdd;
  padding: 50px 20px;
  a {
    text-decoration: none;
    color: black;
    transition: all 120ms ease-in-out;

    &:hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;
const SocialLinks = styled(Row)`
  position: relative;
  padding: 25px 0 50px;

  & a {
    margin: 0;
    cursor: pointer;
  }

  & i {
    margin: 0 15px;
    font-weight: normal;
  }

  &::before,
  &::after {
    content: '';
    height: 1px;
    border-bottom: 0px solid ${(props) => props.theme.primaryColor};
    top: 0;
    width: 100%;
  }

  &::before {
    margin-left: -30px;
    margin-right: 25px;
  }

  &::after {
    margin-right: -30px;
    margin-left: 25px;
  }
`;
const SocialIcon = styled.i`
  margin: 12px;
`;
const LinkSection = styled(Column)`
  & a {
    margin: 0 12px;
  }
`;
function Footer(props) {
  return (
    <FooterWrapper>
      <Row>
        <Container>
          <Link href="/">
            <a>
              <Heading style={{ marginBottom: '36px' }} level={2}>
                mailr
              </Heading>
            </a>
          </Link>
        </Container>
      </Row>

      <SocialLinks justify="center">
        <a href="#">
          <SocialIcon className="fab fa-lg fa-facebook"></SocialIcon>
        </a>
        <a href="https://twitter.com/mailrlink">
          <SocialIcon className="fab fa-lg fa-twitter"></SocialIcon>
        </a>
        <a href="#">
          <SocialIcon className="fab fa-lg fa-instagram"></SocialIcon>
        </a>
      </SocialLinks>
      <LinkSection>
        <Row justify="center">
          <Link href="/about">
            <a>
              <Text>About</Text>
            </a>
          </Link>
          <Link href="/privacy">
            <a>
              <Text>Privacy</Text>
            </a>
          </Link>
          <Link href="/terms">
            <a>
              <Text>Terms</Text>
            </a>
          </Link>
        </Row>
      </LinkSection>
      <Row>
        <Container>
          <br />
          <Text style={{ fontSize: '12px' }}>&copy; {new Date().getFullYear()} mailr</Text>
        </Container>
      </Row>
    </FooterWrapper>
  );
}

export default Footer;
