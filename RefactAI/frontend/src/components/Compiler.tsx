"use client";
import React, { useState, useRef, useEffect } from "react";
// Ensure '@monaco-editor/react' is installed: npm install @monaco-editor/react
import MonacoEditor from "@monaco-editor/react";
// Ensure '@clerk/clerk-react' is installed: npm install @clerk/clerk-react
import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
// Ensure 'react-hot-toast' is installed: npm install react-hot-toast
import toast from "react-hot-toast";
// Ensure 'axios' is installed: npm install axios
import axios from "axios";

// Define interfaces for better type safety
interface ComplexityMetrics {
  notation: string;
  description: string;
  values: number[]; // e.g., [1, 1, 1] for O(1)
}

interface ComplexityData {
  timeComplexity: ComplexityMetrics;
  spaceComplexity: ComplexityMetrics;
  graphData: {
    labels: string[];
    time: number[];
    space: number[];
  };
}

interface AiAnalysisResult {
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

const languages = [
  { value: "javascript", label: "JS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TScript" },
  { value: "c++", label: "C++" },
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
  const [code, setCode] = useState<string>(
    '// Write your code here\nfunction example() {\n  return "Hello World";\n}'
  );
  const [language, setLanguage] = useState<string>("javascript");
  // Explicitly type complexityData and aiAnalysis to be either their interface type or null
  const [complexityData, setComplexityData] = useState<ComplexityData | null>(
    null
  );
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>("complexity");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const shownToast = useRef<boolean>(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && !shownToast.current) {
      toast.success(`Welcome ${user?.firstName || "back"}!`);
      shownToast.current = true;
    }
  }, [isSignedIn, user]);

  const detectTimeComplexity = (code: string): string => {
    const lines = code.split("\n");
    let loopDepth = 0;
    let maxDepth = 0;
    let hasRecursion = false;
    let hasDivideConquer = false;

    lines.forEach((line) => {
      // Count opening loops
      if (line.match(/for\s*\(|while\s*\(|do\s*{/)) {
        loopDepth++;
        maxDepth = Math.max(maxDepth, loopDepth);
      }
      // Count closing braces (end of loops)
      if (line.match(/}/)) {
        loopDepth = Math.max(0, loopDepth - 1);
      }
      // Check for other patterns
      if (line.match(/function\s+\w+\s*\(.*\)\s*{.*\w+\s*\(/))
        hasRecursion = true;
      if (line.match(/Math\.log|divide|conquer|split\s*\(|merge\s*\(/))
        hasDivideConquer = true;
    });

    // Determine complexity based on loop nesting
    if (maxDepth >= 2) return "O(n²)"; // Changed from >=3 for O(n^3) - assuming common O(n^2) is max shown
    if (hasDivideConquer) return "O(n log n)";
    if (hasRecursion) return "O(2^n)";
    if (maxDepth >= 1) return "O(n)";
    return "O(1)";
  };

  const detectSpaceComplexity = (code: string): string => {
    const lines = code.split("\n");

    let hasDataStructures = false;
    let hasRecursiveStructures = false;
    let hasNestedStructures = false;
    // Removed hasConstantSpace as it's often implied by lack of other complexities
    // let hasConstantSpace = true;

    lines.forEach((line) => {
      if (/new Array|new Set|new Map|\[\s*\.\.\.|{.*:.*}/.test(line)) {
        hasDataStructures = true;
        // hasConstantSpace = false; // Not needed if we return early on higher complexity
      }

      // This regex might be too broad for recursive structures for space complexity.
      // Consider more specific patterns or deeper AST analysis if possible.
      if (
        /\b(function|class)\s+\w+\s*\(.*\)\s*{/.test(line) &&
        /\b(return)\s+\w+\s*\(/.test(line)
      ) {
        hasRecursiveStructures = true;
      }

      if (/Array\(.*Array|Map\(.*Map|Set\(.*Set/.test(line)) {
        hasNestedStructures = true;
      }

      // Removed as manual memory allocation keywords are less common in modern JS contexts,
      // and it doesn't directly map to Big O space complexity in a simple regex way.
      // if (/malloc|calloc|new \w+\[\d+\]/.test(line)) {
      //   hasConstantSpace = false;
      // }
    });

    if (hasNestedStructures) return "O(n²)";
    // If a function calls itself, it might imply stack space usage proportional to depth
    if (hasRecursiveStructures) return "O(n)";
    if (hasDataStructures) return "O(n)"; // Assuming data structures grow with input
    return "O(1)";
  };

  const getComplexityDescription = (notation: string): string => {
    // Added type for notation
    const descriptions: { [key: string]: string } = {
      // Explicitly typed descriptions object
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

  const analyzeComplexity = () => {
    try {
      const timeComplexity = detectTimeComplexity(code);
      const spaceComplexity = detectSpaceComplexity(code);

      const getComplexityValues = (type: string): number[] => {
        // Added type for type parameter and return
        const baseValues: { [key: string]: number[] } = {
          // Explicitly typed baseValues
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

      const mockData: ComplexityData = {
        // Explicitly typed mockData
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
        graphData: {
          labels: ["Best Case", "Average Case", "Worst Case"],
          time: getComplexityValues(timeComplexity),
          space: getComplexityValues(spaceComplexity),
        },
      };

      setComplexityData(mockData);
      setActiveTab("complexity");
      toast.success("Complexity analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze complexity");
      console.error("Complexity analysis error:", error);
    }
  };

  const validateAIResponse = (data: any): AiAnalysisResult => {
    // Type 'any' for incoming raw data, then validate
    try {
      // Safely access nested properties using optional chaining
      const contentStr = data.choices?.[0]?.message?.content;
      if (!contentStr) {
        throw new Error("Invalid response structure: content missing from API");
      }

      const parsed: AiAnalysisResult = JSON.parse(contentStr); // Cast to AiAnalysisResult

      // Ensure required fields exist
      const requiredFields: (keyof AiAnalysisResult)[] = [
        // Use keyof for type safety
        "optimizedCode",
        "timeComplexity",
        "spaceComplexity",
        "suggestions",
        "score",
        "summary",
      ];

      for (const field of requiredFields) {
        if (
          !(field in parsed) ||
          parsed[field] === undefined ||
          parsed[field] === null
        ) {
          // Check for existence and non-null/undefined values
          throw new Error(
            `Missing or invalid required field: ${String(field)}`
          );
        }
      }

      // Set defaults for optional fields if they are missing or null/undefined
      if (!parsed.potentialBugs) parsed.potentialBugs = [];
      if (!parsed.bestPractices) parsed.bestPractices = [];
      if (!parsed.edgeCases) parsed.edgeCases = [];

      return parsed;
    } catch (error) {
      console.error("Validation error:", error);
      // Re-throw to be caught by the toast.promise error handler
      throw new Error(
        `Failed to parse AI response: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    toast.promise(
      new Promise<AiAnalysisResult>(async (resolve, reject) => {
        // Explicitly define Promise resolve type
        try {
          // Check for VITE_OPENAI_KEY with a more robust check for non-string values
          if (
            typeof import.meta.env.VITE_OPENAI_KEY !== "string" ||
            !import.meta.env.VITE_OPENAI_KEY.trim()
          ) {
            throw new Error("OpenAI API key is missing or invalid");
          }

          if (!code.trim()) {
            throw new Error("Please enter some code to analyze");
          }

          const apiKey = import.meta.env.VITE_OPENAI_KEY; // Use a constant for clarity

          const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "openai/gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: `[IMPORTANT] Analyze this ${language} code for:
1. Time/Space complexity (Big O notation)
2. Optimization opportunities
3. Code quality issues
4. Potential bugs
5. Best practices

Return ONLY valid JSON with this structure:
{
  "optimizedCode": "string",
  "timeComplexity": "string",
  "spaceComplexity": "string",
  "suggestions": ["string"],
  "score": number,
  "summary": "string",
  "potentialBugs": ["string"],
  "bestPractices": ["string"],
  "edgeCases": ["string"]
}`,
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
                Authorization: `Bearer ${apiKey}`, // Use the constant
                "Content-Type": "application/json",
              },
              timeout: 30000,
            }
          );

          const analysis = validateAIResponse(response.data);
          resolve(analysis);
        } catch (error: any | unknown) {
          // Catch error as 'any' or 'unknown' and then refine
          console.error("AI analysis error:", error);
          const errorMessage =
            error.message || "An unknown error occurred during AI analysis.";

          const fallbackAnalysis: AiAnalysisResult = {
            // Ensure fallback is correctly typed
            optimizedCode: code,
            timeComplexity: "Unknown (analysis failed)",
            spaceComplexity: "Unknown (analysis failed)",
            suggestions: [
              `Failed to get AI analysis: ${errorMessage}`,
              "Please check your network connection, API key, and try again.",
            ],
            score: 0,
            summary: "Analysis failed.",
            potentialBugs: [],
            bestPractices: [],
            edgeCases: [],
          };
          resolve(fallbackAnalysis); // Resolve with fallback on error
        } finally {
          setIsAnalyzing(false);
        }
      }),
      {
        loading: "AI is analyzing your code...",
        success: (data) => {
          // Data here is of type AiAnalysisResult due to Promise<AiAnalysisResult>
          setAiAnalysis(data);
          setActiveTab("ai");
          return data.summary || "AI analysis complete!";
        },
        error: (err) => {
          console.error(err);
          // If the promise rejects, err will be the rejected value.
          // If it resolves with fallback, this error won't be triggered for network issues.
          return "AI analysis failed. Please check console for details.";
        },
      }
    );
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="h-screen w-full bg-black p-32 relative overflow-hidden">
          <div className="absolute top-4 right-4 z-50">
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="glow-border relative h-full w-full rounded-2xl p-6 gap-4 bg-transparent border-2 border-gray-600  flex overflow-hidden">
            {/* Editor Column (60%) */}
            <div className="w-[60%] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-900 text-white rounded-xl px-5 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg cursor-pointer text-base"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="bg-gray-800 text-white px-4 py-2 text-base"
                    >
                      {lang.label}
                    </option>
                  ))}
                </select>

                <div className="flex space-x-4">
                  <button
                    onClick={analyzeComplexity}
                    className="bg-gradient-to-br font-bold font-saira from-yellow-400 via-orange-500 to-pink-600 hover:from-yellow-500 hover:via-red-500 hover:to-pink-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95"
                    disabled={isAnalyzing}
                  >
                    Analyze Complexity
                  </button>
                  <button
                    onClick={analyzeWithAI}
                    className="bg-gradient-to-br font-bold font-saira from-purple-500 via-fuchsia-600 to-pink-500 hover:from-purple-600 hover:via-fuchsia-700 hover:to-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                  </button>
                </div>
              </div>

              <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Results Column (40%) */}
            <div className="w-[40%] flex flex-col">
              <div className="flex border-b border-gray-700 mb-4 ">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "complexity"
                      ? "border-b-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("complexity")}
                >
                  <span className="text-[#2460e0] font-medium font-mono">
                    Complexity
                  </span>
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "ai" ? "border-b-2 border-purple-500" : ""
                  }`}
                  onClick={() => setActiveTab("ai")}
                >
                  <span className="text-purple-500 font-medium font-mono">
                    AI Analysis
                  </span>
                </button>
              </div>

              {/* Conditional rendering for complexityData and aiAnalysis */}
              {activeTab === "complexity" ? (
                complexityData ? (
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-auto">
                    <h3 className="text-xl font-bold mb-4 text-green-500">
                      Complexity Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800 p-4 rounded">
                        <h4 className="font-semibold mb-2 text-blue-500">
                          Time: {complexityData.timeComplexity.notation}
                        </h4>
                        <p className="text-sm text-gray-300 mb-3">
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
                        <h4 className="font-semibold mb-2 text-purple-500">
                          Space: {complexityData.spaceComplexity.notation}
                        </h4>
                        <p className="text-sm text-gray-300 mb-3">
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
                      <h4 className="font-semibold mb-2 text-orange-500">
                        Complexity Reference
                      </h4>
                      <ul className="text-sm space-y-2 ">
                        {complexityTypes.map((type) => (
                          <li className="text-white" key={type}>
                            <span className="font-mono text-[#ebd15f]">
                              {type}
                            </span>
                            : {getComplexityDescription(type)}
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
                  <h3 className="text-xl font-bold mb-4 text-pink-500">
                    AI Analysis
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-amber-100">
                      Code Quality Score: {aiAnalysis.score}/100
                    </h4>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
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
                    <p className="text-sm text-gray-400">
                      {aiAnalysis.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 p-3 rounded">
                      <h4 className="font-semibold mb-2 text-sm text-blue-500">
                        Time Complexity
                      </h4>
                      <p className="font-mono text-sm text-blue-200">
                        {aiAnalysis.timeComplexity}
                      </p>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h4 className="font-semibold mb-2 text-sm text-purple-500">
                        Space Complexity
                      </h4>
                      <p className="font-mono text-sm text-purple-200">
                        {aiAnalysis.spaceComplexity}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-green-500">
                      Optimized Code
                    </h4>
                    <div className="bg-gray-800 text-white p-3 rounded font-mono text-sm overflow-x-auto">
                      <pre>{aiAnalysis.optimizedCode}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-orange-500">
                      Suggestions
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-green-500">
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
