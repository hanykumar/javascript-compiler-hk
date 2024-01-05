'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MonacoEditorComponent = dynamic(() => import('../components/MonacoEditorComponent'), {
  ssr: false, // Disable server-side rendering
});

const Home = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const compileCode = () => {
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
  };
  

  return (
    <div className='flex flex-col'>
      <div style={{ height: '50px' }}>
        Compiler
      </div>
      <div className='flex h-100'>
        <div style={{ height: `calc(100vh - 50px)`, width: '50%', overflow: 'auto' }}>
          <MonacoEditorComponent code={code} onChange={handleCodeChange} />
        </div>
        <div className='p-4' style={{ height: '100%', width: '50%', overflow: 'auto' }}>
          <button className='bg-green-500 px-3 py-1 rounded' onClick={compileCode}>Execute</button>
          {
            output ?
              <div>
                <h2>Output:</h2>
                <div className='p-2 rounded bg-gray-800'>
                  <pre>{output}</pre>
                </div>
              </div> : null
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
