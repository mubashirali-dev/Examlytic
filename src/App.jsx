import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import SigninPage from "./Pages/SigninPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import MainScreen from "./Pages/mainScreen.jsx";

export default function App() {
  const [page, setPage] = useState("main"); // default screen

  return (
    <>
      
      {page === "main" && <MainScreen setPage={setPage} />}
     {page === "login" && <SigninPage setPage={setPage} />}
      {page === "signup" && <SignupPage setPage={setPage} />}
    </>
  );
}













