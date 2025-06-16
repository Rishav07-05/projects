

// The main Docs component for displaying website documentation.
const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-500 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-spacegrotesk text-gray-100">
      <div className="max-w-4xl w-full bg-gray-800 shadow-lg rounded-xl p-8 sm:p-10 lg:p-12">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bebas text-indigo-400 sm:text-6xl mb-4 tracking-wide">
            Welcome to Refactor AI
          </h1>
          <p className="text-xl text-gray-300 font-medium">
            Your AI-powered assistant for better, cleaner, and more efficient
            code.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-3xl font-bebas text-indigo-300 mb-4 flex items-center tracking-wider">
            <svg
              className="w-8 h-8 mr-3 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h2v-2h-2v2zm2.95-6.6c-.22-.38-.49-.7-.8-.94s-.68-.45-1.07-.53c-.39-.08-.8-.06-1.18.06-.38.12-.72.33-1.01.62-.29.29-.53.64-.71 1.03-.18.4-.27.84-.27 1.28H9c0-.6.13-1.17.38-1.7s.61-1.02 1.05-1.42c.44-.4.94-.71 1.5-.94.56-.23 1.16-.35 1.76-.35 1.13 0 2.05.32 2.76.95.7.63 1.06 1.48 1.06 2.53 0 .47-.09.9-.27 1.3-.18.4-.42.75-.72 1.05-.3.3-.64.55-1.03.74-.39.19-.8.28-1.22.28H12v-2h-.05z" />
            </svg>
            What is Refactor AI?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Refactor AI is an innovative online tool designed to help developers
            enhance their code quality. By leveraging advanced Artificial
            Intelligence, our platform takes your code, analyzes its complexity,
            and then provides a refined, optimized, and more readable version.
            Whether you're looking to simplify complex functions, improve
            performance, or just make your code easier for others (or your
            future self!) to understand, Refactor AI is here to assist.
          </p>
        </section>

        {/* How to Use */}
        <section className="mb-10">
          <h2 className="text-3xl font-bebas text-green-300 mb-4 flex items-center tracking-wider">
            <svg
              className="w-8 h-8 mr-3 text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 18h4v-2h-4v2zm-3-6h10v-2H7v2zm-3-4h16V8H4v2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            How to Use
          </h2>
          <ol className="list-decimal list-inside text-lg text-gray-300 space-y-3">
            <li>
              <strong className="text-white">Input Your Code:</strong> Navigate
              to the main application page. You'll find a large text area where
              you can paste or type your code. We recommend providing a complete
              function or a small, self-contained code snippet for the best
              results.
            </li>
            <li>
              <strong className="text-white">Initiate Analysis:</strong> Once
              your code is in the input area, click the "
              <span className="font-bold text-indigo-400">
                Analyze & Improve
              </span>
              " (or similar) button. Our system will then process your code.
            </li>
            <li>
              <strong className="text-white">Review the Output:</strong> After a
              brief moment, the improved version of your code will appear in the
              output section. This will typically include a more readable
              structure, potentially optimized logic, and enhanced comments.
            </li>
            <li>
              <strong className="text-white">Copy & Implement:</strong> You can
              easily copy the refined code using the provided copy button and
              integrate it into your projects.
            </li>
          </ol>
        </section>

        {/* What We Do */}
        <section className="mb-10">
          <h2 className="text-3xl font-bebas text-blue-300 mb-4 flex items-center tracking-wider">
            <svg
              className="w-8 h-8 mr-3 text-blue-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99c-2.49 0-4.5-2.01-4.5-4.5S9.51 3.99 12 3.99s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
            </svg>
            Behind the Scenes: AI-Powered Refinement
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Refactor AI operates in two primary stages to deliver superior code:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li>
              <strong className="text-white">Complexity Analysis:</strong> Our
              system first analyzes the submitted code for common indicators of
              complexity, such as deeply nested loops, lengthy functions,
              redundant logic, and unclear variable names. This initial
              assessment helps us understand the areas that require the most
              attention.
            </li>
            <li>
              <strong className="text-white">AI-Driven Improvement:</strong>{" "}
              Using advanced Large Language Models (LLMs), the identified
              complex sections are then re-written. The AI is trained to
              generate code that is:
              <ul className="list-circle list-inside ml-6 text-base text-gray-400 space-y-1 mt-1">
                <li>
                  <strong className="text-white">More Readable:</strong>{" "}
                  Emphasizing clear variable names, logical flow, and
                  appropriate comments.
                </li>
                <li>
                  <strong className="text-white">More Maintainable:</strong>{" "}
                  Reducing coupling and improving modularity where possible.
                </li>
                <li>
                  <strong className="text-white">
                    Potentially More Efficient:
                  </strong>{" "}
                  Suggesting algorithmic improvements or standard library
                  functions.
                </li>
                <li>
                  <strong className="text-white">Idiosyncrasy-Free:</strong>{" "}
                  Removing unnecessary code patterns and promoting best
                  practices.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-10">
          <h2 className="text-3xl font-bebas text-purple-300 mb-4 flex items-center tracking-wider">
            <svg
              className="w-8 h-8 mr-3 text-purple-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Why Use Refactor AI?
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li>
              <strong className="text-white">Boost Code Quality:</strong>{" "}
              Instantly get suggestions for cleaner, more robust code.
            </li>
            <li>
              <strong className="text-white">Save Time:</strong> Reduce manual
              refactoring efforts and focus on new features.
            </li>
            <li>
              <strong className="text-white">Learn Best Practices:</strong>{" "}
              Observe AI-generated improvements to understand modern coding
              patterns.
            </li>
            <li>
              <strong className="text-white">Improve Collaboration:</strong>{" "}
              Well-structured code is easier for teams to work with.
            </li>
            <li>
              <strong className="text-white">Increase Efficiency:</strong> AI
              can often spot subtle optimizations you might miss.
            </li>
          </ul>
        </section>

        {/* Supported Languages */}
        <section className="mb-10">
          <h2 className="text-3xl font-bebas text-red-300 mb-4 flex items-center tracking-wider">
            <svg
              className="w-8 h-8 mr-3 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.01 18c-3.87 0-7-3.13-7-7H7c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5c-.92 0-1.78.29-2.5.79V8.89c.72-.5 1.58-.79 2.5-.79 3.31 0 6 2.69 6 6s-2.69 6-6 6zm-2.5-9h-2v-2h2v2z" />
            </svg>
            Supported Languages
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Refactor AI is designed to work with a wide range of popular
            programming languages. While it can understand many, it performs
            best with:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li>JavaScript (including React, Node.js)</li>
            <li>Python</li>
            <li>Java</li>
            <li>C++</li>
            <li>C#</li>
            <li>Go</li>
            <li>Ruby</li>
            <li>PHP</li>
          </ul>
        </section>

        {/* Important Note */}
        <section className="mb-10 p-6 bg-yellow-900 border-l-4 border-yellow-700 text-yellow-300 rounded-lg">
          <h3 className="text-xl font-bebas mb-2 flex items-center tracking-wider">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            Important Note
          </h3>
          <p className="text-lg leading-relaxed">
            While Refactor AI strives to provide high-quality, optimized code,
            it is an AI tool. Always review the AI-generated suggestions to
            ensure they meet your specific project requirements and coding
            standards. Human oversight is crucial for critical applications.
          </p>
        </section>

        {/* Feedback/Support */}
        <section className="text-center">
          <h2 className="text-2xl font-bebas text-white mb-4 tracking-wider">
            Have Questions or Feedback?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            We're always looking to improve Refactor AI. If you have any
            questions, suggestions, or encounter issues, please don't hesitate
            to reach out!
          </p>
          <a
            href="mailto:zorin4x@gmail.com"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bebas tracking-wider rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
};

export default Docs;
