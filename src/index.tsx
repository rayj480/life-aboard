import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import "./css/style.scss";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="Angular" />,
    document.getElementById("example")
);