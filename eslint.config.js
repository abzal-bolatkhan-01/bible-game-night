export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        alert: "readonly",
        confirm: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        firebase: "readonly",
        G: "writable",
        go: "writable",
        show: "writable",
        hide: "writable",
        QB: "writable",
        TF_Q: "writable",
        VERSE_Q: "writable",
        Image: "readonly",
        URL: "readonly",
        Notification: "readonly",
        requestAnimationFrame: "readonly",
        FileReader: "readonly",
        File: "readonly",
        Worker: "readonly",
        Event: "readonly",
        CustomEvent: "readonly"
      }
    },
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "no-unreachable": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-const-assign": "error",
      "use-isnan": "error",
      "no-redeclare": "warn"
    }
  }
];
