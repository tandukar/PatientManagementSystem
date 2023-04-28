import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  useUpdateReceptionistMutation,
  useGetReceptionistQuery,
} from "./ReceptionistApiSlice";

const UpdateReceptionist = ({ receptionistId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [recepId, setrecepId] = useState(receptionistId);

  const [UpdateReceptionist, { isLoading, error }] =
    useUpdateReceptionistMutation();

  const { data: getRecep = [] } = useGetReceptionistQuery(recepId, {
    skip: recepId === null,
  });

  const sex = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    console.log("detail", getRecep);
    const { firstname, lastname, age, sex, number, address, email, email1 } =
      getRecep;
    setValue("firstname", firstname ?? "");
    setValue("lastname", lastname ?? "");
    setValue("age", age ?? "");
    setValue("sex", sex ?? "");
    setValue("number", number ?? "");
    setValue("address", address ?? "");
    setValue("email", email ?? "");
    setValue("email1", email1 ?? "");
  }, [getRecep]);

  const onSubmit = (data) => {
    // console.log(recepId);
    // console.log("data", data);
    console.log("submitting");
    try {
      console.log("updating receptionist");
      UpdateReceptionist({ id: recepId, body: data });
    //   toast.success("Receptionist Updated Successfully", {
    //     toastId: "success1",
    //   }); 
      //prevent duplicate toast
      toast.success("success1", {
        render: "Receptionist Updated Successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        });
      console.log("submitted");
    } catch {
      toast.error("Receptionist Update Failed");
    }
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setValue("sex", selectedOption.value);
  };
  const handleDateChange = (selectedDate) => {
    setSelectedDate(dayjs(selectedDate));
  };

  return (
    <>

      <div className="text-center my-8">
        <div className="text-4xl">Update Receptionist</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 p-6 rounded-lg ">
          <div className="flex md:flex-row gap-2 flex-col">
            <div className=" md:container md:mx-auto ">
              <label className="form-label inline-block mb-2 text-gray-600 font-semibold">
                First name
              </label>
              <input
                id="firstname"
                type="Text"
                defaultValue={getRecep.firstname}
                className="bg-whtie appearance-none border-2  border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                error={errors.firstname ? true : false}
                {...register("firstname", {
                  required: "Frist Name is required",
                })}
              />
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )}
            </div>
            <div className="  md:container md:mx-auto ">
              <label className="form-label inline-block mb-2 text-gray-600 font-semibold">
                Last name
              </label>
              <input
                id="lastname"
                type="Text"
                defaultValue={getRecep.lastname}
                className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                error={errors.lastname ? true : false}
                {...register("lastname", {
                  required: "Last Name is required",
                })}
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>
          </div>
          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}

          <div className="flex flex-col md:flex-row gap-2">
            <div className="md:w-1/2">
              <div className="md:container md:mx-auto">
                <label className="form-label  font-semibold inline-block mb-2 text-gray-600">
                  Age
                </label>
                <input
                  id="age"
                  type="Number"
                  variant="outlined"
                  defaultValue={getRecep.age}
                  className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.age ? true : false}
                  {...register("age", { required: "Age is required" })}
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="md:container md:mx-auto">
                <label className="form-label font-semibold  inline-block mb-2 text-gray-600">
                  Sex
                </label>
                <Select
                  options={sex}
                  name="sex"
                  defaultValue={{ value: getRecep.sex }}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
            <div className="md:w-full">
              <div className="md:container md:mx-auto">
                <label className="form-label inline-block mb-2 font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  id="number"
                  type="Text"
                  defaultValue={getRecep.number}
                  className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.number ? true : false}
                  {...register("number", {
                    required: "This is required",
                  })}
                />
                {errors.number && (
                  <p className="text-red-500">{errors.number.message}</p>
                )}
              </div>
            </div>
            <div className="md:w-full">
              <div className="md:container md:mx-auto">
                <label className="form-label inline-block mb-2 text-gray-600 font-semibold">
                  Address
                </label>
                <input
                  id="address"
                  type="Text"
                  defaultValue={getRecep.address}
                  className="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  error={errors.address ? true : false}
                  {...register("address", {
                    required: "This is required",
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 ">{errors.address.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
          <div className="flex md:flex-row flex-col gap-2">
            <div className="  md:container md:mx-auto ">
              <label className="form-label inline-block mb-2 text-gray-600 font-semibold">
                Primary Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={getRecep.email}
                className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                error={errors.email ? true : false}
                {...register("email", { required: "This is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="  md:container md:mx-auto ">
              <label className="form-label inline-block mb-2 text-gray-600 font-semibold">
                Secondary Email
              </label>
              <input
                id="email1"
                type="email"
                defaultValue={getRecep.email1}
                className="bg-whtie appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                error={errors.email1 ? true : false}
                {...register("email1", {
                  required: "This is required",
                })}
              />
              {errors.email1 && (
                <p className="text-red-500">{errors.email1.message}</p>
              )}
            </div>
          </div>

          {/* ```````````````````````````````````````````````````````````````````````````````````````````````````` */}
          <div className=" mt-10 mb-10  text-center">
            <button
              type="submit"
              className="bg-custom-blue hover:bg-custom-blue text-white w-60  md:w-40 sm:w20 font-bold py-2 px-4 rounded focus:ring-2 focus:ring-blue-500 ring-offset-2 outline-none focus:bg-blue-500 focus:shadow-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateReceptionist;
