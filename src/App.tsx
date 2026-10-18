import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import ArchitectureDesigns from "./pages/ArchitectureDesigns";
import JointVentures from "./pages/JointVentures";
import Machinery from "./pages/Machinery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/architecture-designs" element={<ArchitectureDesigns />} />
        <Route path="/services/joint-ventures" element={<JointVentures />} />
        <Route path="/machinery" element={<Machinery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
