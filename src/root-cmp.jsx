
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { ToyDashboard } from "./pages/ToyDashboard.jsx"
import { About } from "./pages/About.jsx"


import "../src/scss/styles/styles.scss"

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ToyDashboard />} />
              <Route path="/about" element={<About/>} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />
              <Route path="/toy/edit/" element={<ToyEdit />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
      <UserMsg/>
    </Provider>
  )
}