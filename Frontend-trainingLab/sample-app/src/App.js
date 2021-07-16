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

function App() {
  return (
    <>


      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/courses" component={CoursePage} />
        <Route exact path='/events' component={EventPage} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path='/courses/courseMainPage' component={CourseMainPage} />
        <Route exact path='/selection' component={SelectionPage} />
        <Route exact path='/testselection' component={TestSelectionPage} />
        <Route exact path='/test/summary' component={TestSummary} />
      </Switch>
    </>
  )
}

export default App


