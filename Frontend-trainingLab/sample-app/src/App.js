import React from 'react'
import './App.css'
import { Switch, Route } from "react-router-dom";
import FrontPage from './components/frontPage/frontPage'
import EventPage from './components/eventPage/eventPage'
import TestPage from './components/testPage/testPage'
import CoursePage from './components/coursesPage/coursesPage'
import SignIn from './components/Forms/signIn'
import SignUp from './components/Forms/signUp'
import SelectionPage from './components/selectionPage/selectionPage'
import CourseMainPage from './components/coursesPage/CourseMainPage';
import TestSelectionPage from './components/testPage/testSelectionPage'
import TestSummary from './components/testPage/summaryPage'
import Protection from './protection';

function App() {
  return (
    <React.Fragment>


      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/courses">
          <Protection comp={CoursePage} />
        </Route>
        <Route exact path="/events">
          <Protection comp={EventPage} />
        </Route>
        <Route exact path="/test"  >
          <Protection comp={TestPage} />
        </Route>
        <Route exact path="/courses/courseMainPage" >
          <Protection comp={CourseMainPage} />
        </Route>
        <Route exact path="/selection"  >
          <Protection comp={SelectionPage} />
        </Route>
        <Route exact path="/testselection"  >
          <Protection comp={TestSelectionPage} />
        </Route>
        <Route exact path="/test/summary"  >
          <Protection comp={TestSummary} />
        </Route>

      </Switch>
    </React.Fragment>
  )
}

export default App


