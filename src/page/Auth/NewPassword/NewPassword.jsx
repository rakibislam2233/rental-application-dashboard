import changePasswordImage from "../../../assets/auth/changePassword.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd"; // Import Ant Design Form
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";
import { GiPadlock } from "react-icons/gi";

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const submit = async (values) => {
    const { password } = values;
    try {
      const res = await resetPassword({
        email,
        password,
      });
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white ">
      <div>
        <img
          src={changePasswordImage}
          className="w-full h-full mx-auto"
          alt="Change Password Illustration"
        />
      </div>
      <div className="mt-16">
        <div className="mb-5">
          <h1 className="font-semibold text-2xl flex items-center gap-2">
            <Link to="/auth/otp">
              <IoIosArrowBack />
            </Link>
            Update Password
          </h1>
        </div>

        {/* Ant Design Form */}
        <Form
          layout="vertical"
          onFinish={submit} // Ant Design's form submission handler
          initialValues={{ password: "", confirmPassword: "" }} // Initial values
          className="space-y-8"
        >
          {/* CustomInput wrapped inside Form.Item for validation */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password",
              },
            ]}
          >
            <CustomInput
             icon={GiPadlock}
              isPassword
              type="password"
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <CustomInput
              icon={GiPadlock}
              isPassword
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          {/* CustomButton for submission */}
          <Form.Item>
            <CustomButton loading={isLoading} border className="w-full">
              Update Password
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
