

const Footer = () => {
  return (
    <div>
      <div className="relative w-full bg-black mt-44 border-t-2 rounded-2xl  ">
        {/* Main footer container */}
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row">
          {/* Left side - Big Logo */}
          <div className="md:w-1/3 flex items-center justify-center md:justify-start mb-10 md:mb-0">
            <div className="relative w-64 h-64">
              {/* Replace with your actual logo component or SVG */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl flex items-center justify-center p-8 border border-pink-500/30">
                <div className="text-center">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 font-doto">
                    Refact AI
                  </span>
                  <p className="text-gray-400 mt-2 text-sm font-spacegrotesk">
                    Intelligent Code Assistance
                  </p>
                </div>
              </div>

              {/* Optional decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-pink-500/10 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                Connect With Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    ),
                    url: "#",
                  },
                  {
                    name: "Twitter",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    ),
                    url: "#",
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    url: "#",
                  },
                  {
                    name: "Email",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    url: "mailto:hello@refactai.com",
                  },
                  {
                    name: "WhatsApp",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ),
                    url: "#",
                  },
                  {
                    name: "Phone",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                    url: "tel:+15551234567",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-900/50 transition-all group"
                  >
                    <span className="text-pink-500 group-hover:text-pink-400 transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Documentation", url: "#" },
                  { name: "API Reference", url: "#" },
                  { name: "Pricing", url: "#" },
                  { name: "Blog", url: "#" },
                  { name: "Careers", url: "#" },
                  { name: "Changelog", url: "#" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      className="text-gray-400 hover:text-pink-500 transition-colors flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400">
                Newsletter
              </h3>
              <p className="text-gray-400">
                Subscribe to get updates on new features and releases.
              </p>
              <form className="mt-4 space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500">
                We care about your data. Read our{" "}
                <a href="#" className="text-pink-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className=" py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Refact AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-pink-500 text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
