import { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor"
import prism from "prismjs";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
function App() {
  const [code , setCode] = useState(` function sum() {
    return 1+1
  }`);

  const [review , setReview] = useState("");
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

 async function reviewCode() {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/ai/get-review`,
        { code }
      );
      setReview(response.data);
    } catch (err) {
      setReview("❌ Failed to fetch review. Please try again.");
      console.error(err);
    }
    setLoading(false); // Stop loading
  }

  return (
    <>
      <div className="main">
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}> {loading ? <ClipLoader size={20} color="#fff" /> : "Review"}</div>
        </div>
        <div className="right">
          {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <ClipLoader size={40} />
            <p>Analyzing code, please wait...</p>
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
         </div>
      </div>
    </>
  );
}

export default App;
