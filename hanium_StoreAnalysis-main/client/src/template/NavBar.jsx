import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  line-height: 2.8;
  height: 100%;
  background-color: #274f70;
  color: white;
  padding: 0px 30px;
  z-index: 10;
`;

const LogoLink = styled.a`
  font-family: "NanumSquareNeo";
  font-weight: 700;
  color: white;
  text-decoration: none;
  font-size: 30px;
  margin: 0px 0px 0px 2px;
  position: fixed;
  &:hover {
  }
`;

function NavBar() {
  return (
    <NavbarContainer>
      <LogoLink href="/">상권 분석</LogoLink>

      <div
        style={{
          marginTop: "20px",
          marginRight: "20px",
          flex: "1",
          textAlign: "right",
          height: "100%",
          zIndex: "10",
        }}
      >
        <i
          id="info"
          title="도움말"
          class="fas fa-question-circle"
          style={{ fontSize: "24px" }}
        ></i>
      </div>
    </NavbarContainer>
  );
}

export default NavBar;
