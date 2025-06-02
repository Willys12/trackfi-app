import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashboard'
//import { Auth } from './pages/auth'
import { FinancialRecordProvider } from './contexts/financialRecordContext'
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, /*UserButton*/ } from '@clerk/clerk-react'
import MyHeader from './components/MyHeader'

function App() {
  

  return (
    <>
      <Router>
        <div className='app-container'>
          <div className='navbar-up'>
            <Link to="/">Track-Fi</Link>
            <SignedIn>
                {/* <UserButton showName /> */}
                <MyHeader />
            </SignedIn>
          </div>
          <Routes>
            <Route path="/" element={
              <>
                <SignedIn>
                  <FinancialRecordProvider>
                    <Dashboard />
                  </FinancialRecordProvider>
                </SignedIn>

                {/* Redirect you to signing out */}
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
              }
            />

            {/* Embedded sign in page */}
            <Route 
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in"/>}
            />

            {/* Embedded sign up page */}
            <Route 
              path="/sign-up/*"
              element={<SignIn routing="path" path="/sign-up"/>}
            />
            
            
          </Routes>
        </div>
      </Router>
      
    </>
  )
}

export default App;
