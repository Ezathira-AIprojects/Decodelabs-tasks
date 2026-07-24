// Logibot logic engine — pure JS, works in browser and Node.
(function (root, factory) {
  const mod = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = mod;
  else root.LogibotEngine = mod;
})(typeof self !== "undefined" ? self : this, function () {

  const JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
    "Why did the developer go broke? Because he used up all his cache. 💸",
    "How many programmers does it take to change a light bulb? None — it's a hardware problem. 💡",
    "I told my computer I needed a break… it said 'No problem — I'll go to sleep.' 😴",
    "There are 10 kinds of people in the world: those who understand binary and those who don't. 🤓",
    "Debugging: being the detective in a crime movie where you are also the murderer. 🔍",
    "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
    "Why did the function stop calling back? Because it lost its arguments. 📞",
    "!false — it's funny because it's true. 😂",
    "Programmer's diet: coffee, pizza, and semicolons; 🍕",
  ];

  const QUOTES = [
    "The only way to do great work is to love what you do. — Steve Jobs ✨",
    "Code is like humor. When you have to explain it, it's bad. — Cory House 💬",
    "First, solve the problem. Then, write the code. — John Johnson 🧠",
    "Simplicity is the soul of efficiency. — Austin Freeman ⚡",
    "The best error message is the one that never shows up. — Thomas Fuchs 🎯",
    "Success is not final, failure is not fatal. — Winston Churchill 💪",
    "Dream big. Start small. Act now. 🚀",
    "Every expert was once a beginner. 🌱",
    "Push yourself, because no one else is going to do it for you. 🔥",
    "Great things never come from comfort zones. 🌟",
  ];

  const PROGRAMMING_QA = {
    python: "Python 🐍 is a high-level, interpreted language great for AI, web, scripting, and data science.",
    javascript: "JavaScript is the language of the web 🌐. Runs in browsers and on servers via Node.js.",
    typescript: "TypeScript is JavaScript with static types. Catches bugs at compile time. ⚙️",
    java: "Java ☕ is a statically-typed, OOP language that runs on the JVM.",
    "c++": "C++ is a powerful compiled language with manual memory management and templates. 🚀",
    "c#": "C# is Microsoft's modern OOP language on .NET.",
    rust: "Rust 🦀 is a systems language with memory safety without garbage collection.",
    golang: "Go 🐹 is a compiled language built for simplicity and concurrency via goroutines.",
    php: "PHP powers a huge chunk of the web (WordPress, Laravel). 🐘",
    ruby: "Ruby 💎 is a dynamic language famous for Rails.",
    swift: "Swift 🐦 is Apple's modern language for iOS/macOS apps.",
    kotlin: "Kotlin is a modern JVM language, official for Android.",
    react: "React ⚛️ is a JS library for building UIs with components and hooks.",
    vue: "Vue.js 💚 is a progressive UI framework — reactive data, SFCs.",
    angular: "Angular 🅰️ is Google's full-featured TS framework.",
    nextjs: "Next.js is a React meta-framework with SSR, SSG, routing. ▲",
    node: "Node.js runs JavaScript on the server using V8. 🟢",
    html: "HTML is the standard markup language for web pages. 🏷️",
    css: "CSS styles HTML — colors, layout, animations. 🎨",
    tailwind: "Tailwind CSS 🌬️ is a utility-first CSS framework.",
    api: "An API lets programs talk to each other. REST and GraphQL are common styles. 🔌",
    rest: "REST is an API style using HTTP verbs on resource URLs. Stateless.",
    graphql: "GraphQL lets clients query exactly the data they need. 🔮",
    database: "A database stores structured data. SQL vs NoSQL. 🗄️",
    sql: "SQL queries relational databases: SELECT, INSERT, UPDATE, DELETE, JOIN.",
    nosql: "NoSQL databases trade strict schemas for scale and flexibility.",
    mongodb: "MongoDB 🍃 is a document database storing JSON-like BSON.",
    postgres: "PostgreSQL 🐘 is a powerful open-source relational database.",
    redis: "Redis is an in-memory key-value store. ⚡",
    git: "Git is a distributed version control system. 🌿",
    github: "GitHub 🐙 hosts Git repos with PRs, issues, actions.",
    docker: "Docker 🐳 packages apps into containers.",
    kubernetes: "Kubernetes ☸️ orchestrates containers across clusters.",
    linux: "Linux 🐧 is an open-source Unix-like OS kernel.",
    algorithm: "An algorithm is a step-by-step procedure to solve a problem. 📈",
    "big o": "Big-O describes worst-case growth: O(1), O(log n), O(n), O(n²).",
    recursion: "Recursion is when a function calls itself. Always define a base case! 🔁",
    loop: "Loops repeat code: for, while, do-while. 🔄",
    variable: "A variable is a named storage for data. 📦",
    function: "A function is a reusable block of code that takes inputs and returns an output. 🧩",
    closure: "A closure remembers variables from its outer scope after that scope has returned.",
    promise: "A Promise represents a future value. ⏳",
    async: "async/await is syntactic sugar over Promises.",
    oop: "OOP: encapsulation, inheritance, polymorphism, abstraction.",
    class: "A class is a blueprint for objects.",
    object: "An object is an instance of a class.",
    inheritance: "Inheritance lets one class derive from another.",
    polymorphism: "Polymorphism = same interface, different implementations.",
    encapsulation: "Encapsulation bundles data + methods and hides internals.",
    abstraction: "Abstraction exposes what an object does, not how.",
    interface: "An interface defines a contract of methods a class must implement.",
    array: "An array is an ordered indexed collection.",
    "linked list": "A linked list is nodes connected by pointers.",
    stack: "A stack is LIFO. Used for call stacks and undo.",
    queue: "A queue is FIFO. Used for scheduling and BFS.",
    tree: "A tree is a hierarchical structure of nodes. 🌳",
    graph: "A graph is nodes connected by edges.",
    hash: "A hash table maps keys to values via a hash function. O(1) avg lookup.",
    sorting: "Common sorts: bubble O(n²), merge/quick/heap O(n log n).",
    search: "Linear O(n); binary O(log n) needs sorted array.",
    bug: "A bug is a defect in code. Reproduce → isolate → fix → verify. 🐞",
    debug: "Debugging: isolate the failing input, inspect state, use breakpoints.",
    compiler: "A compiler translates source into machine code ahead of time.",
    interpreter: "An interpreter executes code line by line at runtime.",
    json: "JSON is a lightweight data format: objects, arrays, strings, numbers, bool, null.",
    http: "HTTP is the protocol of the web. GET/POST/PUT/DELETE.",
    https: "HTTPS is HTTP over TLS — encrypted. 🔒",
    tcp: "TCP is a reliable, ordered transport protocol.",
    udp: "UDP is fast and connectionless.",
    dns: "DNS translates domain names into IP addresses. 🌍",
    cache: "A cache stores results of expensive ops for reuse.",
    regex: "Regex matches text patterns.",
    testing: "Testing: unit, integration, e2e.",
    tdd: "TDD: red → green → refactor. 🔴🟢♻️",
    agile: "Agile: iterative development, short feedback loops.",
    devops: "DevOps unifies dev and ops — CI/CD, IaC, monitoring.",
    cicd: "CI/CD automates test/build/deploy on every push. 🚚",
    thread: "A thread is a unit of execution. 🧵",
    concurrency: "Concurrency = dealing with many things at once.",
    mutex: "A mutex ensures only one thread accesses a resource. 🔐",
    functional: "Functional programming: pure functions, immutability.",
    immutable: "Immutable data can't be changed after creation.",
    solid: "SOLID: SRP, OCP, LSP, ISP, DIP.",
    mvc: "MVC separates data, UI, and input handling.",
    auth: "Authentication (who) vs Authorization (what).",
    jwt: "JWT is a signed token carrying claims.",
    oauth: "OAuth 2.0 is a delegated authorization protocol.",
  };

  const AI_QA = {
    ai: "AI is the field of building systems that perform tasks requiring intelligence. 🤖",
    ml: "Machine Learning: systems learn patterns from data. 📊",
    "machine learning": "Machine Learning trains models on data. Supervised, unsupervised, reinforcement.",
    "neural network": "A neural network is layers of connected nodes trained via backpropagation. 🧠",
    "deep learning": "Deep Learning uses many-layered neural networks.",
    llm: "An LLM is trained on massive text corpora to predict tokens. 📚",
    chatgpt: "ChatGPT is a conversational LLM by OpenAI. I'm a lighter rule-based cousin. 😉",
    gpt: "GPT = Generative Pre-trained Transformer.",
    transformer: "Transformers use self-attention. ⚡",
    nlp: "NLP = Natural Language Processing. 🗣️",
  };

  const KEYWORD_GROUPS = [
    { category: "greeting", triggers: ["hello","hi","hey","hiya","yo","sup","hola","greetings","howdy"],
      replies: (n) => [`Hey ${n}! 👋`, `Hi ${n}! 😊 What's on your mind?`, `Hello ${n}! 🚀`] },
    { category: "farewell", triggers: ["bye","goodbye","see ya","later","cya","farewell"],
      replies: (n) => [`Goodbye ${n}! 👋`, `See you later, ${n}! ✨`] },
    { category: "thanks", triggers: ["thanks","thank you","thx","ty","appreciate"],
      replies: (n) => [`You're welcome, ${n}! 🙌`, `Anytime! 💙`] },
    { category: "howareyou", triggers: ["how are you","how r u","how's it going","whats up","what's up"],
      replies: () => ["I'm just code, but running smoothly! ⚙️", "All systems green. 🟢"] },
    { category: "name-bot", triggers: ["your name","who are you","what are you"],
      replies: () => ["I'm Logibot 🤖 — a logic-based assistant."] },
    { category: "compliment", triggers: ["good bot","nice bot","awesome","cool","amazing"],
      replies: (n) => [`Aww, thanks ${n}! 🥰`, `You made my circuits happy. 💡`] },
    { category: "help", triggers: ["help","menu","commands","what can you do"],
      replies: () => ["Try:\n• 'joke' 😂\n• 'quote' 💡\n• 'time' 🕒 / 'date' 📅\n• math like '12 * 7'\n• programming topics: python, react, git…\n• 'my name is Alex' 🧠"] },
    { category: "joke-request", triggers: ["joke","funny","make me laugh"], replies: () => [pick(JOKES)] },
    { category: "quote-request", triggers: ["quote","motivate","motivation","inspire","inspiration"], replies: () => [pick(QUOTES)] },
    { category: "yes", triggers: ["yes","yeah","yep","sure","ok","okay"], replies: () => ["Great! ✅ Tell me more."] },
    { category: "no", triggers: ["no","nope","nah"], replies: () => ["Okay, no worries. 👍"] },
    { category: "weather", triggers: ["weather","rain","sunny"], replies: () => ["I can't check live weather 🌦️, but hope it's nice!"] },
    { category: "food", triggers: ["hungry","food","pizza","burger"], replies: () => ["I run on electrons ⚡, but pizza sounds great. 🍕"] },
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function normalize(t) { return t.toLowerCase().trim(); }

  function handleTime(i) {
    if (/\b(time|clock|hour)\b/.test(i)) return `🕒 It's ${new Date().toLocaleTimeString()}.`;
    return null;
  }
  function handleDate(i) {
    if (/\b(date|today)\b/.test(i)) return `📅 Today is ${new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;
    return null;
  }
  function handleMath(i) {
    const m = i.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/x])\s*(-?\d+(?:\.\d+)?)/);
    if (!m) return null;
    const a = parseFloat(m[1]), b = parseFloat(m[3]);
    const op = m[2] === "x" ? "*" : m[2];
    let r;
    if (op === "+") r = a + b;
    else if (op === "-") r = a - b;
    else if (op === "*") r = a * b;
    else if (op === "/") r = b === 0 ? NaN : a / b;
    if (Number.isNaN(r)) return "🚫 Can't divide by zero!";
    return `🧮 ${a} ${op} ${b} = ${r}`;
  }
  function handleNameSet(i) {
    const m = i.match(/(?:my name is|i am|i'm|call me)\s+([a-z][a-z0-9 _-]{0,30})/i);
    if (m) return m[1].trim().split(/\s+/)[0].replace(/^./, (c) => c.toUpperCase());
    return null;
  }
  function handleProgrammingAI(i) {
    const combined = Object.assign({}, AI_QA, PROGRAMMING_QA);
    for (const [k, v] of Object.entries(combined)) {
      const re = new RegExp(`\\b${k.replace(/[+#]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`, "i");
      if (re.test(i)) return v;
    }
    for (const [k, v] of Object.entries(combined)) if (k.length >= 3 && i.includes(k)) return v;
    return null;
  }
  function matchKeywordGroup(i, name) {
    for (const g of KEYWORD_GROUPS)
      for (const t of g.triggers) {
        const re = new RegExp(`\\b${t}\\b`, "i");
        if (re.test(i)) return { text: pick(g.replies(name)), category: g.category };
      }
    return null;
  }
  function smartFallback(i, name) {
    const who = name || "friend";
    if (/\?$/.test(i.trim())) return `Good question, ${who}! 🤔 Try topics like python, react, git, or type 'help'.`;
    if (i.split(/\s+/).length <= 2) return `Tell me a bit more about "${i.trim()}" — e.g. "what is ${i.trim()}?" 💡`;
    return `Got it, ${who}. I focus on programming & AI, jokes, quotes, time/date, math. Type 'help'. ✨`;
  }

  function generateReply(rawInput, currentName) {
    const input = normalize(rawInput);
    const newName = handleNameSet(input);
    if (newName) return { reply: { text: `Nice to meet you, ${newName}! 🎉`, category: "name-set" }, newName };
    const name = currentName || "friend";
    let r;
    if ((r = handleTime(input))) return { reply: { text: r, category: "time" } };
    if ((r = handleDate(input))) return { reply: { text: r, category: "date" } };
    if ((r = handleMath(input))) return { reply: { text: r, category: "math" } };
    const kw = matchKeywordGroup(input, name);
    if (kw) return { reply: kw };
    const prog = handleProgrammingAI(input);
    if (prog) return { reply: { text: prog, category: "knowledge" } };
    return { reply: { text: smartFallback(input, currentName), category: "fallback" } };
  }

  return { generateReply };
});
