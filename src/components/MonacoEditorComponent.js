import React, { useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

const MonacoEditorComponent = ({ code, onChange }) => {
  const editorRef = useRef(null);
  

  // Monaco Editor options
  const options = {
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
    // Custom token colorizations
    // tokenColorCustomizations: {
    //   textMateRules: [
    //     {
    //       scope: 'keyword',
    //       settings: {
    //         foreground: '#569CD6', // VSCode's default keyword color
    //       },
    //     },
    //     {
    //       scope: 'variable',
    //       settings: {
    //         foreground: '#9CDCFE', // VSCode's default variable color
    //       },
    //     },
    //     // Add more rules for other syntactic elements
    //   ],
    // },
  };

  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.editor.setValue(code);
  //   }
  // }, [code]);

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
    />
  );
};

export default MonacoEditorComponent;
