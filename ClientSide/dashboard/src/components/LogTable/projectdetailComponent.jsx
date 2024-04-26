import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogTableComponent from "./logTableComponent";


const ProjectDetailComponent = ({ project_id }) => {
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  let name, role;

  if (auth != null) {
    name = auth.result.name;
    role = auth.result.role;
  }

  const navigate = useNavigate();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function parentFunction() {
    console.log('hey in parent');
    forceUpdate();
  }

  const [logdata, setlogData] = useState();

  useEffect(() => {
    const fetchLogdata = async () => {
      try {
        const logResponse = await axios.get(`http://localhost:7007/project-details-log/${project_id}`)
        setlogData(await logResponse.data.result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogdata();
  }, []);


  // function TaskCount()
  // {
  //   return 'Logdata',logdata.tasks.length;
  // }

  const HandleLogStatus = async (log_id, project_id, str) => {
    parentFunction()
    try {
      let response = await axios.get(`http://localhost:8000/update/log/${log_id}?wtd=${str}`);
      console.log(response.data);
      navigate(`/project/${project_id}`);
    } catch (error) {
      console.error('Error updating log status:', error);
      // Handle error gracefully, if needed
    }
  };

  const handleViewLogDetails = (e) => {
    navigate(`/project/${project_id}/tasks/logs/0`)
  }

  return (
    <>
      <div className="project_h"><h2 style={{ textAlign: 'center' }}> Recent Logs</h2><h5 onClick={handleViewLogDetails} style={{ textDecoration: 'underline' }}>view logs in detail</h5></div>
      {
        logdata ? <>   <div class="adjust-table" >
          <table class="table table-dark table-hover" style={{ height: '55vh', minHeight: '55vh', minWidth: '40vw', backgroundColor: '#212529', overflowY: 'visible' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Task Desc</th>
                <th>Log Data</th>
                <th>Log Date</th>
                <th>Log By</th>
                <th>Log Status</th>
                {role == 3 ? <th>Log Updated on</th> : <th>Options</th>}
              </tr>
            </thead>
            <tbody  >
              {logdata.tasks.map((task) => (
                <LogTableComponent item={task} parentFunction={parentFunction} />
              ))}

            </tbody>

          </table>

        </div> </> : <>no data</>

      }
    </>
  )
}

export default ProjectDetailComponent;