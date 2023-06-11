// 引入
const path = require("path");

// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");

// 引入 clean 插件，會在每次編譯前先清空文件夾下面的文件，保證都是最新文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//webpack 中所有配置都應該寫在 module.exports 中
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",
    mode: "development",
    //指定打包文件所在目录
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, "dist"),
        //打包后文件的名字
        filename: "bundle.js",
        // 告訴 webpack 不使用箭頭函數
        environment: {
            arrowFunction: false,
            const: false,
        },
    },
    //指定webpack打包时使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test 指定规则生效的文件，以下匹配以 ts 结尾的文件
                test: /\.ts$/,
                //要使用的loader，用 ts-loader 处理以 ts 结尾的文件
                use: [
                    // 配置 balel
                    {
                        loader: "babel-loader",
                        options: {
                            // 設置預定義的環境
                            presets: [
                                // 指定環境插件
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            browsers: "last 2 versions",
                                        },
                                        // 指定 config.js版本
                                        corejs: "3",
                                        // 使用corejs的方式 usage表示需要加載
                                        useBuiltIns: "usage",
                                    },
                                ],
                            ],
                        },
                    },
                    "ts-loader",
                ],
                //要排除的文件
                exclude: /node_modules/,
            },
            // 設置 less文件設置
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 postloader
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions",
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "less-loader",
                ],
            },
        ],
    },

    // 配置 webpack 插件
    plugins: [new HTMLWebpackPlugin({ template: "./src/index.html" }), new CleanWebpackPlugin()],
    resolve: {
        extensions: [".ts", ".js"],
    },
};
