import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { getNodeData } from "../web3Service";
import Loader from "./Loader/Loader";
import { toast } from "react-toastify";
import About from "./About";

const ConnectWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const navigate = useNavigate();
  const hasToastShown = useRef(false); // Track if the toast has been shown

  const fetchData = async (userWalletAddress) => {
    if (!isConnected || !userWalletAddress) return;

    setIsLoading(true);
    try {
      const nodeData = await getNodeData(userWalletAddress);

      if (nodeData?.exists) {
        navigate("/main"); // Navigate to the main page if the user exists
      } else {
        navigate("/register"); // Navigate to the registration page if the user doesn't exist
      }
    } catch (error) {
      console.error("Error fetching node data:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hasToastShown.current = false; // Reset toast flag whenever address changes
    fetchData(address);
  }, [address, isConnected]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="connect-wallet max-w-[500px] w-full mx-auto min-h-screen pt-5">
      <div
        className="max-w-[500px] w-full h-screen"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "20px", // For some top spacing
        }}
      >
        {/* Top Section: Image */}
        <div
          style={{
            alignSelf: "flex-start",
            textAlign: "center",
            width: "100%",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/fire.svg`}
            alt="Fire Icon"
            style={{
              maxWidth: "350px",
              width: "100%",
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>

        {/* Center Section: Text */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Welcome to UNI-Meta
          </h2>
          <p
            style={{
              fontSize: "1rem",
              textTransform: "uppercase",
              color: "#9999A4",
              padding: "10px 20px",
              fontWeight: "bold",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            A revolutionary phase in decentralized networking
          </p>
        </div>

        {/* Bottom Section: Button */}
        <div
          style={{ alignSelf: "flex-end", width: "100%", textAlign: "center" }}
        >
          <button
            onClick={open}
            style={{
              color: "white",
              margin: "20px 0",
              padding: "15px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "50px",
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isConnected ? "Disconnect" : "Connect Wallet"}
          </button>
        </div>
      </div>

      <div>
        <About />
      </div>
    </div>
  );
};

export default ConnectWallet;
