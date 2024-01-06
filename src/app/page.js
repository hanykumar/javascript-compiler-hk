// pages/index.js
"use client";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const AceEditor = dynamic(() => import('react-ace'), {
  ssr: false,
});


const Home = () => {
  const [code, setCode] = useState('//start writing code here\n');
  const [output, setOutput] = useState('Output: ');

  const newCompileCode = () => {
    localStorage.removeItem('javascript-compiler-code');
    setCode('//start writing code here\n');
    setOutput('Output: ');
  };

  const saveCompileCode = () => {
    localStorage.setItem('javascript-compiler-code', code);
  };

  // Remove the useEffect that might be causing the issue
  // useEffect(() => {
  //   compileCode(code);
  // }, [code, compileCode]);

  const compileCode = useCallback(() => {
    if (code) {
      try {
        const logEntries = [];
        const customLogger = (...args) => {
          logEntries.push(args.join(' '));
        };

        // Save the original console.log and override it
        const originalLog = console.log;
        console.log = customLogger;

        try {
          // Execute the code
          eval(code);
          setOutput(logEntries.join('\n'));
        } catch (err) {
          setOutput(`Error: ${err.message}`);
        } finally {
          // Restore the original console.log
          console.log = originalLog;
        }
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    }
  }, [code]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Add this line to manually trigger compilation when the code changes
    // compileCode(newCode);
  };

  useEffect(() => {
    const storedCode = localStorage.getItem('javascript-compiler-code');
    if (storedCode) {
      setCode(storedCode);
      // compileCode();
    } else {
      setCode('// start writing code here\n');
    }
  }, []);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', 
         margin: '5px 10px' }}
      >
        <div className='title'>JavaScript Compiler by Hany Kumar</div>
        <div style={{ display: 'flex' }}>
          <button className='button button-execute' onClick={compileCode}>Execute</button>
          <button className='button button-save' onClick={saveCompileCode}>Save</button>
          <button className='button button-new' onClick={newCompileCode}>Clear</button>
        </div>
      </div>
      <div className='editor-container'>
        <div className='editor'>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={handleCodeChange}
            value={code}
            name="ace-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
            width="100%"
            height="100%"
            fontSize={14}
            showPrintMargin={true}
            setFocus={true}
          // editorDidMount={handleEditorDidMount}
          />
        </div>
        <div className='output-container' >
          {output ? (
            <div className='output'>
                <pre>{output}</pre>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
