import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "antd";
import { useEffect } from "react";
import CustomInput from "../../../utils/CustomInput";

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
      });
    }
  }, [user, form]);
  return (
    <div className="w-full px-5">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center my-6">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Personal Information</h1>
        </div>
        <Link to="/edit-personal-info">
          <button className="px-8 py-3 bg-primary text-white rounded-lg">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Profile Information */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
        {/* Profile Picture */}
        <div className="w-full h-96 border col-span-full md:col-span-3 rounded-lg flex justify-center items-center flex-col gap-5">
          <img
            className="size-32 rounded-full mx-auto"
            src={`${user?.profileImage}`}
            alt=""
          />

          <span className="mt-2 text-gray-500">Profile</span>
          <span className="text-lg font-semibold uppercase">{user?.role}</span>
        </div>

        {/* Personal Details */}
        <Form
          form={form}
          layout="vertical"
          className="w-full col-span-full md:col-span-9 space-y-6 mt-10"
        >
           {/* first Name */}
          <Form.Item label="First Name" name="firstName" >
            <CustomInput placeholder="Enter your first name" readOnly />
          </Form.Item>
          {/* Last Name */}
          <Form.Item label="Last Name" name="lastName">
            <CustomInput placeholder="Enter your last name" readOnly />
          </Form.Item>
          {/* Email */}
          <Form.Item label="Email" name="email">
            <CustomInput placeholder="Enter your email" readOnly />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInformation;
