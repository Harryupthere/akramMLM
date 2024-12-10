// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// L.    R
// 150.  120 = 20
// 1000  1200 = 880

contract OptimizedBinaryTree {
    // Define a struct to hold earnings data
    struct EarningsData {
        uint256 directEraning;
        uint256 matchEarning;
        uint256 totalEarning;
        uint256 matchReaming;
        uint256 leftTotal;
        uint256 rightTotal;
        uint256 leftSize;
        uint256 rightSize;
        uint256 airdopAmount;
    }

    struct TreeNode {
        address left;
        address right;
        bool exists;
        uint256 joiningTime;
        uint256 lastSponsorTime;
        string name;
        string email;
        string mobile;
        uint256 matchEarn;
        uint256 directEarn;
        uint256 totalEarn;
    }

    struct User {
        address userId;
        uint256 amount;
        string name;
        string email;
        string mobile;
        address sponsorId;
        uint256 createdAt;
    }

    mapping(address => TreeNode) public nodes;
    mapping(address => User[]) private sponsorCount;
    mapping(address => User) public userData;

    address public root;
    uint256 public totalSize;
    uint256 public airdopAmount = 500;
    uint256 public joiningAmount = 15e6;
    uint256 public joiningTimeCap = 120; // 60 seconds (1 minutes)
    uint256 public secondsInADay = 300;
    uint256 public directRewardInTime = 12e6; // $12 reward
    uint256 public directRewardOutTime = 6e6; // $6 reward

    constructor() {
        root = 0x8ee00F8c0c9a8be9e2f7fdb400E0EDdE20F1df21;

        nodes[root] = TreeNode({
            left: address(0),
            right: address(0),
            exists: true,
            joiningTime: block.timestamp,
            lastSponsorTime: block.timestamp,
            name: "root",
            email: "root@project.com",
            mobile: "9076873657",
            matchEarn: 0,
            directEarn: 0,
            totalEarn: 0
        });

        User memory newUser = User({
            userId: root,
            amount: joiningAmount,
            name: "root",
            email: "root@project.com",
            mobile: "9076873657",
            sponsorId: root,
            createdAt: block.timestamp
        });

        userData[root] = newUser;
    }

    function joinUser(
        address _sponsor,
        address _newNode,
        string memory _name,
        string memory _email,
        string memory _mobile
    ) public {
        require(!nodes[_newNode].exists, "User already exists");
        require(nodes[_sponsor].exists, "Sponsor does not exist");

        uint256 sponsorSize = sponsorCount[_sponsor].length;

        User memory newUser = User({
            userId: _newNode,
            amount: joiningAmount,
            name: _name,
            email: _email,
            mobile: _mobile,
            sponsorId: _sponsor,
            createdAt: block.timestamp
        });

        sponsorCount[_sponsor].push(newUser);
        userData[_newNode] = newUser;

        // Reward the sponsor if the join happens within the time cap
        if (sponsorSize > 0 && sponsorSize % 2 == 1) {
            uint256 lastJoinTime = sponsorCount[_sponsor][sponsorSize - 1]
                .createdAt;
            if (block.timestamp <= lastJoinTime + joiningTimeCap) {
                // Add $10 reward to sponsor
                nodes[_sponsor].directEarn += directRewardInTime;
                nodes[_sponsor].totalEarn += directRewardInTime;
            } else {
                // Add $10 reward to sponsor
                nodes[_sponsor].directEarn += directRewardOutTime;
                nodes[_sponsor].totalEarn += directRewardOutTime;
            }
        }

        bool isLeft = sponsorSize % 2 == 0;

        address parentNode = findParentNode(_sponsor, isLeft);
        require(parentNode != address(0), "Parent node not found");

        // if (nodes[parentNode].left == address(0)) {
        //     nodes[parentNode].left = _newNode;
        // } else {
        //     require(
        //         nodes[parentNode].right == address(0),
        //         "Both child nodes are occupied"
        //     );
        //     nodes[parentNode].right = _newNode;
        // }

        if (isLeft) {
            require(
                nodes[parentNode].left == address(0),
                "Left child nodes are occupied"
            );
            // if(nodes[parentNode].left == address(0))
            nodes[parentNode].left = _newNode;
        } else {
            require(
                nodes[parentNode].right == address(0),
                "Right child nodes are occupied"
            );
            nodes[parentNode].right = _newNode;
        }

        nodes[_newNode] = TreeNode({
            left: address(0),
            right: address(0),
            exists: true,
            joiningTime: block.timestamp,
            lastSponsorTime: 0,
            name: _name,
            email: _email,
            mobile: _mobile,
            matchEarn: 0,
            directEarn: 0,
            totalEarn: 0
        });

        nodes[_sponsor].lastSponsorTime = block.timestamp;

        totalSize++;
    }

    function getSponsorCount(
        address userId
    ) public view returns (User[] memory) {
        return sponsorCount[userId];
    }

    function ClaimMatchingReward(address _sponsor) public {
        // Initialize totals
        uint256 leftAmount = 0;
        uint256 rightAmount = 0;

        // Get the child addresses using getAllChildNodes
        (
            User[] memory leftUsers,
            User[] memory rightUsers
        ) = getAllChildNodesWithData(_sponsor);

        (leftAmount, rightAmount) = getMatchingData(leftUsers, rightUsers);

        // Calculate the match remaining (difference between left and right amounts)
        uint256 matchRemaining = (leftAmount > rightAmount)
            ? rightAmount - nodes[_sponsor].matchEarn
            : leftAmount - nodes[_sponsor].matchEarn;

        // Fetch the sponsor's earnings from the userEarning mapping
        nodes[_sponsor].matchEarn += matchRemaining;
    }

    // Function to find the last node in the binary tree
    function findParentNode(
        address _sponsor,
        bool isLeft
    ) public view returns (address) {
        if (isLeft) {
            if ((nodes[_sponsor].left) == address(0)) {
                return _sponsor; // Return the current node if the left child is empty
            } else {
                return findParentNode(nodes[_sponsor].left, true);
            }
        } else {
            if (nodes[_sponsor].right == address(0)) {
                return _sponsor; // Return the current node if the right child is empty
            } else {
                return findParentNode(nodes[_sponsor].right, false);
            }
        }
    }

    function getChildNodes(
        address _sponsor
    ) public view returns (address leftChild, address rightChild) {
        require(nodes[_sponsor].exists, "Sponsor does not exist");
        return (nodes[_sponsor].left, nodes[_sponsor].right);
    }

    function getMatchingData(
        User[] memory leftUsers,
        User[] memory rightUsers
    ) private pure returns (uint256, uint256) {
        uint256 leftAmount;
        uint256 rightAmount;

        // Calculate the total amount in the left tree and recent earnings (last secondsInADay seconds)
        for (uint256 i = 0; i < leftUsers.length; i++) {
            leftAmount += leftUsers[i].amount;
        }

        // Calculate the total amount in the right tree and recent earnings (last secondsInADay seconds)
        for (uint256 j = 0; j < rightUsers.length; j++) {
            rightAmount += rightUsers[j].amount;
        }

        return (leftAmount, rightAmount);
    }

    function getAllChildNodes(
        address _sponsor
    )
        public
        view
        returns (address[] memory leftChildren, address[] memory rightChildren)
    {
        require(nodes[_sponsor].exists, "Sponsor does not exist");

        // Initialize dynamic arrays to store children
        address[] memory left = new address[](totalSize);
        address[] memory right = new address[](totalSize);

        uint256 leftIndex = 0;
        uint256 rightIndex = 0;

        // Check and start recursion for the left child
        if (nodes[_sponsor].left != address(0)) {
            (left, leftIndex) = _getAllChildNodesRecursive(
                nodes[_sponsor].left,
                left,
                leftIndex
            );
        }

        // Check and start recursion for the right child
        if (nodes[_sponsor].right != address(0)) {
            (right, rightIndex) = _getAllChildNodesRecursive(
                nodes[_sponsor].right,
                right,
                rightIndex
            );
        }

        // Resize arrays to fit the number of children collected
        address[] memory leftResult = new address[](leftIndex);
        address[] memory rightResult = new address[](rightIndex);

        for (uint256 i = 0; i < leftIndex; i++) {
            leftResult[i] = left[i];
        }
        for (uint256 i = 0; i < rightIndex; i++) {
            rightResult[i] = right[i];
        }

        return (leftResult, rightResult);
    }

    function _getAllChildNodesRecursive(
        address _node,
        address[] memory children,
        uint256 index
    ) internal view returns (address[] memory, uint256) {
        // Add the current node to the children array
        children[index] = _node;
        index++;

        // Recursively traverse left and right children
        if (nodes[_node].left != address(0)) {
            (children, index) = _getAllChildNodesRecursive(
                nodes[_node].left,
                children,
                index
            );
        }

        if (nodes[_node].right != address(0)) {
            (children, index) = _getAllChildNodesRecursive(
                nodes[_node].right,
                children,
                index
            );
        }

        return (children, index);
    }

    // function getAllChildNodes(address _sponsor)
    //     public
    //     view
    //     returns (address[] memory leftChildren, address[] memory rightChildren)
    // {
    //     require(nodes[_sponsor].exists, "Sponsor does not exist");

    //     address[] memory left = new address[](totalSize);
    //     address[] memory right = new address[](totalSize);

    //     uint256 leftIndex = 0;
    //     uint256 rightIndex = 0;

    //     if(nodes[_sponsor].left == address(0)) {

    //     }

    //     (leftIndex, rightIndex) = _getAllChildNodesRecursive(
    //         _sponsor,
    //         left,
    //         right,
    //         leftIndex,
    //         rightIndex
    //     );

    //     // Resize arrays to match the count of children
    //     address[] memory leftResult = new address[](leftIndex);
    //     address[] memory rightResult = new address[](rightIndex);
    //     for (uint256 i = 0; i < leftIndex; i++) {
    //         leftResult[i] = left[i];
    //     }
    //     for (uint256 i = 0; i < rightIndex; i++) {
    //         rightResult[i] = right[i];
    //     }

    //     return (leftResult, rightResult);
    // }

    function getSponsorEarnings(
        address _sponsor
    ) public view returns (EarningsData memory) {
        // Get the child addresses using getAllChildNodes
        (
            User[] memory leftUsers,
            User[] memory rightUsers
        ) = getAllChildNodesWithData(_sponsor);

        // Initialize totals
        uint256 leftAmount = 0;
        uint256 rightAmount = 0;

        (leftAmount, rightAmount) = getMatchingData(leftUsers, rightUsers);

        // Calculate the total earnings
        uint256 totalEarn = nodes[_sponsor].directEarn +
            nodes[_sponsor].matchEarn;

        // Calculate the match remaining (difference between left and right amounts)
        uint256 matchRemaining = (leftAmount > rightAmount)
            ? rightAmount - nodes[_sponsor].matchEarn
            : leftAmount - nodes[_sponsor].matchEarn;

        // Populate the EarningsData struct
        EarningsData memory earnings = EarningsData({
            directEraning: nodes[_sponsor].directEarn,
            matchEarning: nodes[_sponsor].matchEarn,
            totalEarning: totalEarn,
            matchReaming: matchRemaining,
            leftTotal: leftAmount,
            rightTotal: rightAmount,
            leftSize: leftUsers.length,
            rightSize: rightUsers.length,
            airdopAmount: (nodes[_sponsor].left == address(0) &&
                nodes[_sponsor].right == address(0))
                ? 0
                : airdopAmount
        });

        return earnings;
    }

    function getAllChildNodesWithData(
        address _sponsor
    )
        public
        view
        returns (User[] memory leftChildren, User[] memory rightChildren)
    {
        // Get the child addresses using getAllChildNodes
        (
            address[] memory leftResult,
            address[] memory rightResult
        ) = getAllChildNodes(_sponsor);

        // Initialize arrays with the exact sizes
        User[] memory leftChildData = new User[](leftResult.length);
        User[] memory rightChildData = new User[](rightResult.length);

        // Populate left child data
        for (uint256 i = 0; i < leftResult.length; i++) {
            if (nodes[leftResult[i]].exists) {
                leftChildData[i] = userData[leftResult[i]];
            }
        }

        // Populate right child data
        for (uint256 i = 0; i < rightResult.length; i++) {
            if (nodes[rightResult[i]].exists) {
                rightChildData[i] = userData[rightResult[i]];
            }
        }

        return (leftChildData, rightChildData);
    }

    // function _getAllChildNodesRecursive(
    //     address _node,
    //     address[] memory left,
    //     address[] memory right,
    //     uint256 leftIndex,
    //     uint256 rightIndex
    // ) internal view returns (uint256, uint256) {
    //     (address leftChild, address rightChild) = getChildNodes(_node);

    //     if (leftChild != address(0)) {
    //         left[leftIndex] = leftChild;
    //         leftIndex++;
    //         (leftIndex, rightIndex) = _getAllChildNodesRecursive(
    //             leftChild,
    //             left,
    //             right,
    //             leftIndex,
    //             rightIndex
    //         );
    //     }

    //     if (rightChild != address(0)) {
    //         right[rightIndex] = rightChild;
    //         rightIndex++;
    //         (leftIndex, rightIndex) = _getAllChildNodesRecursive(
    //             rightChild,
    //             left,
    //             right,
    //             leftIndex,
    //             rightIndex
    //         );
    //     }

    //     return (leftIndex, rightIndex);
    // }

    function getJoiningDays(address _user) public view returns (uint256) {
        require(nodes[_user].exists, "User does not exist");

        uint256 joiningTime = nodes[_user].joiningTime;
        uint256 currentTime = block.timestamp;

        // Calculate the total days since joining
        uint256 totalDays = (currentTime - joiningTime) / secondsInADay;

        return totalDays;
    }

    function AB() public {
        joinUser(
            root,
            0x84F107B9636F43c22FF386de02F8C2c8a6A8769f,
            "A",
            "a@gmail.com",
            "1234567890"
        );
        joinUser(
            root,
            0xCd176a1aefe631905696897944e905ea96cfec6C,
            "B",
            "b@gmail.com",
            "1234567891"
        );
    }

    function C() public {
        joinUser(
            root,
            0x5c4B3fC5B79c6cfeD886bc8BD0b6Fd72DA4165CF,
            "C",
            "c@gmail.com",
            "1234567892"
        );
    }

    function D() public {
        joinUser(
            root,
            0xc8671f6A08F6e64047f2F9164E316F065780ce91,
            "D",
            "d@gmail.com",
            "1234567893"
        );
    }

    function E() public {
        joinUser(
            root,
            0x617F2E2fD72FD9D5503197092aC168c91465E7f2,
            "E",
            "e@gmail.com",
            "1234567894"
        );
    }
}
