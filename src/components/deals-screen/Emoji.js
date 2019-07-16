import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  margin: auto 0px;
  flex: 1;
  text-align: center;
  width: 90;
  height: 90;
  font-size: 70;
`;

const EmojiIcon = styled.Text`
  flex: 1;
  line-height: 90;
`;

export default function Emoji(props) {
  const { type } = props;
  return (
    <EmojiWrapper>
      <EmojiIcon>🍸</EmojiIcon>
    </EmojiWrapper>
  );
}
