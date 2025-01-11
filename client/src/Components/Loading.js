// Loading.js
import React, { useState, useEffect } from "react";
import "./Loading.css";

const Loading = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [step, setStep] = useState(0);
  const files = [
    { name: "api", type: "folder", children: [
      { name: "node_modules", type: "folder" },
      { name: "models", type: "folder" },
      { name: "uploads", type: "folder" },
      { name: "middlewares", type: "folder" },
      { name: ".env", type: "lock" },
      { name: "server.js", type: "file" },
      { name: "index.js", type: "file" },
      { name: "package.json", type: "file" }
    ]},

    { name: "client", type: "folder", children: [
      { name: "src", type: "folder", children: [
        { name: "Pages", type: "folder", children: [
          { name: "Home.js", type: "file", active: true  },
          { name: "About.js", type: "file" }
        ]},
        { name: "Components", type: "folder", children: [
          { name: "Navbar.js", type: "file" },
          { name: "Footer.js", type: "file" }
        ]},
        { name: "Hooks", type: "folder"},
        { name: "Routes", type: "folder"},
        { name: "Layouts", type: "folder"},
        { name: "Services", type: "folder"},
        { name: "Utils", type: "folder"},
        { name: "i18n", type: "folder"},
        { name: "App.js", type: "file"},
        { name: "App.css", type: "file"},
        { name: "index.js", type: "file"},
        { name: "index.css", type: "file"},
      ]}
    ]},    
  ];

  const fakeCode = [
    "// Daha iyi bir deneyim için bilgisayarınız ile görüntüleyiniz!",
    "import React from 'react';",
    "import Loading from './Components/Loading';",
    " ",
    "const Home = () => {",
    "const [isLoading, setIsLoading] = useState(true);",
    "  return (",
    "    <div>",
    "      {isLoading ? (", 
    "        <Loading onComplete={() => setIsLoading(false)} />",
    "      ) : (",
    "        <div>",
    "          Hello, World!",
    "        </div>",
    "      )}",
    "    </div>",
    "  );",
    "};",
    " ",
    "export default Home;",
    " ",
    "// Daha iyi bir deneyim için bilgisayarınız ile görüntüleyiniz!",
  ];

  const successTerminal = [
    "You can now view client in the browser.",
    "  Local:            http://localhost:3000",
    "  On Your Network:  http://172.16.0.2:3000",
    "br",
    "Note that the development build is not optimized.",
    "To create a production build, use npm run build.",
    "br",
    "webpack compiled successfully"
  ];

  const terminalOutput = [
    "\n>start",
    "\n>nodemon server.js",
    "\n ",
    "\n[nodemon] starting `node server.js index.js`",
    "\nServer running on port 3030",
    "\nConnected to MongoDB",
  ];

  useEffect(() => {
    if (step === 0) {      
      const text = "npm start...";
      let index = 0;
      let displayedText = "";

      const interval = setInterval(() => {
        displayedText += text[index];
        setDisplayedText(displayedText);
        index++;

        if (index === text.length) {
          clearInterval(interval);

          setTimeout(() => {
            setStep(1);
          }, 1000);
        }
      }, 100);

      return () => clearInterval(interval);
    } else if (step === 1) {
      let index = 0;
      let displayedText = "";

      const interval = setInterval(() => {
        displayedText += terminalOutput[index];
        setDisplayedText(displayedText);
        index++;

        if (index === terminalOutput.length) {
          clearInterval(interval);
          setStep(2);
        }
      }, 1000);

      return () => clearInterval(interval);

    } else if (step === 2) {
      const timer = setTimeout(() => {
        // Loading ekranını geçmek için
        if (onComplete) onComplete();
      }, 2000);

      return () => clearTimeout(timer);      
    }
  }, [step, onComplete]);

  function FileItem({ file }) {
    return (
      <div className={`file-item ${file.type} ${file.active ? "active" : ""}`}>
        <div className="file-name">
          {file.type === "folder" && (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#fce566"
            className="bi bi-folder"
            viewBox="0 0 14 14"
          >
            <path
              fillRule="evenodd"
              d="M.5 1a.5.5 0 0 1 .5-.5h3.775l.75.75H15.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5V1z"
            />
            </svg>
          )}
          {file.type === "file" && (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#fff"
            className="bi bi-file-earmark-code"
            viewBox="0 0 14 14"
          >
            <path
              fillRule="evenodd"
              d="M11.5 0a.5.5 0 0 1 .5.5V1h2.5a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 .354-.854H11V.5a.5.5 0 0 1 .5-.5z"
            />
            <path
              fillRule="evenodd"
              d="M11 1v2.793l-1-1V1h1z"
            />
            <path
              fillRule="evenodd"
              d="M1.5 1a.5.5 0 0 1 .5-.5h3.775l.75.75H13.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5V1z"
            />
            </svg>
          )}
          {file.type === "lock" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 14 14">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
            </svg>
          )}
          {file.name}
        </div>
        {file.children && (
          <div className="sub-items">
            {file.children.map((child, index) => (
              <FileItem key={index} file={child} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="loading-screen">
      <div className="vscode">
        <div className="Loading-left">
          <div className="Loading-sidebar">
            {files.map((file, index) => (
              <FileItem key={index} file={file} />
            ))}
          </div>
        </div>

        <div className="Loading-right">
          <div className="code-area">
            {fakeCode.map((line, index) => (
              <pre key={index} className="code-line">
                {line}
              </pre>
            ))}
          </div>
          
          <div className="consoles">
            <div className="console">
              { step === 0 ? (
                <>
                  <p className="console-line low-width-content">
                    {/* PS C:\Users\Berkay\Dev\Primary\Portfolio\api */}
                  </p> 
                  <span className="console-text">
                    {displayedText}
                  </span>
                </>
              ) : (
                <>
                  {displayedText.split("\n").map((line, index) => (
                    <p key={index} className="console-line">
                      {line}
                    </p>
                  ))}
                </>
              )}
            </div>

            <div className="console2">
              {successTerminal.map((line, index) => (
              <p
                key={index}
                className="console-line"
                style={{
                  color: line.includes("run build") ? "#3aa7db" : line.includes("successfully") ? "#00e676" : "#ffffff",
                }}
              >
                {line === "br" ? <br /> : line}
              </p>
              ))}
            </div>

            <div className="console-selec-area">
              <span className="terminal-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16">
                  <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
                  <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                </svg>
                node
              </span>

              <span className="terminal-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16">
                  <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
                  <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                </svg>
                node
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;