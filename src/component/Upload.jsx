import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setResponse } from "../redux/uploadSlice";
import Result from "./Result";

function Upload() {
  const [pdfFile, setPdfFile] = useState(null);
  const dispatch = useDispatch();
  let open = useSelector((state) => state.upload.open);
  const [userInput, setUserInput] = useState({
    firstRule: "",
    secondRule: "",
    thirdRule: "",
  });
  function handleChange(e) {
    let { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pdfFile) return alert("Please upload a pdf!");

    const formData = new FormData();
    formData.append("pdf", pdfFile);
    formData.append("rules", JSON.stringify(userInput));
    dispatch(setOpen(!open));
    // console.log(Object.fromEntries(formData));
    const response = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("LLM Response:", result);
    if (result.success) {
      dispatch(setResponse(result.rulesResult.extracted));
    }
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {open ? (
        <div className="w-full lg:w-1/2 h-fit shadow-2xl rounded-2xl p-5 flex flex-col justify-evenly items-center">
          <Result/>
        </div>
      ) : (
        <div className="lg:w-1/2 h-10/18 shadow-2xl rounded-2xl p-5 flex flex-col justify-evenly items-center">
          <h2 className="text-2xl font-bold underline">Upload your pdf</h2>
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-full flex flex-col gap-5 justify-center items-center"
          >
            <input
              type="file"
              name="pdfFile"
              required
              id="pdfFile"
              className="w-full cursor-pointer"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Tell your rules..."
              name="firstRule"
              required
              className="bg-white border  p-2 w-full rounded-2xl cursor-pointer text-black"
              value={userInput.firstRule}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tell your rules..."
              name="secondRule"
              required
              value={userInput.secondRule}
              className="bg-white border p-2 w-full rounded-2xl cursor-pointer text-black"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tell your rules..."
              name="thirdRule"
              value={userInput.thirdRule}
              className="bg-white border p-2 w-full rounded-2xl cursor-pointer text-black"
              onChange={handleChange}
            />
            <button className="p-2 bg-black text-yellow-500 outline-0 rounded-2xl border w-fit cursor-pointer h-fit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Upload;
