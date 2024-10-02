import React, { useEffect, useRef, useState } from "react";
import "./AddProf.css";
import { Navigate } from "react-router-dom";
import { getAllUsersTypes, insertByMSAId } from "../../Slices/AdminSlice";
import toast from "react-hot-toast";
import { getSession, validArray } from "../Controller";

export default function AddUser() {
  const [finalData, setFinalData] = useState({ Type: "Student" });
  const [Types, setTypes] = useState([]);
  const inputField = useRef();

  function handleInputChange(name) {
    setFinalData((prev) => ({
      ...prev,
      [name]: document.getElementById(name).value,
    }));
  }
  useEffect(() => {
    getAllUsersTypes().then((res) => {
      if (validArray(res.msg)) setTypes(res.msg);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (finalData.MSAId) {
      insertByMSAId(finalData);
      inputField.current.value = "";
      inputField.current.focus();
      toast(`User with MSAId:${finalData.MSAId} Inserted Successfully!`, {
        type: "success",
        icon: "👍",
      });
    } else {
      toast("Please Enter MSAId", {
        type: "error",
        icon: "🚫",
      });
    }
    setFinalData((prev) => ({ ...prev, MSAId: "" }));
  }
  if (getSession("Type") !== "Admin") return <Navigate to="/" />;

  return (
    <div className="container-add-prof">
      <h1 className="form-title">Add User</h1>
      <hr className="title-line" />
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="user-info">
          <div className="input-box">
            <label htmlFor="MSAId">MSAId:</label>
            <input
              ref={inputField}
              type="text"
              id="MSAId"
              name="MSAId"
              placeholder="Enter MSAId"
              onChange={() => handleInputChange("MSAId")}
            />
          </div>
          <div className="input-box">
            <label htmlFor="Type">User Type:</label>
            <select
              id="Type"
              name="Type"
              onChange={() => handleInputChange("Type")}
              value={finalData.Type}
            >
              {validArray(Types) &&
                Types.map((type) => {
                  return (
                    <option key={type.Id} value={type.Name}>
                      {type.Name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="submit-btn-container">
          <input type="submit" value="Add User" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
