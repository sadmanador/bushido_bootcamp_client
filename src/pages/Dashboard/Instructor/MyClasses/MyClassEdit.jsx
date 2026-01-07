import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { imgHostingKey } from "../../../../constants";
import SectionHeader from "../../../../elements/SectionHeader";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecureToken from "../../../../hooks/useAxiosSecureToken";

const MyClassEdit = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecureToken();

  const { refetch, data: singleClass = {} } = useQuery({
    queryKey: ["taken-courses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/classes/myClasses/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { name, image, price, seats, _id } = singleClass;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imgHostingKey}`, formData)
      .then((imgResponse) => {
        if (imgResponse.data.success) {
          const cost = parseFloat(data.price);
          const availableSeats = parseFloat(data.seats);
          const updatedClass = {
            name: data.class,
            image: imgResponse.data.data.url,
            price: cost,
            seats: availableSeats,
          };
          console.log(updatedClass);
          axiosSecure
            .put(`/classes/myClasses/${_id}?email=${user?.email}`, updatedClass)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Class successfully Updated",
                  showConfirmButton: false,
                  timer: 1000,
                });
                refetch();
              }
            });
        }
      });
  };

  return (
    <div>
      <SectionHeader
        heading="Edit"
        subHeading="Although, you are not allowed to edit the instructor's name and email"
      ></SectionHeader>
      <div className="text-center my-10">
        <div className="avatar">
          <div className="w-56 rounded">
            <img src={image} />
          </div>
        </div>
      </div>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class title</span>
          </label>
          <input
            type="text"
            defaultValue={name}
            placeholder={name}
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
            <span className="label-text">Available Seats</span>
          </label>
          <input
            type="text"
            defaultValue={seats}
            placeholder={seats}
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
            placeholder={price}
            defaultValue={price}
            {...register("price", { required: true })}
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

export default MyClassEdit;
