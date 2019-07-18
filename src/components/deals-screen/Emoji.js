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

export default function Emoji({ type }) {
  return (
    <EmojiWrapper>
      {type === "Beer" ? <EmojiIcon>🍺️</EmojiIcon> : null}
      {type === "Wine" ? <EmojiIcon>🍷️</EmojiIcon> : null}
      {type === "Spirits" ? <EmojiIcon>🥃️</EmojiIcon> : null}
      {type === "Cocktail" ? <EmojiIcon>🍸️</EmojiIcon> : null}
      {type === "Non-alcoholic" ? <EmojiIcon>🥛️</EmojiIcon> : null}
    </EmojiWrapper>
  );
}
