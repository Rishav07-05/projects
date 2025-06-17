import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
// import { useUser } from "@clerk/clerk-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import Compiler from "./components/Compiler";
import Navbar from "./components/Navbar";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
];

type AnalysisResult = {
  optimizedCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  suggestions: string[];
  score: number;
  summary: string;
  potentialBugs: string[];
  bestPractices: string[];
  edgeCases: string[];
};


const Dashboard = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [optimizedCode, setOptimizedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [analysis, setAnalysis] = useState<AnalysisResult>();
  const [activeTab, setActiveTab] = useState("optimized");


  const handleOptimizeCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are an expert code analyzer that provides detailed optimization suggestions. For the provided ${language} code:

1. FIRST analyze and understand the original code completely
2. THEN generate an optimized version that:
   - Improves time/space complexity
   - Follows best practices
   - Maintains identical functionality
3. Provide detailed explanations for each optimization
4. Return STRICT JSON format with these fields:
{
  "optimizedCode": "The complete optimized version of the code with comments explaining key changes",
  "timeComplexity": "Detailed Big O analysis with justification",
  "spaceComplexity": "Detailed space complexity analysis with justification", 
  "suggestions": [
    "Specific optimization suggestions with line numbers",
    "Code quality improvements",
    "Readability enhancements"
  ],
  "score": 0-100 rating of code quality,
  "summary": "Overall assessment of the code",
  "potentialBugs": [
    "Potential issues with description and line numbers",
    "Edge cases not handled"
  ],
  "bestPractices": [
    "Specific best practices to implement",
    "Language-specific improvements"
  ],
  "edgeCases": [
    "Edge cases identified",
    "Suggested handling approaches"
  ]
}

IMPORTANT RULES:
- The "optimizedCode" field MUST contain the complete rewritten code
- Include detailed comments explaining key optimizations
- Compare original vs optimized versions
- Never omit the optimizedCode field
- Maintain exact same functionality
- Use modern language features when beneficial`,
            },
            {
              role: "user",
              content: code,
            },
          ],
          response_format: { type: "json_object" },
          max_tokens: 2000,
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      const data = response.data.choices[0]?.message?.content;
      const parsed = JSON.parse(data);

      setOptimizedCode(parsed.optimizedCode);
      setAnalysis(parsed);
      toast.success("Code optimized successfully!", {
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to optimize code.", {
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-black text-gray-100">
          <Navbar />
          <Compiler />

          <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  Code Optimizer
                </h1>
                <p className="text-gray-400 mt-1">
                  Analyze and optimize your code with AI
                </p>
              </div>
              {analysis && (
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Code Score</p>
                    <div
                      className={`text-3xl font-bold ${getScoreColor(
                        analysis.score
                      )}`}
                    >
                      {analysis.score}
                      <span className="text-sm text-gray-400">/100</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-all hover:border-indigo-500/30">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="font-medium text-lg">Your Code</h2>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      {languageOptions.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <MonacoEditor
                    height="400px"
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: { enabled: true },
                      fontSize: 14,
                      wordWrap: "on",
                      automaticLayout: true,
                    }}
                  />
                </div>

                <button
                  onClick={handleOptimizeCode}
                  disabled={loading}
                  className={`w-full py-3 px-6 mb-10 rounded-xl font-medium transition-all duration-300 ${
                    loading
                      ? "bg-indigo-700/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/20"
                  } flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Optimize with AI</span>
                    </>
                  )}
                </button>
              </div>

              {optimizedCode && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-all hover:border-indigo-500/30">
                  <div className="border-b border-gray-700 flex">
                    <button
                      onClick={() => setActiveTab("optimized")}
                      className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeTab === "optimized"
                          ? "text-indigo-400 border-b-2 border-indigo-500"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      Optimized Code
                    </button>
                    <button
                      onClick={() => setActiveTab("analysis")}
                      className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                        activeTab === "analysis"
                          ? "text-indigo-400 border-b-2 border-indigo-500"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      Full Analysis
                    </button>
                  </div>

                  {activeTab === "optimized" ? (
                    <MonacoEditor
                      height="400px"
                      defaultLanguage={language}
                      value={optimizedCode}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: true },
                        fontSize: 14,
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                    />
                  ) : (
                    <div className="p-6 overflow-y-auto max-h-[400px] space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">
                          Complexity Analysis
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700/50 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">
                              Time Complexity
                            </p>
                            <p className="font-mono text-emerald-400">
                              {analysis && analysis.timeComplexity }
                            </p>
                          </div>
                          <div className="bg-gray-700/50 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">
                              Space Complexity
                            </p>
                            <p className="font-mono text-emerald-400">
                              {analysis && analysis.spaceComplexity}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">
                          Optimization Suggestions
                        </h3>
                        <ul className="space-y-3">
                          {analysis && analysis.suggestions.map(
                            (suggestion: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="text-emerald-400 mr-2 mt-1">
                                  •
                                </span>
                                <span className="text-gray-300">
                                  {suggestion}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {analysis && analysis.potentialBugs.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-rose-400">
                            Potential Bugs
                          </h3>
                          <ul className="space-y-3">
                            {analysis.potentialBugs.map(
                              (bug: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-rose-400 mr-2 mt-1">
                                    •
                                  </span>
                                  <span className="text-gray-300">{bug}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">
                          Best Practices
                        </h3>
                        <ul className="space-y-3">
                          {analysis && analysis.bestPractices.map(
                            (practice: string, i: number) => (
                              <li key={i} className="flex items-start">
                                <span className="text-indigo-400 mr-2 mt-1">
                                  •
                                </span>
                                <span className="text-gray-300">
                                  {practice}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {analysis && analysis.edgeCases.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-amber-400">
                            Edge Cases
                          </h3>
                          <ul className="space-y-3">
                            {analysis.edgeCases.map(
                              (edgeCase: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-amber-400 mr-2 mt-1">
                                    •
                                  </span>
                                  <span className="text-gray-300">
                                    {edgeCase}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Dashboard;
