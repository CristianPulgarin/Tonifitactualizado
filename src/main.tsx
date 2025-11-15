import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css'
import firebase from "./firebase/firebase";
import FirebaseContext from "./firebase/context";
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
<FirebaseContext.Provider value={{ firebase }}>
        <App />
    </FirebaseContext.Provider>
    );