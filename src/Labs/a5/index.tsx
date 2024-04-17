import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
import "./index.css";


function Assignment5() {
    return (
      <div className="a5">
        <h1>Assignment 5</h1>
        <a href={`${process.env.REACT_APP_API_BASE}/a5/welcome`}>
          Welcome
        </a>
        <EncodingParametersInURLs/>
        <WorkingWithObjects/>
        <WorkingWithArrays/>
      </div>
    );
  }
  export default Assignment5;
  
  