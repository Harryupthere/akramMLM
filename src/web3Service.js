// web3Service.js
import Web3 from "web3";
import { AkramContractABI, AkramContractAddress } from "./config";
import { toast } from "react-toastify";
import { getWeb3ErrorMessage } from "./components/Helper/help";

let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.error("Ethereum wallet is not available");
  alert("Ethereum wallet is not available");
}

// Function to get contract instance
const getContractInstance = () => {
  return new web3.eth.Contract(AkramContractABI, AkramContractAddress);
};

// Function to fetch node data from the smart contract
export const getNodeData = async (userAddress) => {
  try {
    const contract = getContractInstance();
    const nodeData = await contract.methods.nodes(userAddress).call();
    console.log("nodeData : ", nodeData);

    return nodeData;
  } catch (error) {
    console.error("Error fetching node data:", error);
    return null;
  }
};

// Function to fetch getSponsorEarnings data from the smart contract
export const getSponsorEarnings = async (userAddress) => {
  try {
    const contract = getContractInstance();
    const data = await contract.methods.getSponsorEarnings(userAddress).call();
    return data;
  } catch (error) {
    console.error("Error fetching node data:", error);
    return null;
  }
};

// Function to fetch getLeftRightTree data from the smart contract
export const getLeftRightTree = async (sponsorId) => {
  try {
    const contract = getContractInstance();
    const tree = await contract.methods
      .getAllChildNodesWithData(sponsorId)
      .call();

    console.log("left right is : ", tree);

    return tree;
  } catch (error) {
    console.error("Error fetching node data:", error);
    return null;
  }
};

// Function to fetch getSponsorCount data from the smart contract
export const getSponsorCount = async (userAddress) => {
  try {
    const contract = getContractInstance();
    const count = await contract.methods.getSponsorCount(userAddress).call();
    return count;
  } catch (error) {
    console.error("Error fetching sponsor count:", error);
    return null;
  }
};

export const getJoiningDays = async (userAddress) => {
  try {
    const contract = getContractInstance();
    const days = await contract.methods.getJoiningDays(userAddress).call();
    return days;
  } catch (error) {
    console.error("Error fetching joining days:", error);
    return null;
  }
};

export const claimMatchingReward = async (fromAddress, amount) => {
  try {
    const contract = getContractInstance();

    const joinUserData = contract.methods.ClaimMatchingReward(amount);

    let encoded_tx = joinUserData.encodeABI();
    let gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice : ", gasPrice);
    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: AkramContractAddress,
      from: fromAddress,
      data: encoded_tx,
    });
    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: AkramContractAddress,
      from: fromAddress,
      data: encoded_tx,
    });

    if (trx.transactionHash) {
      toast.success("Claimed Successful!");
    }

    console.log("trx : ", trx);
  } catch (error) {
    console.error("Error in claimMatchingReward:", error);
    const errorMessage = getWeb3ErrorMessage(error.message);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong. Please try again!");
    }
  }
};

export const claimDirectReward = async (fromAddress, amount) => {
  try {
    const contract = getContractInstance();

    const joinUserData = contract.methods.ClaimDirectReward(amount);

    let encoded_tx = joinUserData.encodeABI();
    let gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice : ", gasPrice);
    let gasLimit = await web3.eth.estimateGas({
      gasPrice: web3.utils.toHex(gasPrice),
      to: AkramContractAddress,
      from: fromAddress,
      data: encoded_tx,
    });
    let trx = await web3.eth.sendTransaction({
      gasPrice: web3.utils.toHex(gasPrice),
      gas: web3.utils.toHex(gasLimit),
      to: AkramContractAddress,
      from: fromAddress,
      data: encoded_tx,
    });

    if (trx.transactionHash) {
      toast.success("Claimed Successful!");
    }

    console.log("trx : ", trx);
  } catch (error) {
    console.error("Error in ClaimDirectReward:", error);
    const errorMessage = getWeb3ErrorMessage(error.message);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.error("Something went wrong. Please try again!");
    }
  }
};

export const getNestSponsorRemainingTime = async (
  userAddress,
  lastSponsorJoiningTime,
  leftSize,
  rightSize
) => {
  try {
    console.log(
      "getNestSponsorRemainingTime : ",
      userAddress,
      lastSponsorJoiningTime,
      leftSize,
      rightSize
    );

    const contract = getContractInstance();
    const joinTimeCap = await contract.methods.joiningTimeCap().call();

    if ((leftSize + rightSize) % 2 === 0) {
      return {
        isTimer: false,
        time: 0,
      };
    } else {
      const currentTime = new Date().getTime();
      const remainingTime =
        Number(lastSponsorJoiningTime) +
        // 500 +
        Number(joinTimeCap) -
        parseInt(currentTime / 1000);

      if (remainingTime <= 0) {
        return {
          isTimer: false,
          time: 0, // Timer expired
        };
      } else {
        return {
          isTimer: true,
          time: remainingTime, // Timer in seconds
        };
      }
    }
  } catch (error) {
    console.error("Error fetching remaining time:", error);
    return {
      isTimer: false,
      time: 0,
    };
  }
};

export const getRootAddress = async () => {
  try {
    const contract = getContractInstance();
    const root = await contract.methods.root().call();
    return root;
  } catch (error) {
    console.error("Error fetching joining days:", error);
    return null;
  }
};
