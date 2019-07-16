import React from "react";
import styled from "styled-components";

const DrinkWrapper = styled.Text`
  text-align: center;
  flex: 1;
  font-size: 16;
  font-weight: 700;
`;

export default function Drink(props) {
  const { drink } = props;
  return <DrinkWrapper>{drink}</DrinkWrapper>;
}
