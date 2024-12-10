import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { AkramContractABI, AkramContractAddress } from "./../config";
import { useAccount } from "wagmi";
import Web3 from "web3";
import { Loading } from "./Loader/Loader";
import { toast } from "react-toastify";
import { getNodeData, getRootAddress } from "../web3Service";
import { getWeb3ErrorMessage } from "./Helper/help";

const people = [{ name: "true" }, { name: "false" }];
const Register = () => {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const [errors, setErrors] = useState({});

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const sponsor = queryParams.get("sponsor");

  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    sponserId: "",
    name: "",
    mobileNumber: "",
    yourWalletAddress: address,
  });

  let web3 = new Web3(window.ethereum);

  const navigate = useNavigate();

  let MainContract = new web3.eth.Contract(
    AkramContractABI,
    AkramContractAddress
  );

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    let formErrors = {};
    const { sponserId, name, mobileNumber, yourWalletAddress } = registerForm;

    // Check if the fields are empty
    if (!sponserId.trim())
      formErrors.sponserId = "Sponsor Address is required.";
    if (!name.trim()) formErrors.name = "Name is required.";

    if (!mobileNumber.trim())
      formErrors.mobileNumber = "Mobile Number is required.";
    if (!yourWalletAddress.trim())
      formErrors.yourWalletAddress = "Wallet Address is required.";

    // Validate mobile number (e.g., 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (mobileNumber && !mobileRegex.test(mobileNumber))
      formErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";

    // Validate wallet address (assuming Ethereum address format)
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (yourWalletAddress && !walletRegex.test(yourWalletAddress))
      formErrors.yourWalletAddress = "Please enter a valid wallet address.";

    setErrors(formErrors);

    // If no errors, return true
    return Object.keys(formErrors).length === 0;
  };

  // Handle registration
  const handleRegister = async () => {
    setIsLoading(true);
    console.log("Registration Data:", registerForm);

    if (!validateForm()) {
      console.log("Error: Invalid registration , ", errors);
      setIsLoading(false);
      return;
    }

    try {
      const joinUserData = MainContract.methods.joinUser(
        registerForm.sponserId,
        registerForm.yourWalletAddress,
        registerForm.name,
        registerForm.mobileNumber
      );

      let encoded_tx = joinUserData.encodeABI();
      let gasPrice = await web3.eth.getGasPrice();
      console.log("gasPrice : ", gasPrice);
      let gasLimit = await web3.eth.estimateGas({
        gasPrice: web3.utils.toHex(gasPrice),
        to: AkramContractAddress,
        from: address,
        data: encoded_tx,
      });
      let trx = await web3.eth.sendTransaction({
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gasLimit),
        to: AkramContractAddress,
        from: address,
        data: encoded_tx,
      });

      if (trx.transactionHash) {
        toast.success("Registration Successful!");
        setRegisterForm({
          sponserId: "",
          name: "",
          mobileNumber: "",
          yourWalletAddress: "",
        });
        setIsLoading(false);
        navigate("/main");
      }

      console.log("trx : ", trx);
    } catch (error) {
      console.error("Error in Registration:", error);
      const errorMessage = getWeb3ErrorMessage(error.message.toString());
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (address && isConnected) {
        try {
          const node = await getNodeData(address);
          const rootAddress = await getRootAddress();

          console.log("Root is: ", rootAddress);

          setRegisterForm((prevState) => ({
            ...prevState,
            sponserId: sponsor ? sponsor : rootAddress, // Default to root address
          }));

          if (node?.exists) {
            console.log("Navigating to main page");
            navigate("/main");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch root or node data.");
        }
      } else {
        console.log("Please connect to your wallet to access your information");
        toast.error("Please connect to your wallet to access your information");
        navigate("/");
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [address, isConnected]);

  return (
    <>
      <div className="max-w-[500px] w-full mx-auto register ">
        <div className="bg-gradient-to-r from-[#04021F] to-[#280941] text-white min-h-screen ">
          <NavLink to="/">
            <img
              src={process.env.PUBLIC_URL + "/assets/left.png"}
              className="px-5 pt-4"
            />
          </NavLink>

          <h2 className="text-white text-center font-bold ">Register</h2>
          <form className=" mx-auto max-w-[400px] py-5 px-3">
            <div className="my-4">
              <label className="pb-3">Sponsor Address</label>
              <br />
              <input
                type="text"
                name="sponserId"
                value={registerForm.sponserId}
                placeholder="Sponsor Address"
                className="rounded-lg px-5 py-3 w-full my-4"
                onChange={handleChange}
              ></input>
              {errors.sponserId && (
                <p className="text-red-500">{errors.sponserId}</p>
              )}
            </div>

            <div className="my-4">
              <label className="pb-3">Name</label>
              <br />
              <input
                type="text"
                name="name"
                value={registerForm.name}
                placeholder="Your Name"
                className="rounded-lg px-5 py-3 w-full my-4"
                onChange={handleChange}
              ></input>
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              {/* <p className="mt-1">Pay 50.00 USDT For Registration</p> */}
            </div>

            <div className="my-4">
              <label className="pb-3">Mobile Number</label>
              <br />
              <input
                type="text"
                name="mobileNumber"
                value={registerForm.mobileNumber}
                placeholder="Mobile Number"
                className="rounded-lg px-5 py-3 w-full my-4"
                onChange={handleChange}
              ></input>
              {errors.mobileNumber && (
                <p className="text-red-500">{errors.mobileNumber}</p>
              )}
            </div>

            {/* <div className="my-4">
              <label className="pb-3">Your Wallet Address </label>
              <br />
              <input
                type="text"
                name="yourWalletAddress"
                value={registerForm.yourWalletAddress}
                placeholder="Wallet Address"
                className="rounded-lg px-5 py-3 w-full my-4"
                onChange={handleChange}
              ></input>
              {errors.yourWalletAddress && (
                <p className="text-red-500">{errors.yourWalletAddress}</p>
              )}
            </div> */}
          </form>
          <div className="text-center py-5">
            <button
              onClick={handleRegister}
              className="text-white  px-3 max-w-[300px] w-full mx-auto py-3 rounded-full  bg-gradient-to-r from-[#157AC8] to-[#BC28D3] font-bold"
            >
              Register
            </button>
          </div>
        </div>

        {isLoading && (
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
        )}
      </div>
    </>
  );
};

export default Register;
