import { useState } from "react";

import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import CodeEditor from "@/pages/Editor";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ui/common/ProtectedRoute";
import Admin from "./pages/Admin";
import Submission from "./pages/Submission";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/editor"
        element={
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/submission" element={<Submission />}></Route>
    </Routes>
  );
}

export default App;
