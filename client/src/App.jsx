

  import { useState, useEffect } from 'react';

  import { getAllUsers, createUser, updateUser, deleteUser } from './modules/Users';

  import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ id: '', name: '', email: '', phoneNumber: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  

  function App() {

    const [users, setUsers] = useState([]);

    const [userForm, setUserForm] = useState({ id: '', name: '', email: '', phoneNumber: '' });

    const [isEditing, setIsEditing] = useState(false);

  

    useEffect(() => {

      fetchUsers();

    }, []);

  

    const fetchUsers = async () => {

      try {

        const data = await getAllUsers();

        setUsers(data);

      } catch (error) {

        console.error("Could not fetch users:", error);

      }

    };

  

    const handleInputChange = (e) => {

      const { name, value } = e.target;

      setUserForm({ ...userForm, [name]: value });

    };

  

    const handleSubmit = async (e) => {

      e.preventDefault();

      if (isEditing) {

        await handleUpdateUser();

      } else {

        await handleCreateUser();

      }

      resetForm();

    };

  

    const handleCreateUser = async () => {

      try {

        await createUser(userForm);

        fetchUsers();

      } catch (error) {

        console.error("Could not create user:", error);

      }

    };

  

    const handleUpdateUser = async () => {

      try {

        await updateUser(userForm);

        fetchUsers();

      } catch (error) {

        console.error("Could not update user:", error);

      }

    };

  

    const handleDeleteUser = async (id) => {

      try {

        await deleteUser(id);

        fetchUsers();

      } catch (error) {

        console.error("Could not delete user:", error);

      }

    };

  

    const editUser = (user) => {

      setIsEditing(true);

      setUserForm(user);

    };

  

    const resetForm = () => {

      setIsEditing(false);

      setUserForm({ id: '', name: '', email: '', phoneNumber: '' });

    };

  

    return (

      <div className="App">

        <h1>User Management</h1>

        <form onSubmit={handleSubmit} className="user-form">

          <input

            type="text"

            name="name"

            placeholder="Name"

            value={userForm.name}

            onChange={handleInputChange}

            required

          />

          <input

            type="email"

            name="email"

            placeholder="Email"

            value={userForm.email}

            onChange={handleInputChange}

            required

          />

          <input

            type="text"

            name="phoneNumber"

            placeholder="Phone Number"

            value={userForm.phoneNumber}

            onChange={handleInputChange}

            required

          />

          <button type="submit">{isEditing ? 'Update' : 'Create'}</button>

          {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}

        </form>

  

        <table className="users-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone Number</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.phoneNumber}</td>

                <td>

                  <button onClick={() => editUser(user)}>Edit</button>

                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    );

  }
}
  

  export default App;
