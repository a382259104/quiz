function ArrowFunctions() {

    const substract = (a:number,b:number) => {
        return a - b;
    }

    const threeMinusOne = substract(3,1);
    console.log(threeMinusOne);

    return (
        <>
        <h3>New ES6 arrow funtions</h3>
        threeMinusOne = {threeMinusOne} <br/>
        subtract(3,1) = {substract(3,1)} <br/>
        </>
    )

}

export default ArrowFunctions;