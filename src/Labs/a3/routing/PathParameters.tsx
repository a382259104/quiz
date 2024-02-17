import { Link, Route, Routes } from "react-router-dom";
import Add from "./Add";

function PathParameters() {
    return (
        <>
            <h2>Path Parameters</h2>
            <Link to="/Labs/a3/add/1/2">1 + 2</Link><br/>
            <Link to="/Labs/a3/add/3/4">3 + 4</Link><br/>
            <Routes>
                <Route path="add/:a/:b" element={<Add/>}/>
            </Routes>
        </>

    )
}

export default PathParameters;