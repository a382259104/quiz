import Nav from "../Nav";
import KanbasNavigation from "./Navigation";

function Kanbas() {
    return (
        <div className="d-flex">
            <div>
                <KanbasNavigation/>
            </div>
            <div style={{ flexGrow: 1 }}>
                <h1>Account</h1>
                <h1>Dashboard</h1>
                <h1>Courses</h1>
            </div>
        </div>

    );
}

export default Kanbas;