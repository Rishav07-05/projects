const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 flex flex-col items-center py-14 px-4 sm:px-6 lg:px-8 font-spacegrotesk text-gray-100">
      {/* Glass Card Wrapper */}
      <div className="max-w-5xl w-full backdrop-blur-xl bg-white/10 shadow-2xl rounded-3xl p-10 sm:p-12 border border-white/20">

        {/* Title Section */}
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bebas text-indigo-400 sm:text-7xl mb-4 tracking-wide drop-shadow-lg">
            Refactor AI
          </h1>
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            AI-powered assistant that simplifies, analyzes & improves your code quality.
          </p>
        </div>

        {/* SECTION TEMPLATE CLASS */}
        {/* Creates a modern, neon-bordered card */}
        {/** USAGE: <section className="doc-card"> ... </section> */}

        <style>
          {`
            .doc-card {
              @apply mb-12 p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all hover:border-indigo-400/40 hover:shadow-indigo-400/20;
            }
          `}
        </style>

        {/* What is */}
        <section className="doc-card">
          <h2 className="text-3xl font-bebas text-indigo-300 mb-4 flex items-center tracking-wider">
            <svg className="w-8 h-8 mr-3 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10..." />
            </svg>
            What is Refactor AI?
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            Refactor AI enhances your code quality using advanced AI algorithms that analyze complexity and
            refactor it into cleaner, more efficient, and readable versions — saving you time and effort.
          </p>
        </section>

        {/* How to Use */}
        <section className="doc-card">
          <h2 className="text-3xl font-bebas text-green-300 mb-5 flex items-center tracking-wider">
            <svg className="w-8 h-8 mr-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 18h4v-2..." />
            </svg>
            How to Use
          </h2>

          <ol className="list-decimal list-inside text-lg text-gray-300 space-y-4 leading-relaxed">
            <li><strong className="text-white">Paste Code</strong> into the input box on the main page.</li>
            <li><strong className="text-white">Click Analyze</strong> to initiate AI-processing.</li>
            <li><strong className="text-white">Review Refactored Output</strong> with cleaner logic.</li>
            <li><strong className="text-white">Copy & Use</strong> the optimized code in your project.</li>
          </ol>
        </section>

        {/* What We Do */}
        <section className="doc-card">
          <h2 className="text-3xl font-bebas text-blue-300 mb-4 flex items-center tracking-wider">
            <svg className="w-8 h-8 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5..." />
            </svg>
            Behind the Scenes: AI Refinement
          </h2>

          <p className="text-lg text-gray-300 mb-4">
            Refactor AI works in two stages:
          </p>

          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3 ml-1">
            <li>
              <strong className="text-white">Complexity Analysis:</strong> Detects nested loops, redundant logic, long functions, poor readability.
            </li>
            <li>
              <strong className="text-white">AI-Driven Improvement:</strong> Code is rewritten to be:
              <ul className="list-inside ml-7 mt-2 text-gray-400 text-base space-y-1">
                <li>Readable & structured</li>
                <li>More maintainable</li>
                <li>Possibly more efficient</li>
                <li>Clean & consistent</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Benefits */}
        <section className="doc-card">
          <h2 className="text-3xl font-bebas text-purple-300 mb-4 flex items-center tracking-wider">
            <svg className="w-8 h-8 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2..." />
            </svg>
            Why Use Refactor AI?
          </h2>

          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li>Cleaner & more robust code quality</li>
            <li>Faster development workflow</li>
            <li>Learn modern coding best practices</li>
            <li>Easier collaboration & readability</li>
            <li>Spot optimizations you may miss</li>
          </ul>
        </section>

        {/* Languages */}
        <section className="doc-card">
          <h2 className="text-3xl font-bebas text-red-300 mb-4 flex items-center tracking-wider">
            <svg className="w-8 h-8 mr-3 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2..." />
            </svg>
            Supported Languages
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-lg text-gray-300">
            {["JavaScript", "Python", "Java", "C++", "C#", "Go", "Ruby", "PHP"].map((lang) => (
              <div key={lang} className="p-2 bg-white/5 rounded-lg border border-white/10 text-center">
                {lang}
              </div>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <section className="p-6 rounded-xl bg-yellow-900/40 border-l-4 border-yellow-500 mb-12 backdrop-blur-lg">
          <h3 className="text-2xl font-bebas mb-3 tracking-wider flex items-center text-yellow-300">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 21h22L12 2..." />
            </svg>
            Important Note
          </h3>

          <p className="text-lg leading-relaxed text-yellow-200">
            AI-generated code is powerful — but review suggestions before adding them to production.
          </p>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-3xl font-bebas tracking-wider text-white mb-4">
            Have Questions or Feedback?
          </h2>

          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
            We constantly improve Refactor AI — feel free to reach out anytime.
          </p>

          <a
            href="mailto:zorin4x@gmail.com"
            className="inline-flex items-center px-7 py-3 bg-indigo-600 rounded-full shadow-lg text-lg font-bebas tracking-wide hover:bg-indigo-700 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882..." />
            </svg>
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
};

export default Docs;
