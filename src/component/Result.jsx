import React from "react";
import { useSelector } from "react-redux";

function Result() {
  let response = useSelector((state) => state.upload.response);
  console.log(response);
  return (
    <>
      <div className="w-full h-fit">
        <p className="text-center text-3xl font-bold underline mb-5">Generated Result</p>
        <div>{response.length===0?(
            <div className="w-full h-full flex justify-center">
                <span className="loading loading-spinner text-success"></span>
            </div>
        ):(
            response.map((ele,idx)=>(
                <div key={idx} className="b-1 mb-5">
                    <p className="text-2xl font-bold">Rule{idx+1}: {ele.rule}</p>
                    <p className="text-lg"><span className="font-bold">Status: </span>{ele.status}</p>
                    <p className="text-lg"><span className="font-bold">Evidence: </span>{ele.result}</p>
                    <p className="text-lg"><span className="font-bold">Reasoning: </span>{ele.reasoning}</p>
                    <p className="text-lg"><span className="font-bold">Confidence: </span>{ele.confidence}</p>
                </div>
            ))
        )}</div>
        {response.length===0?null:(<a href="/" className="underline">Home</a>)}
      </div>
    </>
  );
}

export default Result;
