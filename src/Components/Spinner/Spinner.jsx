import React from "react";
import { Blocks } from "react-loader-spinner";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="bg-black bg-opacity-70 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-50">
        <div className="">
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
