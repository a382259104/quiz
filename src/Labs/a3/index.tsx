import Add from "./Add";
import Classes from "./Classes";
import Highlight from "./Highlight";
import JavaScript from "./JavaScript";
import Arrays from "./JavaScript/Arrays";
import WorkingWithFunctions from "./JavaScript/WorkingWithFunctions";
import Styles from "./Styles";
import Routing from "./routing";
import TodoList from "./todos/TodoList";

function Assignment3() {
    return (
        <div className="container">
            <h1>Assignment 3</h1>
            <JavaScript/>
            <WorkingWithFunctions/>
            <Arrays/>
            <Routing/>
            <Classes/>
            <Styles/>
            <Highlight>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.

            </Highlight>
            <Add a={3} b={4}/>
            <TodoList/>

        </div>
    );
}

export default Assignment3;