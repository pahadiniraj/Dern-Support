import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed and imported

const EditSpareparts = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const getApi = async () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    try {
      setIsLoading(true);
      const res = await axios.get("/spareparts", {
        // Adjust the endpoint as needed
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setSpareParts(res.data);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(spareParts[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    try {
      setIsLoading(true);
      const res = await axios.put(`/spareparts/${editData.id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      const updatedSpareParts = [...spareParts];
      updatedSpareParts[editIndex] = res.data;
      setSpareParts(updatedSpareParts);
      setEditIndex(null);
      setEditData({});
    } catch (error) {
      console.error("Error updating spare part:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <h1>Edit Spare Parts</h1>
      {spareParts.map((part, index) => (
        <div key={part.id}>
          {editIndex === index ? (
            <div>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
              />
              <button onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <div>
              <span>{part.name}</span>
              <span>{part.quantity}</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditSpareparts;
