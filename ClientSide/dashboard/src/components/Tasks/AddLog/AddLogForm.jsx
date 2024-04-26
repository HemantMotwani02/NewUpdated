import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const localhost = 'http://localhost:7007';

const AddLogForm = ({ project_id, task_id, item }) => {
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);

  let name, role;
  if (auth != null) {
    name = auth.result.name;
    role = auth.result.role;
  }

  const navigate = useNavigate();

  const [logdata, setLogData] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  function handleLogData(event) {
    switch (event.target.name) {
      case 'log_data': setLogData(event.target.value); break;
      case 'log_StartTime': setStartTime(event.target.value); break;
      case 'log_EndTime': setEndTime(event.target.value); break;
      default: break;
    }
  }


  const handleLogDataForm = async (e) => {
    e.preventDefault();

    try {
      // localStorage.removeItem('taskobj');

      if (logdata == null) {
        alert('Please Fill the Log Information correctly before submitting')
      } else {
        let resposne = await axios.post(`${localhost}/add-log/${project_id}/${task_id}`, {
          logdata: logdata,
          start_time: startTime,
          end_time: endTime

        }, {
          headers: {
            Authorization: `Bearer ${auth.result.token}`
          }
        })

        let result = await resposne.data;
        // console.log(result);

        if (result.status === 'success') {
          alert('Log Added Succesfully.');
          navigate(`/project/${project_id}/tasks`);
        } else {
          alert('Log Doesnot Added. Try again')
          navigate(`/project/${project_id}/tasks`)
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="addlog-form">
        <form onSubmit={handleLogDataForm} className="g-3" >
          <div className="col-md-10 mb-3">
            <label className="form-label"><b>Task Code </b></label>
            <div className="form-control" >{task_id}</div>
          </div>

          <div className="col-md-10 mb-3" >
            <label className="form-label"><b>Task Name </b></label>
            <div className="form-control" >{item.task_name}</div>
          </div>

          <div className="col-md-10 mb-3">
            <label className="form-label"><b>Task Desc </b> </label>
            <div className="form-control" >{item.task_details}</div>
          </div>

          <div className="col-md-10 mb-3">
            <label className="form-label"><b>Created By </b> </label>
            <div className="form-control" >{item.userinfo.name}</div>
          </div>

          <div class="col-md-10 mb-3">
            <label class="form-label"><b>Log Data</b></label>
            <input onChange={handleLogData} name="log_data" type="text" class="form-control" placeholder="Enter your log data" required />
          </div>

          <div class="col-md-10 mb-3">
            <label class="form-label"><b>Start Time</b></label>
            <input onChange={handleLogData} name="log_StartTime" type="time" class="form-control" required />
          </div>

          <div class="col-md-10 mb-3">
            <label class="form-label"><b>End Time</b></label>
            <input onChange={handleLogData} name="log_EndTime" type="time" class="form-control" required />
          </div>
          <div class="col-12 mt-3">
            <button type="submit" class="btn btn-primary">Add Log</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLogForm;