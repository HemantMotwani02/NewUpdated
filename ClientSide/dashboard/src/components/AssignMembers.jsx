import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function AssignMembers({ project_id }) {
  let auth = JSON.parse(localStorage.getItem('user')); // Parse directly when retrieving from localStorage

  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]); // Use an array to store selected users
  const [remainingMemberData, setRemMemberData] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId); // Uncheck the checkbox
      } else {
        return [...prevSelected, userId]; // Check the checkbox
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedUsers.length === 0) {
      alert('Please Select the members');
      return;
    }

    try {
      for (const user_id of selectedUsers) {
        const response = await axios.post('http://localhost:7007/assignment', {
          project_id: project_id,
          user_id: user_id
        }, {
          headers: {
            Authorization: `Bearer ${auth.result.token}`
          }
        });

        const result = response.data;

        if (result === null) {
          throw new Error('Some Error Occurred, Please try again later. Thank You');
        }
      }

      alert(`Members Added Successfully.`);
      navigate(`/project/${project_id}`);
    } catch (error) {
      alert(error.message);
      navigate(`/project/${project_id}`);
    }
  };

  useEffect(() => {
    const getMembersByproject_idNotInvolved = async () => {
      try {
        const response = await axios.get(`http://localhost:7007/project/members/not-invlolved/${project_id}`);
        setRemMemberData(response.data.result);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    getMembersByproject_idNotInvolved();
  }, [project_id]);

  return (
    <div>
      {
        remainingMemberData.length ? (
          <form style={{}} onSubmit={handleSubmit}>
            <div className="">
              <table className="table table-secondary table-hover" style={{ width: '50rem' }}>
                <thead>
                  <tr>
                    <th className="assign-member-table-head">EmpID</th>
                    <th className="assign-member-table-head">Employee Name</th>
                    <th className="assign-member-table-head">Projects on work</th>
                    <th className="assign-member-table-head">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {remainingMemberData.map(user => (
                    <tr key={user.user_id}>
                      <td className="assign-member-table-head">{user.user_id}</td>
                      <td className="assign-member-table-head">{user.name}</td>
                      <td className="assign-member-table-head">{user.ct}</td>
                      <td className="assign-member-table-head">
                        <input
                          style={{ marginLeft: '20px', width: '20px', height: '20px' }}
                          type="checkbox"
                          value={user.user_id}
                          checked={selectedUsers.includes(user.user_id)} // Check if the user is selected
                          onChange={() => handleCheckboxChange(user.user_id)} // Pass userId to handleCheckboxChange
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <button style={{}} className='button' type="submit">Assign</button>
          </form>
        ) : (
          <p>No data available or access denied</p>
        )
      }
    </div>
  );
}

export default AssignMembers;
