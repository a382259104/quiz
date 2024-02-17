function FindIndex() {


    let numberArray1 = [1,2,4,5,6];
    let stringArray1 = ['string1', 'string2'];
    
    const fourIndex = numberArray1.findIndex(a => a === 4);
    const string3Index = stringArray1.findIndex(a => a === 'string2');

    const numbersGreaterThan2 = numberArray1.filter(a=> a>2);
    const evenNumbers = numberArray1.filter(a=> a%2 === 0);
    const oddNumbers = numberArray1.filter(a=> a%2 !== 0);

    return (
        <>
        <h2>FindIndex function</h2>
        fourIndex = {fourIndex}<br/>
        string3Index ={string3Index} <br/>
        <h2>Filter function</h2>
        numbersGreaterThan2 = {numbersGreaterThan2}<br/>
        evenNumbers = {evenNumbers} <br/>
        oddNumbers = {oddNumbers} <br/>
        </>
    )

}

export default FindIndex;