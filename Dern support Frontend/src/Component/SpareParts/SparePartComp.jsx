import React, { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import { ClipLoader } from "react-spinners";
import http from "../../Utils/Instance";
import Create from "../Create/Create";
import LogOutNotification from "../LogOut/LogOutNotification";

const SparePartComp = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [create, setCreate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleString(undefined, options);
  };

  const getApi = async () => {
    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);
      const res = await http.get("/spareparts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpareParts(res.data);
      console.log(res.data[0].updatedAt);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handlePop = () => {
    setCreate(!create);
  };

  const handleDeletePop = (index) => {
    setDeleteIndex(index);
    setDeletePop(!deletePop);
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
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await http.put(`/spareparts/${editData?.id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const index = deleteIndex;
    const id = spareParts[index].id;
    try {
      setIsLoading(true);
      setDeletePop(false);
      await http.delete(`/spareparts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedSpareParts = [...spareParts];
      updatedSpareParts.splice(index, 1);
      setSpareParts(updatedSpareParts);
    } catch (error) {
      console.error("Error deleting spare part:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSparePart = (newSparePart) => {
    setSpareParts([...spareParts, newSparePart]);
    console.log(newSparePart);
    setCreate(false);
  };

  return (
    <div className="p-4 bg-white h-screen">
      <div className="flex justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold">Spare-Parts</h2>
        </div>
        <div>
          <Button
            text="Create"
            className="bg-green-500 text-white"
            onClick={handlePop}
          />
          {create && (
            <Create onClick={handlePop} onAddSparePart={handleAddSparePart} />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center mt-32">
          <ClipLoader
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="flex justify-center items-center"
          />
        </div>
      ) : (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="border px-4 py-2 text-center">Name</th>
                <th className="border px-4 py-2 text-center">Created At</th>
                <th className="border px-4 py-2 text-center">Updated At</th>
                <th className="border px-4 py-2 text-center">Price</th>
                <th className="border px-4 py-2 text-center">Quantity</th>
                <th className="border px-4 py-2 text-center">Weight</th>
                <th className="border px-4 py-2 text-center">Stock</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {spareParts.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    editIndex === index ? "bg-blue-400 text-center  " : ""
                  } `}
                >
                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full outline-none"
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="createdAt"
                        value={editData.createdAt}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full outline-none"
                      />
                    ) : (
                      formatDate(item.createdAt)
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="updatedAt"
                        value={editData.updatedAt}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full outline-none"
                      />
                    ) : (
                      formatDate(item.updatedAt)
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full outline-none"
                      />
                    ) : (
                      `$${item.price} per unit`
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full outline-none"
                      />
                    ) : (
                      `${item.quantity} units`
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="weight"
                        value={editData.weight}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full"
                      />
                    ) : (
                      `${item.weight} gm p.u`
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center ">
                    {editIndex === index ? (
                      <select
                        name="inStock"
                        value={editData.inStock}
                        onChange={handleInputChange}
                        className="text-white text-center bg-blue-400 w-full"
                      >
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                      </select>
                    ) : item.inStock ? (
                      <p className="text-green-600 font-medium text-sm  ">
                        In stock
                      </p>
                    ) : (
                      <p className="text-red-600 text-sm font-medium w-full">
                        Out Of Stock
                      </p>
                    )}
                  </td>
                  <td className="border  py-2 flex justify-center items-center gap-2 p-2 ">
                    {editIndex === index ? (
                      <Button
                        text="Save"
                        className="bg-green-500 text-white"
                        onClick={handleUpdate}
                      />
                    ) : (
                      <Button
                        text="Edit"
                        className="bg-blue-500 text-white"
                        onClick={() => handleEdit(index)}
                      />
                    )}
                    <Button
                      text="Delete"
                      className="bg-red-500 text-white"
                      onClick={() => handleDeletePop(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {deletePop && (
        <LogOutNotification
          handlePop={() => setDeletePop(false)}
          confirm={handleDelete}
          text="Delete"
        />
      )}
    </div>
  );
};

export default SparePartComp;
