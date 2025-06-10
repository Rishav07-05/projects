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
import axios from "axios";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  

 const analyzeWithAI = async () => {
   setIsAnalyzing(true);
   toast.promise(
     new Promise(async (resolve, reject) => {
       try {
         // Check if API key exists
         if (!import.meta.env.VITE_OPENAI_KEY) {
           throw new Error("OpenAI API key is missing");
         }

         const response = await axios.post(
           "https://openrouter.ai/api/v1/chat/completions",
           {
             model: "openai/gpt-3.5-turbo", // Updated to GPT-4o
             messages: [
               {
                 role: "system",
                 content: `You are an expert code reviewer. Analyze the provided code for:
1. Time and space complexity (using Big O notation)
2. Code quality issues
3. Optimization opportunities
4. Best practices violations
5. Potential bugs or edge cases

Return a JSON object with this structure:
{
  "optimizedCode": "The optimized version of the code",
  "timeComplexity": "Time complexity in Big O notation with brief explanation",
  "spaceComplexity": "Space complexity in Big O notation with brief explanation",
  "suggestions": ["array", "of", "specific", "suggestions"],
  "score": 0-100, // code quality score
  "summary": "Brief overall assessment",
  "potentialBugs": ["array", "of", "potential", "bugs"],
  "bestPractices": ["array", "of", "best", "practices", "to", "follow"]
}`,
               },
               {
                 role: "user",
                 content: `Analyze this ${language} code for complexity and quality:\n\n${code}`,
               },
             ],
             response_format: { type: "json_object" },
             max_tokens: 2000, // Increased for more detailed analysis
             temperature: 0.2, // Lower temperature for more deterministic output
           },
           {
             headers: {
               Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
               "HTTP-Referer": window.location.href,
               "X-Title": "Code Complexity Analyzer",
               "Content-Type": "application/json",
             },
             timeout: 30000, // 30 seconds timeout
           }
         );

         if (!response.data.choices?.[0]?.message?.content) {
           throw new Error("Invalid response structure from API");
         }

         const analysis = response.data.choices[0].message.content;
         let parsedAnalysis;

         try {
           parsedAnalysis = JSON.parse(analysis);
         } catch (e) {
           console.error("Failed to parse AI response:", e);
           // Try to extract JSON from markdown if present
           const jsonMatch = analysis.match(/```json\n([\s\S]*?)\n```/);
           if (jsonMatch) {
             parsedAnalysis = JSON.parse(jsonMatch[1]);
           } else {
             throw new Error("AI returned non-JSON response");
           }
         }

         // Validate the response structure
         const requiredFields = [
           "optimizedCode",
           "timeComplexity",
           "spaceComplexity",
           "suggestions",
           "score",
           "summary",
         ];

         for (const field of requiredFields) {
           if (!(field in parsedAnalysis)) {
             throw new Error(`Missing required field in AI response: ${field}`);
           }
         }

         // Set default values for optional fields if not provided
         parsedAnalysis.potentialBugs = parsedAnalysis.potentialBugs || [];
         parsedAnalysis.bestPractices = parsedAnalysis.bestPractices || [];

         resolve(parsedAnalysis);
       } catch (error) {
         console.error("AI analysis error:", error);

         // Provide a fallback analysis if the API fails
         const fallbackAnalysis = {
           optimizedCode: code,
           timeComplexity: "Unknown (analysis failed)",
           spaceComplexity: "Unknown (analysis failed)",
           suggestions: [
             "Failed to get AI analysis. Please check your API key and try again.",
             error.message,
           ],
           score: 0,
           summary: "Analysis failed: " + error.message,
           potentialBugs: [],
           bestPractices: [],
         };

         resolve(fallbackAnalysis);
       } finally {
         setIsAnalyzing(false);
       }
     }),
     {
       loading: "AI is analyzing your code...",
       success: (data) => {
         setAiAnalysis(data);
         setActiveTab("ai");
         return data.summary || "AI analysis complete!";
       },
       error: (err) => {
         console.error(err);
         return "AI analysis failed. Please try again.";
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
                  className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none transition-all duration-300 shadow-md"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.value}
                      value={lang.value}
                      className="bg-gray-800 text-white"
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
                  onChange={setCode}
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
                            <span className="font-mono text-[#ebd15f]">{type}</span>:{" "}
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
                  <h3 className="text-xl font-bold mb-4 text-pink-500">AI Analysis</h3>

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
                    <h4 className="font-semibold mb-2 text-green-500">Optimized Code</h4>
                    <div className="bg-gray-800 text-white p-3 rounded font-mono text-sm overflow-x-auto">
                      <pre>{aiAnalysis.optimizedCode}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-orange-500">Suggestions</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
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
