
import './index.css'
import {App} from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import ReactDom from 'react-dom/client'
ReactDom.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>
)

