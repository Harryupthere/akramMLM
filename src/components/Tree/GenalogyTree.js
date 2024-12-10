import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
// import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
import { ThreeDots } from "react-loader-spinner";
import { useAccount } from "wagmi";
import Web3 from "web3";
import { MainContractABI, MainContractAddress } from "../../config";
// import copy from "copy-to-clipboard";

const GenalogyTree = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  const [userInfo, setUserInfo] = useState("");
  const [username, setUsername] = useState("");
  const [quickSearch, setQuickSearch] = useState("");
  const { address, isDisconnected } = useAccount();

  const [count, setCount] = useState(2);
  const [tree, setTree] = useState([]);
  const [items, setItems] = useState([]); // Initialize an empty array
  const [clickedNodes, setClickedNodes] = useState([]); // Keep track of clicked nodes

  const zeroAddress = "0x0000000000000000000000000000000000000000";

  let web3 = new Web3(window.ethereum);
  let MainContract = new web3.eth.Contract(
    MainContractABI,
    MainContractAddress
  );

  // const copyToClipboard = (data) => {
  //   copy(data);
  //   alert(data);
  // };

  // Function to add an item to the array
  const addItem = (item) => {
    const newItem = item; // Replace with the item you want to add
    setItems([...items, newItem]); // Use spread operator to update the array
  };

  // Fetch data about the token and update the tree state after fetching the username
  const getData = async () => {
    setIsLoading(true);
    try {
      // get username
      let user = await MainContract.methods.User(address).call();
      setUserInfo(user);
      setUsername(user?.username);

      // Create the initial tree node with the fetched username
      const initialTree = [
        {
          id: 1,
          username: user?.username || "", // Use the fetched username or an empty string as a fallback
          address: address || "", // Use the fetched address or an empty string as a fallback
          position: "center",
          children: [],
        },
      ];

      setTree(initialTree); // Update the tree state witPh the initial tree node
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [address, isDisconnected]);

  // const handleQuickSearch = async (userAddress) => {
  async function handleQuickSearch(userAddress) {
    setIsLoading(true);
    console.log("Quick Search Clicked", quickSearch);

    try {
      // get username
      let user = await MainContract.methods.User(userAddress).call();
      setUserInfo(user);
      setUsername(user?.username);

      // Create the initial tree node with the fetched username
      const initialTree = [
        {
          id: 1,
          username: user?.username || "", // Use the fetched username or an empty string as a fallback
          address: userAddress || "", // Use the fetched address or an empty string as a fallback
          position: "center",
          children: [],
        },
      ];

      setTree(initialTree); // Update the tree state witPh the initial tree node
      setClickedNodes([]); // Keep track of clicked nodes
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }

  const getUsename = async (address) => {
    let user = await MainContract.methods.User(address).call();
    return user.username;
  };
  const checkItem = (itemToCheck) => {
    return items.includes(itemToCheck);
  };

  // Function to add children to a node
  const addChild = async (node) => {
    setIsLoading(true);
    console.log("node : ", node);
    if (!clickedNodes.includes(node.id)) {
      // Check if the node has not been clicked before
      let user = await MainContract.methods.User(node.address).call();
      if (node.address && node.address !== zeroAddress) {
        // Increment count separately for left and right nodes
        let newLeftNode = {
          id: count,
          username: await getUsename(user.left),
          address: user.left,
          position: "left",
          children: [],
        };
        setCount(count + 1);
        console.log("newLeftNode : ", newLeftNode);
        node.children.push(newLeftNode);

        let newRightNode = {
          id: count + 1,
          username: await getUsename(user.right),
          address: user.right,
          position: "right",
          children: [],
        };
        setCount(count + 2);
        console.log("newRightNode : ", newRightNode);
        node.children.push(newRightNode);

        // Update the clickedNodes array to mark this node as clicked
        setClickedNodes([...clickedNodes, node.id]);
      }
      // else {
      //   if (node.position === "left") {
      //     copyToClipboard(
      //       `http://localhost:3000/register/?&sponsor=${node.address}&parent=${node.address}&leftPosition=true`
      //     );
      //   } else {
      //     copyToClipboard(
      //       `http://localhost:3000/register/?&sponsor=${node.address}&parent=${node.address}&leftPosition=false`
      //     );
      //   }
      // }

      setTree([...tree]);
    }
    setIsLoading(false);
  };

  {
    console.log("items : ", items);
  }
  const treeRendering = (node) => {
    return (
      <ul key={node.id}>
        {node.map((child) => (
          <li key={child.id} className={child.text + child.id}>
            <div
              onClick={(async) => addChild(child)}
              className="shadow-md bg-black"
              style={{
                width: 120,
                height: 80,
                borderRadius: 8,
                border: "2px solid #c026d3",
              }}
            >
              {/* {child.id} */}
              {child.username ? <h4>{child.username}</h4> : <p>Add New User</p>}
              <br />
              {child.address && child.address !== zeroAddress
                ? child.address?.slice(0, 4) + "****" + child.address?.slice(-4)
                : ""}
            </div>

            {child.children && child.children.length
              ? treeRendering(child.children)
              : null}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="">
      <div className="text-white">
        <div className="flex gap-2 ">
          <img
            src={process.env.PUBLIC_URL + "/assets/left.png"}
            className="cursor-pointer
            "
            onClick={handleNavigate}
          />

          <h2 className="text-white text-center font-bold">Genealogy Tree</h2>
        </div>

        <div className="w-full mx-auto py-5 ">
          <div className="border border-[#C026D3] rounded-2xl py-5 px-5 bg-[#00011B] mt-5">
            <div className="bg-gradient-to-r from-[#157AC8] to-[#BC28D3] rounded-xl px-5 py-5">
              <h6 className="text-sm text-[#FFFFFF] font-[300px]">
                Selected user’s details:
              </h6>
              <div className="flex flex-col  justify-center">
                <h4 className="font-bold pt-3 text-white">
                  {userInfo.username}
                </h4>

                <h4 className="font-bold pt-3 text-white">
                  {address?.slice(0, 12) + "****" + address?.slice(-12)}
                </h4>
              </div>
            </div>
            <div className="flex gap-2 items-start justify-between items-center border max-w-[400px] w-full  bg-[#00011B] border-[#0682C7] rounded-full my-5 px-5 py-3">
              <input
                type="text"
                onChange={(e) => {
                  setQuickSearch(e.target.value);
                }}
                placeholder="Quick Search"
                className="bg-transparent w-[400px]"
              />
              <button
                onClick={() => {
                  handleQuickSearch(quickSearch);
                }}
              >
                <img src={process.env.PUBLIC_URL + "/assets/search.png"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MLM Tree */}
      <div className="max-w-[550px] mx-auto w-full md:overflow-x-scroll overflow-auto">
        <div
          className="tree"
          style={{ width: "max-content", color: "white", margin: "auto" }}
        >
          {treeRendering(tree)}
        </div>
      </div>
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex max-w-[350px] h-screen w-[500px] items-center justify-center z-50">
            {/* <ReactLoading
              type={"bars"}
              color={"#2373c9"}
              height={100}
              width={100}
            /> */}
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenalogyTree;
