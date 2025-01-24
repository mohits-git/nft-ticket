import {Route,Routes} from "react-router-dom"
import LandingPage from './pages/LandingPage'
import MyTickets from './pages/MyTickets'
import EventListing from './pages/EventListing'
import CreateEvent from './pages/CreateEvent'
import EventDetails from "./pages/EventDetails"
function App() {
  return (
    <div>
      <div className = "w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Routes >
        <Route path = '/' element={<LandingPage/>} />
        <Route path="/EventListing" element={<EventListing/>}/>
        <Route path="/CreateEvent" element={<CreateEvent/>}/>
        <Route path="/MyTickets" element={<MyTickets/>}/>
        <Route path="/EventDetails" element={<EventDetails/>}/>
      </Routes>
    </div>
    </div>
  )
}
//  EventListing.js   // List of events
// │   ├── EventDetails.js   // Specific event details + purchase section
// │   ├── CreateEvent.js    // Event creation page for organizers
// │   ├── MyTickets.js   
export default App
