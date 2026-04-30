import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useState, useCallback } from "react";
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
] as const;

type Lang = (typeof languageOptions)[number]["value"];

interface AnalysisResult {
  optimizedCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  suggestions: string[];
  score: number;
  summary: string;
  potentialBugs: string[];
  bestPractices: string[];
  edgeCases: string[];
}

const Dashboard = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [optimizedCode, setOptimizedCode] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult>();
  const [language, setLanguage] = useState<Lang>("javascript");
  const [activeTab, setActiveTab] = useState<"optimized" | "analysis">(
    "optimized"
  );
  const [loading, setLoading] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  /** SAFE JSON PARSER */
  const safeJSON = (raw: string) => {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  /** MAIN OPTIMIZATION FUNCTION */
  const handleOptimizeCode = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first!");
      return;
    }

    setLoading(true);
    setOptimizedCode(null);
    setAnalysis(undefined);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/chatgpt-4o-latest",
          response_format: { type: "json_object" },
          max_tokens: 2000,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `
You are a precise code analysis engine. ALWAYS return STRICT VALID JSON ONLY.

Analyze provided ${language} code:

1. Calculate exact time complexity with full reasoning.
2. Calculate exact space complexity with full reasoning.
3. Return a fully optimized code version.
4. Identify potential bugs.
5. Evaluate best practices.
6. List missing edge cases.
7. Provide compact improvement suggestions.
8. Give a final optimization score between 0–100.

Return ONLY JSON in this exact schema:

{
  "optimizedCode": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "suggestions": [],
  "score": 0,
  "summary": "",
  "potentialBugs": [],
  "bestPractices": [],
  "edgeCases": []
}
`,
            },
            { role: "user", content: code },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      const jsonContent = response.data?.choices?.[0]?.message?.content;

      const parsed: AnalysisResult | null = safeJSON(jsonContent);

      if (!parsed) throw new Error("Invalid JSON from API");

      setOptimizedCode(parsed.optimizedCode);
      setAnalysis(parsed);

      toast.success("Code optimized successfully!", {
        style: { background: "#1e293b", color: "#fff", border: "1px solid #334155" },
        iconTheme: { primary: "#10b981", secondary: "#fff" },
      });
    } catch (err) {
      console.error(err);

      toast.error("Failed to optimize code.", {
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155",
        },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  }, [code, language]);

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
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  Code Optimizer
                </h1>
                <p className="text-gray-400 mt-1">Analyze and optimize your code with AI</p>
              </div>

              {analysis && (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Code Score</p>
                  <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                    <span className="text-sm text-gray-400">/100</span>
                  </div>
                </div>
              )}
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT PANEL */}
              <div className="space-y-6">
                {/* CODE EDITOR */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-medium">Your Code</h2>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Lang)}
                      className="bg-gray-700 border border-gray-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      {languageOptions.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MonacoEditor
                    height="400px"
                    language={language}
                    value={code}
                    theme="vs-dark"
                    onChange={(v) => setCode(v ?? "")}
                    options={{
                      minimap: { enabled: true },
                      fontSize: 14,
                      wordWrap: "on",
                    }}
                  />
                </div>

                {/* ANALYZE BUTTON */}
                <button
                  onClick={handleOptimizeCode}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    loading
                      ? "bg-indigo-700/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  } flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Optimize with AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* RIGHT PANEL */}
              {optimizedCode && analysis && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                  {/* TABS */}
                  <div className="border-b border-gray-700 flex">
                    <button
                      onClick={() => setActiveTab("optimized")}
                      className={`flex-1 py-3 text-sm ${
                        activeTab === "optimized"
                          ? "text-indigo-400 border-b-2 border-indigo-500"
                          : "text-gray-400"
                      }`}
                    >
                      Optimized Code
                    </button>

                    <button
                      onClick={() => setActiveTab("analysis")}
                      className={`flex-1 py-3 text-sm ${
                        activeTab === "analysis"
                          ? "text-indigo-400 border-b-2 border-indigo-500"
                          : "text-gray-400"
                      }`}
                    >
                      Full Analysis
                    </button>
                  </div>

                  {/* OPTIMIZED CODE TAB */}
                  {activeTab === "optimized" ? (
                    <MonacoEditor
                      height="400px"
                      defaultLanguage={language}
                      value={optimizedCode}
                      theme="vs-dark"
                      options={{ readOnly: true, wordWrap: "on", minimap: { enabled: true } }}
                    />
                  ) : (
                    /* ANALYSIS TAB */
                    <div className="p-6 overflow-y-auto max-h-[400px] space-y-6">
                      {/* Complexity */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">Complexity Analysis</h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700/50 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Time Complexity</p>
                            <p className="font-mono text-emerald-400">{analysis.timeComplexity}</p>
                          </div>

                          <div className="bg-gray-700/50 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Space Complexity</p>
                            <p className="font-mono text-emerald-400">{analysis.spaceComplexity}</p>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">Optimization Suggestions</h3>
                        <ul className="space-y-2">
                          {analysis.suggestions.map((s, i) => (
                            <li key={i} className="flex">
                              <span className="text-emerald-400 mr-2">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bugs */}
                      {analysis.potentialBugs.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-rose-400">Potential Bugs</h3>
                          <ul className="space-y-2">
                            {analysis.potentialBugs.map((b, i) => (
                              <li key={i} className="flex">
                                <span className="text-rose-400 mr-2">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Best Practices */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-indigo-400">Best Practices</h3>
                        <ul className="space-y-2">
                          {analysis.bestPractices.map((bp, i) => (
                            <li key={i} className="flex">
                              <span className="text-indigo-400 mr-2">•</span>
                              {bp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Edge Cases */}
                      {analysis.edgeCases.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-amber-400">Edge Cases</h3>
                          <ul className="space-y-2">
                            {analysis.edgeCases.map((ec, i) => (
                              <li key={i} className="flex">
                                <span className="text-amber-400 mr-2">•</span>
                                {ec}
                              </li>
                            ))}
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
