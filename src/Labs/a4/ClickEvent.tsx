function ClickEvent() {

    const hello = () => {
        alert("Hello world.");
    }

    const lifeIs = (good : string) => {
        alert(`Life is ${good}`);
    };

    return (

        <div>
            <h2>Click Event</h2>
            <button onClick={hello}>
                Click Hello
            </button>
            <button onClick={() => lifeIs("poopy")}>
                Click poop
            </button>
            <button onClick={() => {hello();
            lifeIs('ahhhhhhhhhh');}}>
                Hello and life
            </button>
        </div>



    );


}


export default ClickEvent;