import React from "react";
import styled from "styled-components";

const EmojiWrapper = styled.Text`
  margin: auto 0px;
  flex: 1;
  text-align: center;
  width: 35;
  height: 35;
  font-size: 30;
`;

const EmojiIcon = styled.Text`
  flex: 1;
  line-height: 35;
`;

export default function Emoji(props) {
  const { type } = props;
  return (
    <EmojiWrapper>
      <EmojiIcon>🍸</EmojiIcon>
    </EmojiWrapper>
  );
}
