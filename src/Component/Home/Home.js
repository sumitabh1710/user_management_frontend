import React, { useEffect, useState } from "react";
import "./Home.css";
import Popup from "../Common/Popup/Popup";
import api from "../../api";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [patientId, setPatientId] = useState();

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    age: "",
    medicalHistory: "",
  });

  async function fetchData() {
    try {
      const data = await api.getPatients("/patient");
      setPatients(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (patients.length == 0) {
      fetchData();
    }
  }, [patients]);

  const handleAddPatient = async () => {
    try {
      await api.addPatient("/patient/add", newPatient);
      setNewPatient({
        name: "",
        age: "",
        medicalHistory: "",
      });
      setShowAddPopup(false);
      setPatients([]);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleEditPatient = async () => {
    try {
      await api.editPatient(`/patient/edit`, newPatient);
      setNewPatient({
        name: "",
        age: "",
        medicalHistory: "",
      });
      setShowEditPopup(false);
      setPatients([]);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await api.deletePatient(`/patient/delete/${id}`);
      setPatients([]);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    setShowEditPopup(true);
    setPatientId(id);
    setNewPatient(patients.filter((each) => each.id === id)[0]);
  };

  const handleAdd = () => {
    setShowAddPopup(true);
  };

  const handleDelete = (id) => {
    handleDeletePatient(id);
  };

  return (
    <>
      <Navbar />
      <div className="home_main_container">
        <div className="home_container">
          <div className="table_button_container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h2>Patients Information</h2>
              <button
                style={{ marginTop: "0", width: "120px" }}
                onClick={() => handleAdd()}
              >
                Add
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Medical History</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.medicalHistory}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(patient.id)}
                          style={{ width: "60px", height: "30px", margin: "0" }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          style={{ width: "60px", height: "30px", margin: "0" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showAddPopup && (
          <Popup setShow={setShowAddPopup}>
            <div className="main_form_container">
              <h3 className="title">Add Patient!</h3>
              <p className="field_name">Name</p>
              <input
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
              ></input>
              <p className="field_name">Age</p>
              <input
                name="age"
                value={newPatient.age}
                onChange={handleInputChange}
              ></input>
              <p className="field_name">Medical History</p>
              <input
                name="medicalHistory"
                value={newPatient.medicalHistory}
                onChange={handleInputChange}
              ></input>
              <button onClick={handleAddPatient}>Add</button>
            </div>
          </Popup>
        )}
        {showEditPopup && (
          <Popup setShow={setShowEditPopup}>
            <div className="main_form_container">
              <h3 className="title">Edit Patient!</h3>
              <p className="field_name">Name</p>
              <input
                onChange={(e) =>
                  setNewPatient((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                value={newPatient.name}
              ></input>
              <p className="field_name">Age</p>
              <input
                onChange={(e) =>
                  setNewPatient((prevState) => ({
                    ...prevState,
                    age: e.target.value,
                  }))
                }
                value={newPatient.age}
              ></input>
              <p className="field_name">Medical History</p>
              <input
                onChange={(e) =>
                  setNewPatient((prevState) => ({
                    ...prevState,
                    medicalHistory: e.target.value,
                  }))
                }
                value={newPatient.medicalHistory}
              ></input>
              <button onClick={() => handleEditPatient()}>Save</button>{" "}
            </div>
          </Popup>
        )}
      </div>
    </>
  );
};

export default Home;
