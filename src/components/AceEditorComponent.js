// components/AceEditorWithIntelliSense.js
import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const AceEditor = dynamic(() => import('react-ace'), {
  ssr: false,
});

const AceEditorComponent = ({ code, onChange }) => {
  const editorRef = useRef(null);

  // useEffect(() => {
  //   // Set up Ace Editor language tools
  //   const langTools = ace.require('ace/ext/language_tools');
  //   langTools.setCompleters([
  //     {
  //       getCompletions: function (editor, session, pos, prefix, callback) {
  //         // Basic completion example
  //         const completions = [
  //           { value: 'console.log', score: 100, meta: 'function' },
  //           { value: 'alert', score: 90, meta: 'function' },
  //           { value: 'if', score: 80, meta: 'keyword' },
  //           // Add more completions as needed
  //         ];

  //         callback(null, completions);
  //       },
  //     },
  //   ]);
  // }, []);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={onChange}
      value={code}
      name="ace-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
      width="100%"
      height="100%"
      fontSize={14}
      showPrintMargin={true}
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default AceEditorComponent;
