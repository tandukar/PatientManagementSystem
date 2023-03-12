import React from "react";
import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    persons: [],
    id: "",
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/doctors/`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    const deleteDoctor = (id) => {
      console.log('Delete doctor id:', id); // Check id value
      axios.delete(`http://localhost:5000/api/doctors/deleteDoc/${id}`)
        .then(res => {
          console.log('Doctor deleted:', res.data);
          // Update state or do other actions
        })
        .catch(err => console.log('Error deleting doctor:', err));
    };
    
    return (
      <ul>
        {this.state.persons.map((person) => (
          <div className="p-1 ">
            <li key={person.id}>
              <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                  Dr. {person.firstname} {person.lastname}
                </div>
                <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                  Edit
                </div>
                <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                  <button type="submit" onClick={() => deleteDoctor(person._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    );
  }
}
