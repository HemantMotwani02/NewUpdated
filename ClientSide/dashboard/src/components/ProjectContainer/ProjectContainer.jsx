import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EachProjectCard from "./EachProjectCard";




const localhost = "http://localhost:7007";

const ProjectContainer = () => {
  //  let [pid,setPid] = useState(1)
  //  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  //  function parentFunction() {
  //   console.log('hey in parent')
  //   forceUpdate()
  // }

  const [selectedValue, setSelectedValue] = useState();
  const [selectedSortValue, setSelectedSortValue] = useState();
  const [projectName, setProjectName] = useState();
  const [projectData, setProjectData] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


  const parentFunction = () => {
    forceUpdate()
  }

  const navigate = useNavigate();

  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);

  let name, role;

  if (auth != null) {
    name = auth.result.name;
    role = auth.result.role;
  }

  // getProjectByMid
  useEffect(() => {
    const getProjectDataByMid = async () => {
      let response;

      try {
        if (selectedValue == 'Pending') {
          response = await axios.get('http://localhost:7007/project-sort?sortby=pending', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else if (selectedValue == 'Completed') {
          response = await axios.get('http://localhost:7007/project-sort?sortby=completed', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else if (selectedSortValue == 'casc' || selectedSortValue == 'cdesc' || selectedSortValue == 'uasc' || selectedSortValue == 'udesc') {
          response = await axios.get(`http://localhost:7007/project-order?orderby=${selectedSortValue}`, {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else {
          response = await axios.get('http://localhost:7007/project', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        }

        let result = await response.data
        console.log("Projects:: ",result);

        if (result.status == 'unsuccess') {
          navigate('/')
        } else {
          setProjectData(result.result);
        }

      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }
    getProjectDataByMid()
  }, [selectedValue, selectedSortValue, ignored])


  function handleChange(event) {
    switch (event.target.name) {
      case 'selectedValue': setSelectedValue(event.target.value); break;
      case 'selectedSortValue': setSelectedSortValue(event.target.value); break;
      case 'projectName': setProjectName(event.target.value); break;

      default: break;
    }
  }


  const handleSearchForm = async (e) => {
    e.preventDefault();

    try {
      if (projectName === null) {
        alert('Please Search Something.');
      } else {
        let response = await axios.get(`${localhost}/project/query?val=${projectName}`, {
          headers: {
            Authorization: `Bearer ${auth.result.token}`
          }
        })
        let result = await response.data;
        console.log(result);

        if (result.status == 'unsuccess') {
          localStorage.clear();
          navigate('/');
        } else {
          // everything is fine data to hai hi
          setProjectData(result.result);
        }
      }
    } catch (error) {
      navigate('/');
    }
  }


  return (
    <>
      <p className="link" onClick={() => navigate(-1)}>Back</p>
      <div style={{ width: '60%', margin: 'auto', marginTop: '20px' }} className="d-flex align-items-center justify-content-start gap-4">

        <div>
          <div className="d-flex  align-items-center justify-content-around" style={{ gap: '20px' }}>
            <h5 >Filter by status:</h5>
            <select style={{ padding: '1px', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }} name='selectedValue' value={selectedValue} onChange={handleChange}>
              <option value="">All Projects</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {/* {selectedValue && <p>Showing <b>{selectedValue}</b> Projects</p>} */}
        </div>


        <div className="d-flex  align-items-center justify-content-around" style={{ gap: '20px' }}>
          <h5 >Order by:</h5>
          <select style={{ padding: '1px', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px' }} name='selectedSortValue' value={selectedSortValue} onChange={handleChange}>
            <option value="">Select</option>
            <option value="casc">start date- asc</option>
            <option value="cdesc">start date- desc</option>
            <option value="uasc">updated date- asc</option>
            <option value="udesc">updated date- desc</option>
          </select>
        </div>
      </div>


      <div style={{ margin: 'auto', width: '60%', height: 'auto', marginBottom: '20px' }}>
        <form onSubmit={handleSearchForm} class="d-flex" style={{ height: '40px', marginTop: '9px' }}>
          <input onChange={handleChange} name="projectName" class="form-control me-2" type="text" placeholder="Search project by name" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>

      <div className="each-project-card-container">
        {projectData ? projectData.length ? projectData.map((eachProject => (

          <EachProjectCard parentFunction={parentFunction} eachPro={eachProject} />

        ))) : <h1 style={{ textAlign: 'center' }}> 0 results Found</h1>

          : <h1>Loading....</h1>}
      </div>
    </>
  )
}
export default ProjectContainer;