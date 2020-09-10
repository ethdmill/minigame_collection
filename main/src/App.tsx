import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Home from './components/home'
import Scattergories from './components/games/scattergories/game'
import ScattergoriesRules from './components/games/scattergories/rules/rules'
import ScattergoriesRoadmap from './components/games/scattergories/roadmap/roadmap'
//millionaire will go here, nestled in like a cute lil bug in the dirt
import Hangman from './components/games/hangman/game/game'
import HangmanRules from './components/games/hangman/rules/rules'
import HangmanRoadmap from './components/games/hangman/roadmap/roadmap'

// these are temporary, but cheetos are forever
import Millionaire from './components/games/millionaire/nothing'
import TailChase from './components/games/tail_chase/nothing'

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

          <NavDropdown title="Hangman" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/hangman">Play</NavDropdown.Item>
            <NavDropdown.Item href="/hangman/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/hangman/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Millionaire" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/millionaire">Play</NavDropdown.Item>
            <NavDropdown.Item href="/millionaire/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/millionaire/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Tail Chase" className="mx-2" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/tail_chase">Play</NavDropdown.Item>
            <NavDropdown.Item href="/tail_chase/rules">Rules</NavDropdown.Item>
            <NavDropdown.Item href="/tail_chase/roadmap">Roadmap</NavDropdown.Item>
          </NavDropdown>

        </Nav>
      </Navbar>
      
      <Router>
        <Route path="/" exact component={Home} />

        <Route path="/scattergories" exact component={Scattergories} />
        <Route path="/scattergories/rules" exact component={ScattergoriesRules} />
        <Route path="/scattergories/roadmap" exact component={ScattergoriesRoadmap} />

        <Route path="/hangman" exact component={Hangman} />
        <Route path="/hangman/rules" exact component={HangmanRules} />
        <Route path="/hangman/roadmap" exact component={HangmanRoadmap} />

        <Route path="/millionaire" exact component={Millionaire} />
        <Route path="/millionaire/rules" exact component={Millionaire} />
        <Route path="/millionaire/roadmap" exact component={Millionaire} />

        <Route path="/tail_chase" exact component={TailChase} />
        <Route path="/tail_chase/rules" exact component={TailChase} />
        <Route path="/tail_chase/roadmap" exact component={TailChase} />
      </Router>
    </>
  )
}
