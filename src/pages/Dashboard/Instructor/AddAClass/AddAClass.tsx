import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionHeader from "../../../../components/common/SectionHeader";
import { imgHostingKey } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";

interface ClassFormData {
  class: string;
  image: FileList;
  instructor: string;
  email: string;
  seats: string;
  price: string;
  status: 'pending' | 'approved' | 'denied';
}

const AddAClass: React.FC = () => {
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecureToken();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>();

  //submitting the class
  const onSubmit = (data: ClassFormData) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          imgHostingKey
        }`,
        formData
      )
      .then((imgResponse) => {
        if (imgResponse.data.success) {
          const cost = parseFloat(data.price);
          const availableSeats = parseFloat(data.seats);

          const classData = {
            instructor: data.instructor,
            email: data.email,
            name: data.class,
            image: imgResponse.data.data.url,
            status: data.status,
            price: cost,
            seats: availableSeats,
            instructor_img: user?.photoURL,
            enrolled: 0,
            feedback: "",
          };
          axiosSecure.post("/classes", classData).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Class successfully added",
                showConfirmButton: false,
                timer: 1000,
              });
              navigate("/dashboard/myClasses");
            }
          });
        }
      });
  };

  return (
    <div>
      <SectionHeader
        heading={"Add a Class"}
        subHeading={
          "Add a class which you want to take, however, Wait for Administration's decision"
        }
      />
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Class title</span>
          </label>
          <input
            type="text"
            placeholder="class"
            {...register("class", { required: true })}
            className="input input-bordered bg-slate-800 text-white border-white/10"
          />
          {errors.class && (
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Class Thumbnail</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs bg-slate-800 text-white border-white/10"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Name of Instructor</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName || ""}
            readOnly
            placeholder="instructor"
            {...register("instructor", { required: true })}
            className="input input-bordered bg-slate-800/50 text-slate-400 border-white/10 cursor-not-allowed"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            readOnly
            {...register("email", { required: true })}
            className="input input-bordered bg-slate-800/50 text-slate-400 border-white/10 cursor-not-allowed"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Available Seats</span>
          </label>
          <input
            type="number"
            placeholder="seats"
            {...register("seats", { required: true, min: 1 })}
            className="input input-bordered bg-slate-800 text-white border-white/10"
          />
          {errors.seats && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid number of seats</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Price</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="price"
            {...register("price", { required: true, min: 0 })}
            className="input input-bordered bg-slate-800 text-white border-white/10"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid price</p>
          )}
        </div>
        <div className="form-control hidden">
          <input
            type="text"
            defaultValue={"pending"}
            readOnly
            {...register("status", { required: true })}
          />
        </div>

        <div className="form-control mt-8">
          <button type="submit" className="btn btn-premium w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all">
            Add the class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAClass;
