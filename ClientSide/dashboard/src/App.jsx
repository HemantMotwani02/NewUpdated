import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import EditDetails from "./components/EditDetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ViewSingleTaskLogs from "./components/LogTable/LogsByTaskID/ViewSingleTaskLogs.jsx";
import Login from "./components/Login/Login.jsx";
import Nav from "./components/Nav";
import NewProject from "./components/NewProject/NewProject.jsx";
import AssignProjectMember from "./components/Project-Members/AssignProjectMember.jsx";
import ProjectContainer from "./components/ProjectContainer/ProjectContainer.jsx";
import SignUp from "./components/SignUp/Signup.jsx";
import AddLog from "./components/Tasks/AddLog/AddLog.jsx";
import TaskForm from "./components/Tasks/TaskForm.jsx";
import ViewAllTask from "./components/Tasks/ViewAllTask.jsx";
import ProjectDisplay from "./components/projectDisplay.jsx";


function App() {
  return (<>
    <div>
      <BrowserRouter>

        <Nav />
        <div style={{ display: "flex", justifyContent: 'flex-start', gap: '30px' }}>

          <div className="main-right-container">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/Project" Component={ProjectContainer} />
              <Route path="/Task" element={<h1>Welcome to Task page</h1>} />
              <Route path="/Logs" element={<h1>Welcome to Log page</h1>} />
              <Route path="/profile" element={<h1>Welcome to profile page</h1>} />
              <Route path="/Logout" element={<h1>Logout</h1>} />
              <Route path="/SignUp" Component={SignUp} />
              <Route path="/Login" Component={Login} />

              <Route path="/project/:project_id" Component={ProjectDisplay} />
              <Route path="/project/:project_id/tasks" Component={ViewAllTask} />
              <Route path="/project/:project_id/tasks" Component={ViewAllTask} />
              <Route path="/project/:project_id/tasks/logs/:task_id" Component={ViewSingleTaskLogs} />
              <Route path="/create-task/:project_id" Component={TaskForm} />
              <Route path="/project/:project_id/assign-members" Component={AssignProjectMember} />
              <Route path="/project/:project_id/add-task/:task_id" Component={AddLog} />
              <Route path="/add-new-project" Component={NewProject} />
              {/* <Route path="/project/:pid/Logs" Component={ShowAllLogs}/> */}
              <Route path="/EditDetails" Component={EditDetails} />
            </Routes>
          </div>

        </div>
        <Footer />
      </BrowserRouter>
    </div>

  </>
  )
}

export default App;