import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import InvitePage from "./pages/InvitePage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import LandingPage from "./pages/LandingPage.jsx"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:suffix/:slug" element={<DashboardPage />} />
        <Route path="/:slug" element={<InvitePage />} />
      </Routes>
    </Router>
  )
}
