import React, { useCallback, useEffect } from "react";
import { MacroEditorComp } from "@flyde/core";
import { Comment2Config } from "./Comment2.flyde";
import { Callout } from "@blueprintjs/core";

export const MacroEditor: MacroEditorComp<Comment2Config> = ({
  value,
  onChange,
}) => {
  const { content } = value;
  const changeValue = useCallback(
    (_val) => {
      onChange({ content: _val });
    },
    [content, onChange]
  );

  useEffect(() => {
    onChange({ content });
  }, [content, onChange]);

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => changeValue(e.target.value)}
        placeholder="Enter your comment here (HTML supported)"
        rows={10}
        style={{ width: "100%", padding: "8px 6px" }}
      />
      <Callout intent="primary" icon={null}>
        HTML formatting is supported
      </Callout>
    </div>
  );
};

export default MacroEditor;
