import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Header = ({ heading, paragraph, linkUrl = "#", linkName }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <h1 className="text-5xl  font-semibold">{heading}</h1>
      </div>

      <p className=" text-center  text-xl text-gray-700 mt-5">
        {paragraph}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};
