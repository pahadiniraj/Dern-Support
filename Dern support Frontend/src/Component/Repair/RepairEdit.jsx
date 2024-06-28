import { Formik, Form } from "formik";
import CustomInput from "../CustomValidation/CustomInput";
import { CustomSelect } from "../CustomValidation/CustomSelect";

const RepairEdit = ({ editData, handleChange, close, handleUpdate }) => {
  const showData = [
    {
      name: editData?.user?.fullname || "N/A",
      date: editData?.createdAt || "N/A",
      description: editData?.description || "N/A",
      status: editData?.status || "N/A",
      quote: editData?.quote?.[0]?.amount || "N/A",
    },
  ];

  return (
    <div className="w-full p-4 flex justify-center h-full items-center fixed inset-0 bg-opacity-40 bg-black z-10 backdrop-blur-sm">
      <div className="bg-white w-3/5 p-4 justify-center items-center gap-2 rounded-lg relative">
        <div>
          <h2 className="font-bold text-center text-xl">Edit Repair</h2>
        </div>
        <div className="absolute top-1 right-4">
          <button onClick={() => close(false)}>x</button>
        </div>
        <div className="flex gap-4 w-full">
          <Formik
            initialValues={{
              description: editData?.description || "",
              status: editData?.status || "",
              quote: editData?.quote?.[0]?.amount || 0,
            }}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <Form className="w-full flex flex-col gap-2">
                <div className="bg-slate-200 flex flex-col gap-2">
                  {showData.map((data, index) => (
                    <div className="flex flex-col gap-2 p-4" key={index}>
                      <div className="flex gap-2">
                        <p className="font-medium">Name </p>
                        <p>{data.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Description </p>
                        <p>{data.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Date </p>
                        <p>{data.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Status</p>
                        <p>{data.status}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-medium">Quote :</p>
                        <p>{data.quote}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <CustomSelect
                  label="Status"
                  name="status"
                  value={editData?.status}
                  onChange={handleChange}
                >
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELED">CANCELED</option>
                </CustomSelect>

                <CustomInput
                  label="Quote"
                  name="quote"
                  type="number"
                  placeholder="Total Cost"
                  className="  "
                />

                <button
                  type="submit"
                  className="bg-green-600 w-full text-white p-2 rounded-lg"
                >
                  Update
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RepairEdit;
