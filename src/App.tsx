import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import CharacterProfilePage from "./pages/CharacterProfilePage";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterProfilePage />} />
    </Routes>
  </Router>
);

export default App;
