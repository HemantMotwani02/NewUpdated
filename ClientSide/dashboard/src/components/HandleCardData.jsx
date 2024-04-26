import { useNavigate } from 'react-router-dom';
function HandleCardData(props) {
    const navigate = useNavigate();
    const data = props.item;
    console.log(data);

    const HandleCardWithID = (project_id) => {
        console.log(project_id)

        navigate(`/project/${project_id}`);
    }


    // DATA.projectdata[1].allusers.forEach(element => {
    //     console.log(element.uname)
    // });

    return (
        <div>
            {Object.keys(data.projectdata).map(projectId => {
                const project = data.projectdata[projectId];
                const project_id = project.project.project_id
                return (
                    <div className="bgcolor" onClick={() => { HandleCardWithID(project_id) }}>
                        <span className="spanheading">Project Name:</span> <span className="spanvalue"> {project.project.project_name}</span>
                        <span style={{ float: 'right' }}>
                            <div className="btn-group dropup">
                                <button type="button" className="btn  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: 'rgb(170, 143, 94)' }}>

                                </button>
                                <ul className="dropdown-menu">
                                    <li className="btn">Assign Members</li>
                                    <li className="btn">View Logs</li>
                                    <li className="btn">Create a Task</li>
                                </ul>
                            </div>
                        </span>
                        <div className=" singlecardContainer" >

                            <div class="card mb-3 cardclass" >
                                <div class="row g-0 eachCard projectDetails">
                                    <div class=" leftside"  >
                                        <h3 className="spanvalueCARD" >PROJECT DETAILS</h3>
                                        <div className="leftSideAssign">

                                            <div> <span className="leftSideAssignKEY"> Name: </span> <span className="leftSideAssignVALUE">{project.project.project_name}</span></div>

                                            <div><span className="leftSideAssignKEY"> Description: </span> <span className="leftSideAssignVALUE">dfdjh asdfh  asdfhje  adf fdfae ajkdnfke fajhe fakje cajdf</span></div>
                                            <div><span className="leftSideAssignKEY"> Assigned By: </span> <span className="leftSideAssignVALUE">Admin</span></div>
                                            <div><span className="leftSideAssignKEY"> Assigned To: </span> <span className="leftSideAssignVALUE">You</span></div>
                                            <div><span className="leftSideAssignKEY"> Started Date: </span> <span className="leftSideAssignVALUE">{project.project.created_at.split('T')[0]}</span></div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="card mb-3 cardclass" >
                                <div class="row g-0 eachCard" >
                                    <div class=" leftside"  >
                                        <h3 className="spanvalueCARD">ASSIGNED TO ({project.names.length})</h3>
                                        <div className="leftSideAssign">
                                            {project.names.map((item => (<>
                                                <div className="NameConatiner"><div> <div><span className="leftSideAssignKEY">Name: </span> <span className="leftSideAssignVALUE">{item.name}</span></div><div><span className="leftSideAssignKEY"> EmpID:</span> <span className="leftSideAssignVALUE">{item.user_id}</span></div></div></div>
                                                <div className="LINE"></div>
                                            </>
                                            )))}



                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card mb-3 cardclass" >
                                <div class="row g-0 eachCard">
                                    <div class="leftside"  >
                                        <h3 className="spanvalueCARD">TASKS ({project.tasks.length})</h3>
                                        <div className="leftSideAssign">
                                            {project.tasks.map((item => (<>
                                                <div className="NameConatiner">
                                                    <div>
                                                        <div><span className="leftSideAssignKEY">Name: </span> <span className="leftSideAssignVALUE">{item.task_name}</span></div>
                                                        <div><span className="leftSideAssignKEY">Created By:</span> <span className="leftSideAssignVALUE">{item.name}</span></div>
                                                        <div><span className="leftSideAssignKEY">Created Date:</span> <span className="leftSideAssignVALUE">{item.created_at.split('T')[0]}</span></div>

                                                    </div>
                                                </div>
                                                <div className="LINE"></div>
                                            </>
                                            )))}



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div >
    );

}
export default HandleCardData