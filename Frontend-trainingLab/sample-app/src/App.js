import React from 'react'
import './App.css'
import { Switch, Route } from "react-router-dom";
import FrontPage from './components/front page/frontPage'
import EventPage from './components/event page/eventPage'
import TestPage from './components/test page/testPage'
import CoursePage from './components/courses page/coursesPage'
import SignIn from './components/forms/signIn'
import SignUp from './components/forms/signUp'
import SelectionPage from './components/Selection Page/SelectionPage'
import CourseMainPage from './components/courses page/CourseMainPage';
import TestSelectionPage from './components/test page/testSelectionPage'
import TestSummary from './components/test page/summaryPage'

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
        <Route exact path='/courses/1' component={CourseMainPage} />
        <Route exact path='/selection' component={SelectionPage} />
        <Route exact path='/testselection' component={TestSelectionPage} />
        <Route exact path='/test/summary' component={TestSummary} />
      </Switch>
    </>
  )
}

export default App


