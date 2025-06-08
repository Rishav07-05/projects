import { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TypeScript" },
  { value: "cpp", label: "C++" },
];

const complexityTypes = [
  "O(1)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n²)",
  "O(2^n)",
  "O(n!)",
];

const Compiler = () => {
  const [code, setCode] = useState(
    '// Write your code here\nfunction example() {\n  return "Hello World";\n}'
  );
  const [language, setLanguage] = useState("javascript");
  const [complexityData, setComplexityData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("complexity");
  const shownToast = useRef(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && !shownToast.current) {
      toast.success(`Welcome ${user?.firstName || "back"}!`);
      shownToast.current = true;
    }
  }, [isSignedIn, user]);

  const detectComplexity = (code) => {
    // Simple complexity detection based on code patterns
    const lines = code.split("\n");
    let hasLoops = false;
    let hasNestedLoops = false;
    let hasRecursion = false;
    let hasDivideConquer = false;

    lines.forEach((line) => {
      if (line.match(/for\s*\(|while\s*\(|do\s*{/)) hasLoops = true;
      if (line.match(/for\s*\(.*for\s*\(|while\s*\(.*while\s*\(/))
        hasNestedLoops = true;
      if (line.match(/function\s+\w+\s*\(.*\)\s*{.*\w+\s*\(/))
        hasRecursion = true;
      if (line.match(/Math\.log|divide|conquer|split\s*\(/))
        hasDivideConquer = true;
    });

    if (hasNestedLoops) return "O(n²)";
    if (hasDivideConquer) return "O(n log n)";
    if (hasRecursion) return "O(2^n)";
    if (hasLoops) return "O(n)";
    return "O(1)";
  };

  const analyzeComplexity = () => {
    try {
      const timeComplexity = detectComplexity(code);
      const spaceComplexity =
        code.includes("Array(") || code.includes("new Array") ? "O(n)" : "O(1)";

      const getComplexityValues = (type) => {
        const baseValues = {
          "O(1)": [1, 1, 1],
          "O(log n)": [1, 3, 5],
          "O(n)": [5, 15, 30],
          "O(n log n)": [10, 25, 50],
          "O(n²)": [15, 40, 80],
          "O(2^n)": [20, 60, 120],
          "O(n!)": [30, 100, 200],
        };
        return baseValues[type] || [5, 15, 30];
      };

      const mockData = {
        timeComplexity: {
          notation: timeComplexity,
          description: getComplexityDescription(timeComplexity),
          values: getComplexityValues(timeComplexity),
        },
        spaceComplexity: {
          notation: spaceComplexity,
          description: getComplexityDescription(spaceComplexity),
          values: getComplexityValues(spaceComplexity),
        },
      };

      setComplexityData({
        ...mockData,
        graphData: {
          labels: ["Best Case", "Average Case", "Worst Case"],
          time: mockData.timeComplexity.values,
          space: mockData.spaceComplexity.values,
        },
      });
      setActiveTab("complexity");
      toast.success("Complexity analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze complexity");
    }
  };

  const getComplexityDescription = (notation) => {
    const descriptions = {
      "O(1)": "Constant time - Excellent",
      "O(log n)": "Logarithmic - Very good",
      "O(n)": "Linear - Good",
      "O(n log n)": "Linearithmic - Fair",
      "O(n²)": "Quadratic - Poor",
      "O(2^n)": "Exponential - Bad",
      "O(n!)": "Factorial - Terrible",
    };
    return descriptions[notation] || "Unknown complexity";
  };

  const analyzeWithAI = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          // Mock AI analysis
          const analysis = {
            optimizedCode: code.replace(
              /for\s*\(.*\)/,
              "// Optimized loop suggestion"
            ),
            suggestions: [
              "Consider using memoization to optimize performance",
              "This function could be broken into smaller, more maintainable pieces",
              "Potential edge case not handled in the input validation",
            ],
            complexity: detectComplexity(code),
            score: Math.floor(Math.random() * 50) + 50,
          };
          resolve(analysis);
        }, 2000);
      }),
      {
        loading: "AI is analyzing your code...",
        success: (data) => {
          setAiAnalysis(data);
          setActiveTab("ai");
          return "AI analysis complete!";
        },
        error: "AI analysis failed",
      }
    );
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="h-screen w-full bg-black text-[lightblue] relative overflow-hidden">
          <div className="absolute top-4 right-4 z-50">
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="h-full w-full flex p-4 gap-4">
            {/* Editor Column (60%) */}
            <div className="w-[60%] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-800 text-lightblue border border-gray-700 rounded px-4 py-2"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                <div className="flex space-x-4">
                  <button
                    onClick={analyzeComplexity}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Analyze Complexity
                  </button>
                  <button
                    onClick={analyzeWithAI}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Analyze with AI
                  </button>
                </div>
              </div>

              <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={setCode}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Results Column (40%) */}
            <div className="w-[40%] flex flex-col">
              <div className="flex border-b border-gray-700 mb-4">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "complexity"
                      ? "border-b-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("complexity")}
                >
                  Complexity
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "ai" ? "border-b-2 border-purple-500" : ""
                  }`}
                  onClick={() => setActiveTab("ai")}
                >
                  AI Analysis
                </button>
              </div>

              {activeTab === "complexity" ? (
                complexityData ? (
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-auto">
                    <h3 className="text-xl font-bold mb-4">
                      Complexity Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-semibold mb-2">
                          Time: {complexityData.timeComplexity.notation}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">
                          {complexityData.timeComplexity.description}
                        </p>
                        <div className="h-32 bg-gray-700 rounded flex items-end justify-center space-x-2">
                          {complexityData.graphData.time.map((value, i) => (
                            <div
                              key={`time-${i}`}
                              className="bg-blue-500 w-8 rounded-t-sm transition-all"
                              style={{ height: `${value}%` }}
                              title={`${complexityData.graphData.labels[i]}: ${value}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-semibold mb-2">
                          Space: {complexityData.spaceComplexity.notation}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">
                          {complexityData.spaceComplexity.description}
                        </p>
                        <div className="h-32 bg-gray-700 rounded flex items-end justify-center space-x-2">
                          {complexityData.graphData.space.map((value, i) => (
                            <div
                              key={`space-${i}`}
                              className="bg-purple-500 w-8 rounded-t-sm transition-all"
                              style={{ height: `${value}%` }}
                              title={`${complexityData.graphData.labels[i]}: ${value}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <h4 className="font-semibold mb-2">
                        Complexity Reference
                      </h4>
                      <ul className="text-sm space-y-2">
                        {complexityTypes.map((type) => (
                          <li key={type}>
                            <span className="font-mono">{type}</span>:{" "}
                            {getComplexityDescription(type)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 flex items-center justify-center">
                    <p className="text-gray-500">
                      Run analysis to see complexity results
                    </p>
                  </div>
                )
              ) : aiAnalysis ? (
                <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-auto">
                  <h3 className="text-xl font-bold mb-4">AI Analysis</h3>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">
                      Code Quality Score: {aiAnalysis.score}/100
                    </h4>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          aiAnalysis.score > 70
                            ? "bg-green-500"
                            : aiAnalysis.score > 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${aiAnalysis.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">
                      Optimized Code Suggestion
                    </h4>
                    <div className="bg-gray-800 p-3 rounded font-mono text-sm overflow-x-auto">
                      <pre>{aiAnalysis.optimizedCode}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Suggestions</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {aiAnalysis.suggestions.map((suggestion, i) => (
                        <li key={i}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 flex items-center justify-center">
                  <p className="text-gray-500">
                    Run AI analysis to see suggestions
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Compiler;
