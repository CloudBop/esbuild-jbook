import MonacoEditor, {
  // type definition
  EditorDidMount,
} from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  // using typedef to annotate arity
  const onEditorDidMount: EditorDidMount = (
    // current string value editor is set to
    getValue,
    // monacoEditorRef
    monacoEditor
  ) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      // console.log(getValue());
      onChange(getValue());
    });
    // set tab size
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
  const onFormatClick = () => {
    //get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set formatted value
    editorRef.current.setValue(formatted);
  };
  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue} //-really an initial value
        // see monaco type defs - beware, its huge
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          // don't fade unused
          showUnused: false,
          // collapse right hand side of line numbers
          folding: false,
          //collapse left hand side of line numbers
          lineNumbersMinChars: 3,
          //
          fontSize: 16,
          scrollBeyondLastLine: false,
          // redraw layout changes
          automaticLayout: true,
        }}
        // includes syntax-highlight, intellisense ect
        language={"javascript"}
        theme={"dark"}
        height={"500px"}
      />
    </div>
  );
};

export default CodeEditor;
