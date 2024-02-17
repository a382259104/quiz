function ImpliedReturn() {

    const multiply = (a:number,b:number) => a * b;
    const fourTimesFive = multiply(4,5);
    console.log(fourTimesFive);

    return (
        <>
        <h2>Implied Return</h2>
        <p>fourTimesFive = {fourTimesFive}</p>
        <p>mutiply(4,5) = {multiply(4,5)}</p>

        </>
    )
    
}

export default ImpliedReturn;