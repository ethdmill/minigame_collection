import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Home from './components/home'
import Scattergories from './components/games/scattergories/game'
import ScattergoriesRules from './components/games/scattergories/rules/rules'
import ScattergoriesRoadmap from './components/games/scattergories/roadmap/roadmap'

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="m-auto">
          <NavDropdown title="Scattergories" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/scattergories">Play</NavDropdown.Item>
            <NavDropdown.Item href="/scattergories/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/scattergories/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Millionaire" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/millionaire">Play</NavDropdown.Item>
            <NavDropdown.Item href="/millionaire/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/millionaire/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Hangman" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/hangman">Play</NavDropdown.Item>
            <NavDropdown.Item href="/hangman/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/hangman/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Tail Chase" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/tail-chase">Play</NavDropdown.Item>
            <NavDropdown.Item href="/tail-chase/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/tail-chase/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/scattergories" exact component={Scattergories} />
        <Route path="/scattergories/rules" exact component={ScattergoriesRules} />
        <Route path="/scattergories/roadmap" exact component={ScattergoriesRoadmap} />
        {/* <Route path="/millionaire" exact component={Home} /> */}
        {/* <Route path="/millionaire/rules" exact component={Home} /> */}
        {/* <Route path="/millionaire/roadmap" exact component={Home} /> */}
        {/* <Route path="/hangman" exact component={Home} /> */}
        {/* <Route path="/hangman/rules" exact component={Home} /> */}
        {/* <Route path="/hangman/roadmap" exact component={Home} /> */}
        {/* <Route path="/tailchase" exact component={Home} /> */}
        {/* <Route path="/tailchase/rules" exact component={Home} /> */}
        {/* <Route path="/tailchase/roadmap" exact component={Home} /> */}
      </Router>
    </>
  )
}
