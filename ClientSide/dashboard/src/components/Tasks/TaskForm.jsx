import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  //user-data
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);

  const navigate = useNavigate();

  //ProjectId from parameters
  const { project_id } = useParams();

  //task details
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDesc] = useState('');
  const [estimateTime, setEstimateTime] = useState('');

  function handleTaskDetails(event) {
    switch (event.target.name) {
      case 'task_name': setTaskName(event.target.value);
      case 'task_description': setTaskDesc(event.target.value);
      case 'estimate_time': setEstimateTime(event.target.value);
      default: break;
    }
  }

  const handleTaskForm = async (e) => {
    e.preventDefault()
    // if (taskname === '') { alert("Enter Task Name"); return; }
    try {
      let response = await axios.post('http://localhost:7007/task', {
        project_id: project_id,
        task_name: taskName,
        task_details: taskDetails,
        estimate_time: estimateTime
      }, {
        headers: {
          Authorization: `Bearer ${auth.result.token}`
        }
      })
      
      let result = await response.data;
      console.log(result);
      navigate(`/project/${project_id}/tasks`);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <p className="link" onClick={() => navigate(-1)}>Back</p>
      <div className="MainDiv-for-single-functionality p-3">
        {
          project_id ? <>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}><h1 className="">Create a Task</h1></div>
            <div id="taskbox" class="login-box bg-dark text-light">

              <form onSubmit={handleTaskForm}>
                <div class="user-box">
                  <label>Task Name</label>
                  <input onChange={handleTaskDetails} type="text" name="task_name" required />
                </div>

                <div class="user-box">
                  <label>Task Description</label>
                  <input onChange={handleTaskDetails} type="text" name="task_description" required/>
                </div>

                <div class="user-box">
                  <label>Estimate Time (in hrs)</label>
                  <input onChange={handleTaskDetails} type="time" name="estimate_time" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </> : <div>loading...</div>
        }

      </div>
    </>
  )
}

export default TaskForm;