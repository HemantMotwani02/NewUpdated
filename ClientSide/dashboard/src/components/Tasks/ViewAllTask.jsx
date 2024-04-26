import { useNavigate, useParams } from "react-router-dom";
import Projecttasks_rhs from "./ProjectTasks_rhs";

const ViewAllTask = () => {
  const navigate = useNavigate();
  const { project_id } = useParams();

  return (
    <>
      <p className="link" onClick={() => navigate(-1)}>Back</p>
      <div className="MainDiv p-3">
        {
          project_id ? <>

            <Projecttasks_rhs project_id={project_id} />
            {/* <RightProjectDetails pid={pid} /> */}
          </> : <div>loading...</div>
        }
      </div>
    </>
  )
}


export default ViewAllTask;