import SignCover from "./components/Sign/SignCover/SignCover";
import LandingPage from "./components/LandingPage/LandingPage";
import ElectionForm from "./components/ElectionForm/ElectionForm";
import ElectionList from "./components/ElectionList/ElectionList";
import ElectionPage from "./components/ElectionPage/ElectionPage";
import AddCandidate from "./components/AddCandidate/AddCandidate";
import AddVoter from "./components/AddVoter/AddVoter";
import VotersList from "./components/VotersList/VotersList";
import CandidateList from "./components/CandidateList/CandidateList";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  // const onFetchElectionList = (electionData) => {
  //   console.log(electionData);
  // };

  return (
    <Routes>
      <Route path="/" element={<SignCover />} />;
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/election-form" element={<ElectionForm />} />
      <Route path="/election-list" element={<ElectionList />} />
      <Route path="/election-page" element={<ElectionPage />} />
      <Route path="/add-voter/:id" element={<AddVoter />} />
      <Route path="/add-candidate/:id" element={<AddCandidate />} />
      <Route path="/voters-list/:id" element={<VotersList />} />
      <Route path="/candidate-list/:id" element={<CandidateList />} />
    </Routes>
  );
}

export default App;
