export const AkramContractAddress =
  "0x13d076DAe4429d73B5ebAe9352F6f50783B7B6D7";
// "0xDcf6705Dc207701401BA5937a1aB622ffCF4ac85";
// "0xe2A34bf8436FfdC384601bd0a8Fd57DB36A1F65e";
// "0x7F31eD5eda0dEE8b2f378330a321b1c6EB0e418b";
// "0xbb2B98C753Bd05d261fE030d8C44770afC99Fa60";

export const firstColor = "#157AC8";
export const secondColor = "#BC28D3";

export const POWER_SIX_OF_10 = Math.pow(10, 6);
export const DIRECT_TYPE = "direct";
export const MATCH_TYPE = "match";

// export const thirdColor = "#7";
// export const fourthColor = "#03fc90";

export const AkramContractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimDirectReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "ClaimMatchingReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DummyJoining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
      {
        internalType: "address",
        name: "_newNode",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_mobile",
        type: "string",
      },
    ],
    name: "joinUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_airdopAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setAirdopAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "airdopAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "directRewardInTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "directRewardOutTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isLeft",
        type: "bool",
      },
    ],
    name: "findParentNode",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
    ],
    name: "getAllChildNodes",
    outputs: [
      {
        internalType: "address[]",
        name: "leftChildren",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "rightChildren",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
    ],
    name: "getAllChildNodesWithData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "mobile",
            type: "string",
          },
          {
            internalType: "address",
            name: "sponsorId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct Unimeta.User[]",
        name: "leftChildren",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "mobile",
            type: "string",
          },
          {
            internalType: "address",
            name: "sponsorId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct Unimeta.User[]",
        name: "rightChildren",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
    ],
    name: "getChildNodes",
    outputs: [
      {
        internalType: "address",
        name: "leftChild",
        type: "address",
      },
      {
        internalType: "address",
        name: "rightChild",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getJoiningDays",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userId",
        type: "address",
      },
    ],
    name: "getSponsorCount",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "mobile",
            type: "string",
          },
          {
            internalType: "address",
            name: "sponsorId",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct Unimeta.User[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sponsor",
        type: "address",
      },
    ],
    name: "getSponsorEarnings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "directRemaining",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "directEarn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "matchEarning",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalEarning",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "matchRemaining",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leftTotal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rightTotal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "leftSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rightSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "airdopAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Unimeta.EarningsData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isAirdopClaimOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joiningAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joiningTimeCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nodes",
    outputs: [
      {
        internalType: "address",
        name: "left",
        type: "address",
      },
      {
        internalType: "address",
        name: "right",
        type: "address",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "joiningTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastSponsorTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "mobile",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "matchEarn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "directEarn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "directEarnRemaining",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalEarn",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "root",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "secondsInADay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userData",
    outputs: [
      {
        internalType: "address",
        name: "userId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "mobile",
        type: "string",
      },
      {
        internalType: "address",
        name: "sponsorId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
