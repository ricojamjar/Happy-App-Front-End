import React from "react";
import styled from "styled-components";
import MenuButton from "./MenuButton";

const HeaderWrapper = styled.View`
  height: 70;
  background-color: #feeec1;
`;

export default function BurgerMenuHeader(props) {
  const { navigation } = props;
  return (
    <HeaderWrapper>
      <MenuButton navigation={navigation} />
    </HeaderWrapper>
  );
}
