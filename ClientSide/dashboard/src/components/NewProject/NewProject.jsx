import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProject() {
  // user-date
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);

  const navigate = useNavigate()

  // states
  const [selectedValue, setSelectedValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [managerData, setManagerData] = useState([]);

  // fetch available managers
  useEffect(() => {
    const getProjectManagers = async () => {
      try {
        let response = await axios.get(`http://localhost:7007/manager`);
        let result = await response.data;

        if (result.status === 'unsuccess') {
          alert('Manager Data unavailable');
          navigate('/Project');
        } else {
          setManagerData(result.result);
        }

      } catch (error) {
        console.log(error);
      }
    }
    getProjectManagers();
  }, []);


  function handleProjectDetails(event) {
    switch (event.target.name) {
      case 'projectname': setProjectName(event.target.value); break;
      case 'projectdesc': setProjectDetails(event.target.value); break;
      case 'manager': setSelectedValue(event.target.value); break;
      default: break;
    }
  }

  const handleForm = async (e) => {
    e.preventDefault();

    try {

      if (projectName === '' || projectDetails === '') { alert("Fill all the fields"); return; }

      if (selectedValue === '') {
        alert('Please Select Manager');
      } else {
        let response = await axios.post(`http://localhost:7007/add-new-project`, {
          project_name: projectName,
          project_details: projectDetails,
          manager_id: selectedValue
        }, {
          headers: { Authorization: `Bearer ${auth.result.token}` }
        });

        let result = await response.data;
        if (result.status === 'unsuccess') {
          alert('Failed to add project, try again!');
          navigate('/Project');
        } else {
          alert('Project Added Successfully');
          navigate('/Project');
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="new-project-form">
        <h1 style={{ color: 'black' }}>Add New Project</h1>
        <form onSubmit={handleForm} className="row g-3 myform bg-dark text-light">
          <div className="col-10">
            <label className="form-label">Project Name</label>
            <input name='projectname' onChange={handleProjectDetails} className="form-control" value={projectName} />
          </div>
          <div className="col-10 mt-3">
            <label className="form-label">Description</label>
            <textarea style={{ resize: "none" }} rows="3" name='projectdesc' onChange={handleProjectDetails} className="form-control" value={projectDetails} />
          </div>
          <div className="col-10 mt-3">
            <label className="form-label">Select Manager</label>
            <select name="manager" value={selectedValue} onChange={handleProjectDetails} className="form-control">
              <option value=''>Pick Manager</option>
              {managerData ? managerData.map((item, index) => (
                <option key={index} value={item.user_id}>{item.name}</option>
              )) : <option value="">No Managers</option>}
            </select>
          </div>
          <div className="col-6">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewProject;
