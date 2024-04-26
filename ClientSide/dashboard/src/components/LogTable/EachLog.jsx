import axios from "axios";
import { useNavigate } from "react-router-dom";
const localhost = 'http://localhost:7007';

const EachLog = ({ eachLog, parentFunction, item, project_id, task_id, flag,index }) => {
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  let name, role;

  if (auth != null) {
    name = auth.result.name
    role = auth.result.role
  }

  const navigate = useNavigate();

  const handleBtnClicked = async (log_id, logstatus) => {
    try {
      console.log(log_id, logstatus)
      let response = await axios.post(`${localhost}/update-log-status`, {
        log_id: log_id,
        logstatus: logstatus
      }, {
        headers: {
          Authorization: `Bearer ${auth.result.token}`
        }
      })

      let result = await response.data;
      if (result != null) {
        alert('status updated succesfully...')
        parentFunction()
      } else {
        alert('Some Error Occured')
        navigate('/');
      }

    } catch (error) {
      console.log(error);
      navigate('/');
    }
  }

  return (
    <tr >
      <>
        <td>{index}</td>
        <td>{item.task_name}</td>
        <td>{item.task_details}</td>
        <td>{eachLog.logdata}</td>
        <td>{eachLog.created_at.split('T')[0]}</td>
        <td>{eachLog.userinfo.name}</td>
        <td>{eachLog.logstatus}</td>

        {
          role == 3 ?
            <>
              {
                eachLog.logstatus == 'pending' ?
                  <td style={{ color: 'green' }}><b>Updation Pending</b></td>
                  : <td>{eachLog.updated_at.split('T')[0]}</td>
              }
            </>
            : <>
              {eachLog.logstatus == 'pending' ?
                <div style={{ display: "flex", flexDirection: 'column', gap: '15px' }}>
                  <button onClick={() => { handleBtnClicked(eachLog.log_id, "approved") }} className="btn btn-success">Approve</button>
                  <button onClick={() => { handleBtnClicked(eachLog.log_id, "rejected") }} className="btn btn-danger">Reject</button>

                </div>
                :
                <td>Checked</td>
              }
            </>
        }
      </>
    </tr>

  )
}
export default EachLog;