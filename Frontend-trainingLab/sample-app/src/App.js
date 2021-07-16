import React from 'react'
import './App.css'
import { Switch, Route } from "react-router-dom";
import FrontPage from './components/frontPage/frontPage'
import EventPage from './components/eventPage/eventPage'
import TestPage from './components/testPage/testPage'
import CoursePage from './components/coursesPage/coursesPage'
import SignIn from './components/forms/signIn'
import SignUp from './components/forms/signUp'
import SelectionPage from './components/selectionPage/selectionPage'
import CourseMainPage from './components/coursesPage/courseMainPage';
import TestSelectionPage from './components/testPage/testSelectionPage'
import TestSummary from './components/testPage/summaryPage'
import PrivateRoute from './privateRoute';

function App() {
  return (
    <React.Fragment>


      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/courses">
          <PrivateRoute comp={CoursePage} />
        </Route>
        <Route exact path="/events">
          <PrivateRoute comp={EventPage} />
        </Route>
        <Route exact path="/test"  >
          <PrivateRoute comp={TestPage} />
        </Route>
        <Route exact path="/courses/courseMainPage" >
          <PrivateRoute comp={CourseMainPage} />
        </Route>
        <Route exact path="/selection"  >
          <PrivateRoute comp={SelectionPage} />
        </Route>
        <Route exact path="/testselection"  >
          <PrivateRoute comp={TestSelectionPage} />
        </Route>
        <Route exact path="/test/summary"  >
          <PrivateRoute comp={TestSummary} />
        </Route>

      </Switch>
    </React.Fragment>
  )
}

export default App


