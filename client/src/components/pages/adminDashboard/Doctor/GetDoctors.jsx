import React from "react";
import axios from "axios";

// Delete confirmation pop-up component
class DeleteConfirmation extends React.Component {
  render() {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-xl p-8">
          <p className="text-lg font-bold mb-4">Are you sure you want to delete this doctor?</p>
          <div className="flex justify-end">
            <button className="mr-4" onClick={this.props.onCancel}>Cancel</button>
            <button className="bg-custom-blue text-white px-4 py-2 rounded-md" onClick={this.props.onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default class doctorList extends React.Component {
  //creating an object of initial state
  state = {
    doctors: [],
    id: "",
    showDeleteConfirmation: false,
    deleteDoctor: null,
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/doctors/`).then((res) => {
      const doctors = res.data;
      this.setState({ doctors });
    });
  }

  // Set the id of the doctor to delete and show the delete confirmation pop-up
  showDeleteConfirmation = (id) => {
    this.setState({ deleteDoctor: id, showDeleteConfirmation: true });
  }

  // Hide the delete confirmation pop-up
  hideDeleteConfirmation = () => {
    this.setState({ showDeleteConfirmation: false });
  }

  // Delete the selected doctor
  deleteDoctor = () => {
    const id = this.state.deleteDoctor;
    axios.delete(`http://localhost:5000/api/doctors/deleteDoc/${id}`)
      .then(() => {
        // Remove the deleted doctor from the list
        const updateddoctors = this.state.doctors.filter((doctor) => doctor._id !== id);
        this.setState({ doctors: updateddoctors, showDeleteConfirmation: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.doctors.map((doctor) => (
            <div className="p-1 " key={doctor.id}>
              <li>
                <div className="bg-white rounded-xl h-10 p-2 flex flex-row">
                  <div className="w-2/4 ml-5 font-bold text-custom-blue text-md">
                    Dr. {doctor.firstname} {doctor.lastname}
                  </div>
                  <div className="w-1/4 font-bold text-gray-500 text-md text-end">
                    Edit
                  </div>
                  <div className="w-1/4 font-bold text-red-700 text-md text-end mr-5">
                    <button type="submit" onClick={() => this.showDeleteConfirmation(doctor._id)}>Delete</button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>

        {/* Render the delete confirmation pop-up if it is shown */}
        {this.state.showDeleteConfirmation && (
          <DeleteConfirmation
            onCancel={this.hideDeleteConfirmation}
            onConfirm={this.deleteDoctor}
          />
        )}
      </div>
    );
  }
}
