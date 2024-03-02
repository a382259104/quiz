import BooleanVariables from "../a3/JavaScript/variables/BooleanVariables";

function One() {
    var functionScope = 2;
    let blockScope =5;
    const constant1 = functionScope - blockScope;


    let numberVariable = 123;
    let isNumber = typeof numberVariable;
    let isBoolean = typeof BooleanVariables;

    let true1 = true && true;
    let true2 = true || false;
    let number = 2, floating = 123.123;

    return (
        <>
        <h2>If else</h2>
        {true1 && <p>true</p>}
        </>
    );
}

export default One;