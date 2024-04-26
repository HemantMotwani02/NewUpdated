import { useReducer, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ShowLogsByPidTid from "./ShowLogsByPidTid";


const ViewSingleTaskLogs = () => {

  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  let name, role;

  if (auth != null) {
    name = auth.result.name;
    role = auth.result.role;
  }

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  let [flag, setFlag] = useState(0);

  const parentFunction = () => {
    if (flag == 0) { setFlag(1) }
    else { setFlag(0) }
    console.log(flag);
    forceUpdate();
  }

  const navigate = useNavigate();
  const { project_id, task_id } = useParams();
  const [selectedValue, setSelectedValue] = useState('pending');

  const handleChange = (e) => {
    setSelectedValue(e.target.value)
  }

  return (
    <>
      <div className="MainDiv-for-single-functionality p-3">
        {
          (project_id) ? <>
            <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', width: "100%" }}>
              <h1 className="">Logs</h1>
              <p className="link" onClick={() => navigate(-1)}>Back</p>
              <div className="d-flex  align-items-center justify-content-around" style={{ gap: '20px' }}>
                <h2 style={{}}>Filter Ta</h2>
                <select className="dropdown dropdown-menu dropdown-menu-dark " style={{ zIndex: 'auto', padding: '10px', width: '100px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={selectedValue} onChange={handleChange}>
                  <option className="dropdown-item " value="">All logs</option>
                  <option className="dropdown-item " value="pending">Pending</option>
                  <option className="dropdown-item " value="approved">Approved</option>
                  <option className="dropdown-item " value="rejected">Rejected</option>
                  {role == 3 ? <option className="dropdown-item " value="your">Your Logs</option> : <></>}
                </select>
              </div>

              {selectedValue && <p>Showing <b>{selectedValue}</b> logs</p>}
            </div>

            <ShowLogsByPidTid flag={flag} parentFunction={parentFunction} selectedValue={selectedValue} project_id={project_id} task_id={task_id} />
          </> : <div>loading...</div>
        }

      </div>
    </>
  )
}


export default ViewSingleTaskLogs;