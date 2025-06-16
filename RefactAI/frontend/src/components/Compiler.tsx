"use client";
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
import axios, {  } from "axios";

// Type Definitions
type LanguageOption = {
  value: string;
  label: string;
};

type ComplexityType =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(2^n)"
  | "O(n!)";

interface ComplexityMetrics {
  notation: ComplexityType;
  description: string;
  values: [number, number, number]; // Tuple for [best, average, worst]
}

interface GraphData {
  labels: ["Best Case", "Average Case", "Worst Case"];
  time: [number, number, number];
  space: [number, number, number];
}

interface ComplexityData {
  timeComplexity: ComplexityMetrics;
  spaceComplexity: ComplexityMetrics;
  graphData: GraphData;
}

interface AiAnalysisResult {
  optimizedCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  suggestions: string[];
  score: number;
  summary: string;
  potentialBugs?: string[];
  bestPractices?: string[];
  edgeCases?: string[];
}

interface ApiResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

// Constants
const LANGUAGES: LanguageOption[] = [
  { value: "javascript", label: "JS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "TScript" },
  { value: "c++", label: "C++" },
];

const COMPLEXITY_TYPES: ComplexityType[] = [
  "O(1)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n²)",
  "O(2^n)",
  "O(n!)",
];

const COMPLEXITY_DESCRIPTIONS: Record<ComplexityType, string> = {
  "O(1)": "Constant time - Excellent",
  "O(log n)": "Logarithmic - Very good",
  "O(n)": "Linear - Good",
  "O(n log n)": "Linearithmic - Fair",
  "O(n²)": "Quadratic - Poor",
  "O(2^n)": "Exponential - Bad",
  "O(n!)": "Factorial - Terrible",
};

const COMPLEXITY_VALUES: Record<ComplexityType, [number, number, number]> = {
  "O(1)": [1, 1, 1],
  "O(log n)": [1, 3, 5],
  "O(n)": [5, 15, 30],
  "O(n log n)": [10, 25, 50],
  "O(n²)": [15, 40, 80],
  "O(2^n)": [20, 60, 120],
  "O(n!)": [30, 100, 200],
};

const DEFAULT_CODE =
  '// Write your code here\nfunction example() {\n  return "Hello World";\n}';

const Compiler = () => {
  // State
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [language, setLanguage] = useState<string>("javascript");
  const [complexityData, setComplexityData] = useState<ComplexityData | null>(
    null
  );
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"complexity" | "ai">("complexity");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const shownToast = useRef<boolean>(false);
  const { isSignedIn, user } = useUser();

  // Effects
  useEffect(() => {
    if (isSignedIn && !shownToast.current) {
      toast.success(`Welcome ${user?.firstName ?? "back"}!`);
      shownToast.current = true;
    }
  }, [isSignedIn, user]);

  // Complexity Analysis Functions
  const detectTimeComplexity = (code: string): ComplexityType => {
    const lines = code.split("\n");
    let loopDepth = 0;
    let maxDepth = 0;
    let hasRecursion = false;
    let hasDivideConquer = false;

    for (const line of lines) {
      if (/for\s*\(|while\s*\(|do\s*{/.test(line)) {
        loopDepth++;
        maxDepth = Math.max(maxDepth, loopDepth);
      }
      if (line.includes("}")) {
        loopDepth = Math.max(0, loopDepth - 1);
      }
      if (/function\s+\w+\s*\(.*\)\s*{.*\w+\s*\(/.test(line)) {
        hasRecursion = true;
      }
      if (/Math\.log|divide|conquer|split\s*\(|merge\s*\(/.test(line)) {
        hasDivideConquer = true;
      }
    }

    if (maxDepth >= 2) return "O(n²)";
    if (hasDivideConquer) return "O(n log n)";
    if (hasRecursion) return "O(2^n)";
    if (maxDepth >= 1) return "O(n)";
    return "O(1)";
  };

  const detectSpaceComplexity = (code: string): ComplexityType => {
    const lines = code.split("\n");
    let hasNestedStructures = false;
    let hasRecursiveStructures = false;
    let hasDataStructures = false;

    for (const line of lines) {
      if (/new Array|new Set|new Map|\[\s*\.\.\.|{.*:.*}/.test(line)) {
        hasDataStructures = true;
      }
      if (
        /\b(function|class)\s+\w+\s*\(.*\)\s*{/.test(line) &&
        /\b(return)\s+\w+\s*\(/.test(line)
      ) {
        hasRecursiveStructures = true;
      }
      if (/Array\(.*Array|Map\(.*Map|Set\(.*Set/.test(line)) {
        hasNestedStructures = true;
      }
    }

    if (hasNestedStructures) return "O(n²)";
    if (hasRecursiveStructures) return "O(n)";
    if (hasDataStructures) return "O(n)";
    return "O(1)";
  };

  const analyzeComplexity = () => {
    try {
      const timeComplexity = detectTimeComplexity(code);
      const spaceComplexity = detectSpaceComplexity(code);

      const mockData: ComplexityData = {
        timeComplexity: {
          notation: timeComplexity,
          description: COMPLEXITY_DESCRIPTIONS[timeComplexity],
          values: COMPLEXITY_VALUES[timeComplexity],
        },
        spaceComplexity: {
          notation: spaceComplexity,
          description: COMPLEXITY_DESCRIPTIONS[spaceComplexity],
          values: COMPLEXITY_VALUES[spaceComplexity],
        },
        graphData: {
          labels: ["Best Case", "Average Case", "Worst Case"],
          time: COMPLEXITY_VALUES[timeComplexity],
          space: COMPLEXITY_VALUES[spaceComplexity],
        },
      };

      setComplexityData(mockData);
      setActiveTab("complexity");
      toast.success("Complexity analysis complete!");
    } catch (error) {
      console.error("Complexity analysis error:", error);
      toast.error("Failed to analyze complexity");
    }
  };

  // AI Analysis Functions
 const validateAIResponse = (data: unknown): AiAnalysisResult => {
   try {
     // Safely access nested properties using optional chaining
     const contentStr = (data as ApiResponse)?.choices?.[0]?.message?.content;
     if (!contentStr) {
       throw new Error("Invalid response structure: content missing from API");
     }

     const parsed = JSON.parse(contentStr) as Partial<AiAnalysisResult>;

     // Ensure required fields exist
     const requiredFields: Array<keyof AiAnalysisResult> = [
       "optimizedCode",
       "timeComplexity",
       "spaceComplexity",
       "suggestions",
       "score",
       "summary",
     ];

     for (const field of requiredFields) {
       if (!(field in parsed) || parsed[field] == null) {
         throw new Error(`Missing required field: ${String(field)}`);
       }
     }

     // Type-safe access to required fields
     const validated: AiAnalysisResult = {
       optimizedCode: parsed.optimizedCode as string,
       timeComplexity: parsed.timeComplexity as string,
       spaceComplexity: parsed.spaceComplexity as string,
       suggestions: parsed.suggestions as string[],
       score: parsed.score as number,
       summary: parsed.summary as string,
       potentialBugs: parsed.potentialBugs ?? [],
       bestPractices: parsed.bestPractices ?? [],
       edgeCases: parsed.edgeCases ?? [],
     };

     return validated;
   } catch (error) {
     console.error("Validation error:", error);
     throw new Error(
       `Failed to parse AI response: ${
         error instanceof Error ? error.message : String(error)
       }`
     );
   }
 };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_KEY;

      if (typeof apiKey !== "string" || !apiKey.trim()) {
        throw new Error("OpenAI API key is missing or invalid");
      }

      if (!code.trim()) {
        throw new Error("Please enter some code to analyze");
      }

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Analyze this ${language} code for:
1. Time/Space complexity
2. Optimization opportunities
3. Code quality issues
4. Potential bugs
5. Best practices

Return JSON with this structure:
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
            { role: "user", content: code },
          ],
          response_format: { type: "json_object" },
          max_tokens: 2000,
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      const analysis = validateAIResponse(response.data);
      setAiAnalysis(analysis);
      setActiveTab("ai");
      toast.success(analysis.summary || "AI analysis complete!");
    } catch (error) {
      console.error("AI analysis error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(`AI analysis failed: ${errorMessage}`);

      setAiAnalysis({
        optimizedCode: code,
        timeComplexity: "Unknown",
        spaceComplexity: "Unknown",
        suggestions: [`Error: ${errorMessage}`],
        score: 0,
        summary: "Analysis failed",
        potentialBugs: [],
        bestPractices: [],
        edgeCases: [],
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Render
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="h-screen w-full bg-black p-8 md:p-32 relative overflow-hidden">
          <div className="absolute top-4 right-4 z-50">
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="glow-border relative h-full w-full rounded-2xl p-6 gap-4 bg-transparent border-2 border-gray-600 flex flex-col md:flex-row overflow-hidden">
            {/* Editor Column */}
            <div className="w-full md:w-[60%] flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-900 text-white rounded-xl px-5 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg cursor-pointer text-base"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                  <button
                    onClick={analyzeComplexity}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-br font-bold from-yellow-400 via-orange-500 to-pink-600 hover:from-yellow-500 hover:via-red-500 hover:to-pink-700 text-white px-4 md:px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 flex-1 md:flex-none"
                  >
                    Analyze Complexity
                  </button>
                  <button
                    onClick={analyzeWithAI}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-br font-bold from-purple-500 via-fuchsia-600 to-pink-500 hover:from-purple-600 hover:via-fuchsia-700 hover:to-pink-600 text-white px-4 md:px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] active:scale-95 flex-1 md:flex-none"
                  >
                    {isAnalyzing ? "Analyzing..." : "AI Analysis"}
                  </button>
                </div>
              </div>

              <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    wordWrap: "on",
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Results Column */}
            <div className="w-full md:w-[40%] flex flex-col mt-4 md:mt-0">
              <div className="flex border-b border-gray-700 mb-4">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "complexity"
                      ? "border-b-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("complexity")}
                >
                  <span className="text-blue-500 font-medium font-mono">
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

              {activeTab === "complexity" ? (
                complexityData ? (
                  <ComplexityResults data={complexityData} />
                ) : (
                  <EmptyState message="Run analysis to see complexity results" />
                )
              ) : aiAnalysis ? (
                <AiAnalysisResults data={aiAnalysis} />
              ) : (
                <EmptyState message="Run AI analysis to see suggestions" />
              )}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

// Sub-components for better organization
const ComplexityResults = ({ data }: { data: ComplexityData }) => (
  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-auto">
    <h3 className="text-xl font-bold mb-4 text-green-500">
      Complexity Analysis
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <ComplexityMetric
        title="Time"
        notation={data.timeComplexity.notation}
        description={data.timeComplexity.description}
        values={data.graphData.time}
        color="blue"
      />
      <ComplexityMetric
        title="Space"
        notation={data.spaceComplexity.notation}
        description={data.spaceComplexity.description}
        values={data.graphData.space}
        color="purple"
      />
    </div>
    <div className="bg-gray-800 p-4 rounded">
      <h4 className="font-semibold mb-2 text-orange-500">
        Complexity Reference
      </h4>
      <ul className="text-sm space-y-2">
        {COMPLEXITY_TYPES.map((type) => (
          <li key={type} className="text-white">
            <span className="font-mono text-yellow-400">{type}</span>:{" "}
            {COMPLEXITY_DESCRIPTIONS[type]}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ComplexityMetric = ({
  title,
  notation,
  description,
  values,
  color,
}: {
  title: string;
  notation: string;
  description: string;
  values: [number, number, number];
  color: "blue" | "purple";
}) => {
  const colorClasses = {
    blue: "bg-blue-500 text-blue-500",
    purple: "bg-purple-500 text-purple-500",
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h4 className={`font-semibold mb-2 text-${color}-500`}>
        {title}: {notation}
      </h4>
      <p className="text-sm text-gray-300 mb-3">{description}</p>
      <div className="h-32 bg-gray-700 rounded flex items-end justify-center gap-2">
        {values.map((value, i) => (
          <div
            key={`${title}-${i}`}
            className={`${colorClasses[color]} w-8 rounded-t-sm transition-all`}
            style={{ height: `${value}%` }}
            title={`${["Best", "Average", "Worst"][i]} Case: ${value}`}
          />
        ))}
      </div>
    </div>
  );
};

const AiAnalysisResults = ({ data }: { data: AiAnalysisResult }) => (
  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 overflow-auto">
    <h3 className="text-xl font-bold mb-4 text-pink-500">AI Analysis</h3>

    <div className="mb-6">
      <h4 className="font-semibold mb-2 text-amber-100">
        Code Quality Score: {data.score}/100
      </h4>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
        <div
          className={`h-2.5 rounded-full ${
            data.score > 70
              ? "bg-green-500"
              : data.score > 40
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${data.score}%` }}
        />
      </div>
      <p className="text-sm text-gray-400">{data.summary}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800 p-3 rounded">
        <h4 className="font-semibold mb-2 text-sm text-blue-500">
          Time Complexity
        </h4>
        <p className="font-mono text-sm text-blue-200">{data.timeComplexity}</p>
      </div>
      <div className="bg-gray-800 p-3 rounded">
        <h4 className="font-semibold mb-2 text-sm text-purple-500">
          Space Complexity
        </h4>
        <p className="font-mono text-sm text-purple-200">
          {data.spaceComplexity}
        </p>
      </div>
    </div>

    <div className="mb-6">
      <h4 className="font-semibold mb-2 text-green-500">Optimized Code</h4>
      <div className="bg-gray-800 text-white p-3 rounded font-mono text-sm overflow-x-auto">
        <pre>{data.optimizedCode}</pre>
      </div>
    </div>

    {data.suggestions?.length > 0 && (
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-orange-500">Suggestions</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-green-500">
          {data.suggestions.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
      </div>
    )}

    {data.potentialBugs && data.potentialBugs.length > 0 && (
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-red-500">Potential Bugs</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-red-400">
          {data.potentialBugs.map((bug, i) => (
            <li key={`bug-${i}`}>{bug}</li>
          ))}
        </ul>
      </div>
    )}

    {data.bestPractices && data.bestPractices.length > 0 && (
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-blue-400">Best Practices</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-blue-400">
          {data.bestPractices.map((practice, i) => (
            <li key={`practice-${i}`}>{practice}</li>
          ))}
        </ul>
      </div>
    )}

    {data.edgeCases && data.edgeCases.length > 0 && (
      <div className="mb-6">
        <h4 className="font-semibold mb-2 text-purple-400">Edge Cases</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-purple-400">
          {data.edgeCases.map((edgeCase, i) => (
            <li key={`edgeCase-${i}`}>{edgeCase}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex-1 bg-gray-900 rounded-lg p-4 border border-gray-700 flex items-center justify-center">
    <p className="text-gray-500">{message}</p>
  </div>
);

export default Compiler;
