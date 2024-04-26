import { useParams } from "react-router-dom";

import AddLogForm from "./AddLogForm";
const AddLog = () => {
  const { project_id, task_id } = useParams();
  let taskobj = localStorage.getItem('taskobj')
  taskobj = JSON.parse(taskobj);

  return (
    <>
      <div className="MainDiv p-3">
        <AddLogForm project_id={project_id} task_id={task_id} item={taskobj} />
      </div>
    </>
  )
}
export default AddLog;