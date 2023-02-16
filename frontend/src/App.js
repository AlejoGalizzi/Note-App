import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ActiveNotes from "./components/activeNotes/ActiveNotes";
import ArchivedNotes from "./components/archivedNotes/ArchivedNotes";
import LogIn from "./components/logIn/LogIn";
import Home from "./components/home/Home";
import { withAuth } from "./util/withAuth";
import SignUp from "./components/signUp/SignUp";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={withAuth() ? <Home /> : <Navigate to="/login"/>}
      ></Route>
      <Route path="/activeNotes" element={withAuth() ? <ActiveNotes /> : <Navigate to="/login" replace />}></Route>
      <Route path="/archiveNotes" element={withAuth() ? <ArchivedNotes /> : <Navigate to="/login" replace />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
);
