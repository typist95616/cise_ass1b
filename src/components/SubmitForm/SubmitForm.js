import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "./SubmitForm.css";

const SubmitForm = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) =>{ 
    setResult(JSON.stringify(data));
    insertPaper(data);
    alert("Article Submitted");
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
    
      <label>Article Title</label>
      <p><input {...register("title")} placeholder="Title" className="formInput" required/></p>
      <label>Authors</label>
      <p><input {...register("authors")} placeholder="Authors" className="formInput" required/></p>
      <label>Journal</label>
      <p><input {...register("journal")} placeholder="Journal" className="formInput" required/></p> 
      <label>Publication Year</label>
      <p><input {...register("yearOfPublication")} placeholder="Publication Year" className="formInput" required/></p>
      <label>Volume</label>
      <p><input {...register("volume")} placeholder="Volume" className="formInput" required/></p>
      <label>Pages</label>
      <p><input {...register("pages")} placeholder="Pages" className="formInput" required/></p>
      <label>DOI</label>
      <p><input {...register("DOI")} placeholder="DOI" className="formInput" required/></p>

      <p><select {...register("claims")}>
        <option value="">Select Claim</option>
        <option value="Agree">Agree</option>
        <option value="Disagree">Disagree</option>
        </select>
      </p>

      <label>Your Email</label>
      <p><input {...register("email")} placeholder="Email" /></p>
     
      <label>SE Practice</label>
      <p><select {...register("SEpractice")}>
        <option value="">Select SE practice...</option>
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select></p>
      <input type="submit" />
    </form>
  );
}

function insertPaper(row){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://csie-ass1b.herokuapp.com/submitPaper");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    let data = JSON.stringify(row);
    xhr.send(data);
}

export default SubmitForm;