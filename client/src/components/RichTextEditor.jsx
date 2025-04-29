import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ input = {}, setInput }) => {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: input?.description || "",
    onUpdate: ({ editor }) => {
      setInput({ ...input, description: editor.getHTML() });
    },
    onFocus: () => setIsFocused(true),
    onBlur: ({ editor }) => {
      if (editor.getText().trim() === "") setIsFocused(false);
    },
  });

  return (
    <div className="border p-3 rounded-md relative h-40 overflow-y-auto">
      {/* Placeholder effect */}
      {!isFocused && !input?.description && (
        <p className="absolute top-3 left-3 text-gray-400 select-none pointer-events-none">
          Start writing here...
        </p>
      )}

      <div className="h-full">
        <EditorContent editor={editor} className="w-full h-full" />
      </div>
    </div>
  );
};

export default RichTextEditor;
