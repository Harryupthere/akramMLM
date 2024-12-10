// Join left and right  ($12) USDT ( Polygon )
// First direct pe unlock token
// Second direct 72 hrs -> 83.3333333333% ($10) of the joining fee , else -> 50% ($5)
// 1% increase perday (airdop) ( 500 )
// Matching (left and right) 10%

// 1. history of sponsorCount joinner // name email, mobile sponsor id, time etc
// 2. Matching earned till now.
// 3. Matching earning reaming to cliam.
// 4. Total reward till now. matching + Direct sponsor.
// 5. Todays' earning.
// 6. Left and right team with history // // name email, mobile sponsor id , time. etc.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BinaryTree {
    struct TreeNode {
        string left;
        string right;
        bool exists;
        uint256 joiningTime;
        uint256 lastSponsorTime;
        uint256 airdopTokens;
        string name;
        string email;
        string mobile;
    }

    struct User {
        uint256 amount;
        string name;
        string email;
        string mobile;
        string sponsorId;
        uint256 createdAt;
    }

    struct Earn {
        uint256 matchEarn;
        uint256 directEarn;
        uint256 totalEarn;
    }
    mapping(string => Earn) public userEarning;
    mapping(string => TreeNode) public nodes;
    mapping(string => User[]) public sponsorCount;
    mapping(string => string[]) private leftTree;
    mapping(string => string[]) private rightTree;

    string public root;
    uint256 public totalSize;
    uint256 public airdopAmount = 500;
    uint256 public joiningAmount = 15e6;
    uint256 public joiningTimeCap = 300; // 5 minutes

    constructor() {
        // Initialize the root node
        root = "root";
        nodes[root] = TreeNode({
            left: "",
            right: "",
            exists: true,
            joiningTime: block.timestamp,
            lastSponsorTime: block.timestamp,
            airdopTokens: airdopAmount,
            name: "root",
            email: "root@project.com",
            mobile: "9076873657"
        });
    }

    // Function to join a new user into the binary tree
    function joinUser(
        string memory _sponsor,
        string memory _newNode,
        string memory _name,
        string memory _email,
        string memory _mobile
    ) public {
        uint256 sponsorSize = sponsorCount[_sponsor].length;

        // Create a new User struct
        User memory newUser = User({
            amount: joiningAmount,
            name: _name,
            email: _email,
            mobile: _mobile,
            sponsorId: _sponsor,
            createdAt: block.timestamp
        });

        // Push the new user into the sponsorCount mapping
        sponsorCount[_sponsor].push(newUser);

        bool isLeft = sponsorSize % 2 == 0;

        string memory _parentNode = findLastNode(_sponsor, isLeft);
        require(nodes[_parentNode].exists, "Parent node does not exist");

        // Determine the position (left or right) and check if it's empty
        if (isLeft) {
            require(
                keccak256(abi.encodePacked(nodes[_parentNode].left)) ==
                    keccak256(abi.encodePacked("")),
                "Left child already exists"
            );
            nodes[_parentNode].left = _newNode;

            // Push to leftTree array
            leftTree[_sponsor].push(_newNode);
        } else {
            require(
                keccak256(abi.encodePacked(nodes[_parentNode].right)) ==
                    keccak256(abi.encodePacked("")),
                "Right child already exists"
            );
            nodes[_parentNode].right = _newNode;
            // Push to rightTree array
            rightTree[_sponsor].push(_newNode);
        }

        nodes[_sponsor].lastSponsorTime = block.timestamp;

        // Initialize the new node
        nodes[_newNode] = TreeNode({
            left: "",
            right: "",
            exists: true,
            joiningTime: block.timestamp,
            lastSponsorTime: 0,
            airdopTokens: airdopAmount,
            name: _name,
            email: _email,
            mobile: _mobile
        });

        totalSize++;
    }

    // Function to find the last node in the binary tree
    function findLastNode(
        string memory _sponsor,
        bool isLeft
    ) public view returns (string memory) {
        if (isLeft) {
            if (
                keccak256(abi.encodePacked(nodes[_sponsor].left)) ==
                keccak256(abi.encodePacked(""))
            ) {
                return _sponsor; // Return the current node if the left child is empty
            } else {
                return findLastNode(nodes[_sponsor].left, true);
            }
        } else {
            if (
                keccak256(abi.encodePacked(nodes[_sponsor].right)) ==
                keccak256(abi.encodePacked(""))
            ) {
                return _sponsor; // Return the current node if the right child is empty
            } else {
                return findLastNode(nodes[_sponsor].right, false);
            }
        }
    }

    function getLeftRightTree(
        string memory _sponsor
    ) public view returns (string[] memory, string[] memory) {
        return (leftTree[_sponsor], rightTree[_sponsor]);
    }

    function getMatchEraningRemaining() public pure returns (uint256) {
        return 20;
    }
}
