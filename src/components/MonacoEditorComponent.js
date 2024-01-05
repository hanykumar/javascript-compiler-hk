import React, { useRef, useEffect } from 'react';
import MonacoEditor, { monaco } from 'react-monaco-editor';

const MonacoEditorComponent = ({ code = "", onChange }) => {
    // const editorRef = useRef(null);

    // useEffect(() => {
    //     if (editorRef.current) {
    //         const editor = editorRef.current;

    //         // Set up the initial code
    //         editor.setValue(code);

    //         // Set up the event listener for code changes
    //         const disposeOnChange = editor.onDidChangeModelContent(() => {
    //             onChange(editor.getValue());
    //         });

    //         // Cleanup function
    //         return () => {
    //             // Dispose the event listener when the component is unmounted
    //             disposeOnChange.dispose();
    //         };
    //     }
    // }, [code, onChange]);

    // Monaco Editor options
    const options = {
        automaticLayout: true,
        fontSize: 14,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        // ... other options
        wordWrap: 'on',
        cursorBlinking: 'smooth',
        // ... other options
        // Example: Keybindings customization
        // See https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#keybindings
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.LeftArrow,
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.RightArrow,
        ],
      };


    const handleEditorChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <MonacoEditor
            // ref={editorRef}
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={handleEditorChange}
            // editorDidMount={(editor) => {
            //     editorRef.current = editor;
            // }}
        />
    );
};

export default MonacoEditorComponent;
