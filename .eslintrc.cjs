module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: false
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "import"
    ],
    rules: {
        "indent": [1, 4],
        "@typescript-eslint/quotes": [
            "warn",
            "double",
            {
                "allowTemplateLiterals": true
            }
        ],
        "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "no-unused-expressions": "off",
        "no-plusplus": 0,
        "no-restricted-syntax": 0,
        "consistent-return": 0,
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "import/no-unresolved": 1,
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "@typescript-eslint/no-use-before-define": 0,
        "no-use-before-define": 0,
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        "no-shadow": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "": "never",
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never"
            }
        ]
    },
    settings: {
        react: {
            version: "detect"
        },
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            typescript: {},
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ["node_modules", "src/"]
            }
        }
    }
}
