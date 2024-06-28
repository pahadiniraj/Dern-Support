import React, { useEffect, useState } from "react";
import Book from "../Book/Book";
import http from "../../Utils/Instance";
import { ClipLoader } from "react-spinners";
import Button from "../Buttons/Button";
import LogOutNotification from "../LogOut/LogOutNotification";
import RepairEdit from "./RepairEdit";

const RepairComp = () => {
  const table = [
    { tableHead: "Users Id" },
    { tableHead: "Email" },
    { tableHead: "Name" },
    { tableHead: "User Type" },
    { tableHead: "Schedule At" },
    { tableHead: "Description" },
    { tableHead: "Status" },
    { tableHead: "Created At" },
    { tableHead: "Updated At" },
    { tableHead: "Actions" },
  ];

  const [book, setBook] = useState(false);
  const [repairs, setRepairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClick = () => {
    setBook(!book);
  };

  const handleDeletePopup = (index) => {
    setEditIndex(index);
    setDeletePop(!deletePop);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(repairs[index]);
    setOpenEdit(!openEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    console.log(name, value);
  };

  const getApi = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await http.get("/repairs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRepairs(res.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

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

  const handleRepair = (newrepair) => {
    setRepairs([...repairs, newrepair]);
    setBook(false);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await http.put(`/repairs/${editData.id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRepairs = [...repairs];
      // console.log(updatedRepairs);
      updatedRepairs[editIndex] = res.data;
      setRepairs(updatedRepairs);
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating repair:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const tokan = localStorage.getItem("tokan");
    const index = editIndex;
    const id = repairs[index].id;
    console.log(id);
    try {
      setIsLoading(true);
      setDeletePop(false);
      await http.delete(`/repairs/${id}`, {
        headers: {
          Authorization: `Bearer ${tokan}`,
        },
      });

      const updatedRepairs = [...repairs];
      updatedRepairs.splice(editIndex, 1);
      setRepairs(updatedRepairs);
    } catch (error) {
      console.error("Error deleting repair:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen">
      <div className=" flex justify-between p-4">
        <div className="text-2xl font-bold">Repair</div>
        <button
          className="bg-green-600 text-white p-2 rounded-md font-semibold"
          onClick={handleClick}
        >
          Book Us
        </button>
      </div>
      {book && <Book close={handleClick} onAddRepair={handleRepair} />}
      {isLoading ? (
        <div className=" flex justify-center items-center mt-32">
          <ClipLoader
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="flex justify-center items-center"
          />
        </div>
      ) : (
        <div className="p-4">
          <table className="w-full border-collapse">
            <thead className="text-sm">
              <tr className="bg-slate-700 text-white w-full">
                {table.map((item, index) => (
                  <th key={index} className="border px-2 py-2 text-center">
                    {item.tableHead}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-xs w-full">
              {repairs.map((repair, index) => (
                <tr key={index}>
                  <td className="border text-center">{repair.user?.id}</td>
                  <td className="border p-1 text-center">
                    {repair.user?.email}
                  </td>
                  <td className="border p-1 text-center">
                    {repair.user?.fullname}
                  </td>
                  <td className="border p-1 text-center">
                    {repair.user?.userType}
                  </td>
                  <td className="border p-1 text-center">
                    {formatDate(repair.scheduleAt)}
                  </td>
                  <td className="border p-1 text-center">
                    {repair.description}
                  </td>
                  <td
                    className={`border p-1 text-center  text-sm font-semibold
                    ${
                      repair?.status === "IN_PROGRESS"
                        ? "text-yellow-500"
                        : repair?.status === "COMPLETED"
                        ? "text-green-500"
                        : repair?.status === "CANCELED"
                        ? "text-red-500"
                        : ""
                    }
                    `}
                  >
                    {repair?.status}
                  </td>
                  <td className="border p-1 text-center">
                    {formatDate(repair.createdAt)}
                  </td>
                  <td className="border p-1 text-center">
                    {formatDate(repair.updatedAt)}
                  </td>
                  <td className="border p-1 text-center flex gap-2 flex-col">
                    <Button
                      text="Edit"
                      className="bg-blue-500 text-white"
                      onClick={() => handleEdit(index)}
                    />
                    <Button
                      text="Delete"
                      className="bg-red-500 text-white"
                      onClick={() => handleDeletePopup(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {openEdit && (
        <RepairEdit
          handleUpdate={handleUpdate}
          editData={editData}
          handleChange={handleChange}
          close={setOpenEdit}
          repairs={repairs}
          editIndex={editIndex}
          setRepairs={setRepairs}
        />
      )}
      {deletePop && (
        <LogOutNotification
          text="Delete"
          handlePop={handleDeletePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default RepairComp;
