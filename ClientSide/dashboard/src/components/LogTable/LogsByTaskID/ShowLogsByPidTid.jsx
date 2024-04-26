import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LogTableComponent from "../logTableComponent";
// if tid - zero, then normal retrieval else retrieval by tid



const ShowLogsByPidTid = ({ project_id, task_id, selectedValue, parentFunction, flag }) => {

  const navigate = useNavigate();
  const [logsByTask, setlogsByTaskData] = useState();
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);


  useEffect(() => {
    const getLogByPidTid = async () => {
      let response = await axios.get(`http://localhost:7007/project-details-logByTask/${project_id}/${task_id}?selectedVal=${selectedValue}`, {
        headers: {
          Authorization: `Bearer ${auth.result.token}`
        }
      })

      let result = await response.data.result[0]
      setlogsByTaskData(result);
      console.log(result);
    }

    getLogByPidTid();
  }, [selectedValue, flag]);

  return (
    <>
      {
        logsByTask ? <>   <div class="adjust-table-secondary" >

          <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Task Desc</th>
                <th>Log Data</th>
                <th>Log Date</th>
                <th>Log By</th>
                <th>Log Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {/* parentFunction={parentFunction} */}
              {logsByTask.tasks.map((task) => (

                <LogTableComponent flag={flag} parentFunction={parentFunction} project_id={project_id} task_id={task_id} item={task} />
              ))}

            </tbody>
          </table>
        </div> </> : <>Sorry no data available</>
      }
    </>
  )
}

export default ShowLogsByPidTid;