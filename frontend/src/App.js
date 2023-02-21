import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ActiveNotes from "./components/activeNotes/ActiveNotes";
import ArchivedNotes from "./components/archivedNotes/ArchivedNotes";
import LogIn from "./components/logIn/LogIn";
import Home from "./components/home/Home";
// import { withAuth } from "./util/withAuth";
import SignUp from "./components/signUp/SignUp";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={<ProtectedRoutes />}
      >
        <Route path="/" element={<Navigate to="/home"/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/activeNotes" element={<ActiveNotes />}></Route>
        <Route path="/archiveNotes" element={<ArchivedNotes />}></Route>
      </Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/*" element={<LogIn/>}></Route>
    </Routes>
  </BrowserRouter>
);
