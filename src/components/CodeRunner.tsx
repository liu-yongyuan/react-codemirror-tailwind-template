import React, { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function CodeRunner({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html><body>
          <script>
            try {
              \${code}
            } catch (e) {
              console.error(e);
            }
          <\/script>
          </body></html>
        `);
        doc.close();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CodeMirror
        value={code}
        height="200px"
        extensions={[javascript()]}
        onChange={(val) => setCode(val)}
      />
      <button
        onClick={runCode}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        运行代码
      </button>
      <iframe ref={iframeRef} sandbox="allow-scripts" className="w-full h-40 border" />
    </div>
  );
}
