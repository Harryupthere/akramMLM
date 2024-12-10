// import React, { useState } from "react";
// import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

// export const Loading = () => {
//   return (
//     <div className="max-w-[500px] mx-auto bg-opacity-20  h-screen">
//       {/* <h5 className="text-xl text-black font-bold roboto text-center ">
//         Loading...
//       </h5> */}
//       <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
//     </div>
//   );
// };

// // function PreLoader1() {
// //   return (
// //     <>
// //       <ReactLoading type={"bars"} color={"#03fc4e"} height={100} width={100} />
// //     </>
// //   );
// // }

import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex max-w-[350px] h-screen w-[500px] items-center justify-center z-50">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;

// {data?.isLoading && (
//   <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//     <div className="flex max-w-[350px] h-screen w-[500px] items-center justify-center z-100">
//       <ThreeDots
//         height={80}
//         width={80}
//         radius={9}
//         color="white" // Color for the dots
//         ariaLabel="three-dots-loading"
//         wrapperStyle={{}}
//         wrapperClassName=""
//         visible={true}
//       />
//     </div>
//   </div>
// )}
