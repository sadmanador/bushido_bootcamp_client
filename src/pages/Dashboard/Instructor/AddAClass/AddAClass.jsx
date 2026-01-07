import SectionHeader from "../../../../elements/SectionHeader";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { imgHostingKey } from "../../../../constants";

const AddAClass = () => {
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecureToken();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //submitting the class
  const onSubmit = (data) => {
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
        console.log(imgResponse)
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
            <span className="label-text">Class title</span>
          </label>
          <input
            type="text"
            placeholder="class"
            {...register("class", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Thumbnail</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name of Instructor</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            placeholder="instructor"
            {...register("instructor", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">email</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            {...register("email", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Available Seats</span>
          </label>
          <input
            type="text"
            placeholder="seats"
            {...register("seats", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="price"
            {...register("price", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="form-control hidden">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <input
            type="text"
            defaultValue={"pending"}
            readOnly
            {...register("status", { required: true })}
            className="input input-bordered"
          />
          {errors.class && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="form-control mt-6">
          <input type="submit" className="btn-custom" value="Add the class" />
        </div>
      </form>
    </div>
  );
};

export default AddAClass;
