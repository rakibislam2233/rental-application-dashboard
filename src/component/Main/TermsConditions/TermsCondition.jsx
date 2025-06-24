import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { useGetTermsAndConditionsQuery } from "../../../redux/features/settings/settingsApi";
import { Spin } from "antd";
const TermsCondition = () => {
  const { data: responseData, isLoading } = useGetTermsAndConditionsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spin />
      </div>
    );
  }
  return (
    <section className="w-full h-full min-h-screen px-5 pb-8">
      <div className="flex justify-between items-center py-4 border-b-2 border-gray-400 mb-4">
        <div className="flex gap-2 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
        </div>
        <Link to={"/settings/edit-terms-conditions"}>
          <button
            className="px-8 py-3 flex justify-between items-center gap-2 bg-primary text-white rounded-lg"
            type="submit"
          >
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>
      {/* Your privacy policy content goes here */}
      <div
        dangerouslySetInnerHTML={{ __html: responseData?.description }}
      ></div>
    </section>
  );
};

export default TermsCondition;
