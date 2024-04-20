// Main Quiz Editor component

import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";

function Preview({ questionType, question }: { questionType: any, question: any }) {

const renderQ = () => {
    switch (questionType) {
        case "MultipleChoice":
            return <MultipleChoice />

        case "TrueFalse":
            return <TrueFalse/>

        case "FillInTheBlanks":
            <>FillInTheBlanks</>
            break;

        default:
            <>no such Q</>
    }
}
    return (
        <div>
 



    
        </div>
    )
}

export default Preview;