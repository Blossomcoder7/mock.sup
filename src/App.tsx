import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Layout from "./layouts/Layout";
import FAQPage from "./pages/faq/Page";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
