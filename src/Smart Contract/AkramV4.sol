// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BinaryTree {
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
        uint256 last24HoursEarning;
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
        uint256 totalSponserCount;
    }

    struct User {
        uint256 amount;
        string name;
        string email;
        string mobile;
        address sponsorId;
        uint256 createdAt;
    }

    struct Earn {
        uint256 matchEarn;
        uint256 directEarn;
        uint256 totalEarn;
    }

    // Store sponsor earning details
    mapping(address => Earn) private userEarning;

    // Store node information
    mapping(address => TreeNode) public nodes;

    // Store join history for each sponsor
    mapping(address => User[]) private sponsorCount;

    // Left and right subtree mappings
    mapping(address => User[]) private leftTree;
    mapping(address => User[]) private rightTree;

    address public root;
    uint256 public totalSize;
    uint256 public airdopAmount = 500;
    uint256 public joiningAmount = 15e6;
    uint256 public joiningTimeCap = 120; // 60 seconds (1 minutes)
    uint256 public secondsInADay = 300;
    uint256 public directRewardInTime = 12e6; // $12 reward
    uint256 public directRewardOutTime = 6e6; // $6 reward

    constructor() {
        // Initialize the root node
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
            totalSponserCount: 0
        });
    }

    function getSponsorCount(address userId)
        public
        view
        returns (User[] memory)
    {
        return sponsorCount[userId];
    }

    // Function to join a new user into the binary tree
    function joinUser(
        address _sponsor,
        address _newNode,
        string memory _name,
        string memory _email,
        string memory _mobile
    ) public {
        require(!nodes[_newNode].exists, "User already exist");

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

        // Reward the sponsor if the join happens within the time cap
        if (sponsorSize > 0 && sponsorSize % 2 == 1) {
            uint256 lastJoinTime = sponsorCount[_sponsor][sponsorSize - 1]
                .createdAt;
            if (block.timestamp <= lastJoinTime + joiningTimeCap) {
                // Add $10 reward to sponsor
                userEarning[_sponsor].directEarn += directRewardInTime;
                userEarning[_sponsor].totalEarn += directRewardInTime;
            } else {
                // Add $10 reward to sponsor
                userEarning[_sponsor].directEarn += directRewardOutTime;
                userEarning[_sponsor].totalEarn += directRewardOutTime;
            }
        }

        bool isLeft = sponsorSize % 2 == 0;
        address _parentNode = findLastNode(_sponsor, isLeft);
        require(nodes[_parentNode].exists, "Parent node does not exist");

        // Determine the position (left or right) and check if it's empty
        if (isLeft) {
            require(
                nodes[_parentNode].left == address(0),
                "Left child already exists"
            );
            nodes[_parentNode].left = _newNode;
            leftTree[_sponsor].push(newUser);
        } else {
            require(
                nodes[_parentNode].right == address(0),
                "Right child already exists"
            );
            nodes[_parentNode].right = _newNode;
            rightTree[_sponsor].push(newUser);
        }

        // Update sponsor's last join time
        nodes[_sponsor].lastSponsorTime = block.timestamp;

        // Initialize the new node
        nodes[_newNode] = TreeNode({
            left: address(0),
            right: address(0),
            exists: true,
            joiningTime: block.timestamp,
            lastSponsorTime: 0,
            name: _name,
            email: _email,
            mobile: _mobile,
            totalSponserCount: nodes[_newNode].totalSponserCount + 1
        });

        totalSize++;
    }

    // Function to find the last node in the binary tree
    function findLastNode(address _sponsor, bool isLeft)
        public
        view
        returns (address)
    {
        if (isLeft) {
            if ((nodes[_sponsor].left) == address(0)) {
                return _sponsor; // Return the current node if the left child is empty
            } else {
                return findLastNode(nodes[_sponsor].left, true);
            }
        } else {
            if (nodes[_sponsor].right == address(0)) {
                return _sponsor; // Return the current node if the right child is empty
            } else {
                return findLastNode(nodes[_sponsor].right, false);
            }
        }
    }

    // Function to get the sponsor's join history
    function getSponsorHistory(address _sponsor)
        public
        view
        returns (User[] memory)
    {
        return sponsorCount[_sponsor];
    }

    function getMatchingData(User[] memory leftUsers, User[] memory rightUsers)
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        uint256 currentTime = block.timestamp;
        uint256 leftAmount;
        uint256 rightAmount;
        uint256 recentEarning;

        // Calculate the total amount in the left tree and recent earnings (last secondsInADay seconds)
        for (uint256 i = 0; i < leftUsers.length; i++) {
            leftAmount += leftUsers[i].amount;
            // Check if the user joined within the last secondsInADay seconds
            if (currentTime - leftUsers[i].createdAt <= secondsInADay) {
                recentEarning += leftUsers[i].amount;
            }
        }

        // Calculate the total amount in the right tree and recent earnings (last secondsInADay seconds)
        for (uint256 j = 0; j < rightUsers.length; j++) {
            rightAmount += rightUsers[j].amount;
            // Check if the user joined within the last secondsInADay seconds
            if (currentTime - rightUsers[j].createdAt <= secondsInADay) {
                recentEarning += rightUsers[j].amount;
            }
        }

        return (leftAmount, rightAmount, recentEarning);
    }

    function getSponsorEarnings(address _sponsor)
        public
        view
        returns (EarningsData memory)
    {
        // Fetch the sponsor's earnings from the userEarning mapping
        Earn memory uEarning = userEarning[_sponsor];

        // Get the list of users under left and right trees
        User[] memory leftUsers = leftTree[_sponsor];
        User[] memory rightUsers = rightTree[_sponsor];

        // Initialize totals
        uint256 leftAmount = 0;
        uint256 rightAmount = 0;
        uint256 recentEarning = 0;

        (leftAmount, rightAmount, recentEarning) = getMatchingData(
            leftUsers,
            rightUsers
        );

        // Calculate the total earnings
        uint256 totalEarn = uEarning.directEarn + uEarning.matchEarn;

        // Calculate the match remaining (difference between left and right amounts)
        uint256 matchRemaining = (leftAmount > rightAmount)
            ? rightAmount - uEarning.matchEarn
            : leftAmount - uEarning.matchEarn;

        // Populate the EarningsData struct
        EarningsData memory earnings = EarningsData({
            directEraning: uEarning.directEarn,
            matchEarning: uEarning.matchEarn,
            totalEarning: totalEarn,
            matchReaming: matchRemaining,
            leftTotal: leftAmount,
            rightTotal: rightAmount,
            leftSize: leftUsers.length,
            rightSize: rightUsers.length,
            last24HoursEarning: recentEarning,
            airdopAmount: getSponsorCount(_sponsor).length > 0
                ? airdopAmount
                : 0
        });

        return earnings;
    }

    function getLeftRightTree(address _sponsor)
        public
        view
        returns (User[] memory, User[] memory)
    {
        return (leftTree[_sponsor], rightTree[_sponsor]);
    }

    function ClaimMatchingReward(address _sponsor) public {
        // Initialize totals
        uint256 leftAmount = 0;
        uint256 rightAmount = 0;

        // Get the list of users under left and right trees
        User[] memory leftUsers = leftTree[_sponsor];
        User[] memory rightUsers = rightTree[_sponsor];

        // Fetch the sponsor's earnings from the userEarning mapping
        Earn memory uEarning = userEarning[_sponsor];

        (leftAmount, rightAmount, ) = getMatchingData(leftUsers, rightUsers);

        // Calculate the match remaining (difference between left and right amounts)
        uint256 matchRemaining = (leftAmount > rightAmount)
            ? rightAmount - uEarning.matchEarn
            : leftAmount - uEarning.matchEarn;

        // Fetch the sponsor's earnings from the userEarning mapping
        userEarning[_sponsor].matchEarn += matchRemaining;
    }

    function TestJoiners() public {
        joinUser(
            root,
            0x84F107B9636F43c22FF386de02F8C2c8a6A8769f,
            "A 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
        joinUser(
            root,
            0xCd176a1aefe631905696897944e905ea96cfec6C,
            "B 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
        joinUser(
            root,
            0x5c4B3fC5B79c6cfeD886bc8BD0b6Fd72DA4165CF,
            "C 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
        joinUser(
            root,
            0xc8671f6A08F6e64047f2F9164E316F065780ce91,
            "D 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
        joinUser(
            root,
            0x617F2E2fD72FD9D5503197092aC168c91465E7f2,
            "E 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
        joinUser(
            root,
            0xA5aE14656C35Cf553cEaa9207f8507ce591fcb59,
            "F 4 Apple",
            "a@gmail.com",
            "8955562054"
        );
    }
}

/* 
0x84F107B9636F43c22FF386de02F8C2c8a6A8769f
0xCd176a1aefe631905696897944e905ea96cfec6C
0x5c4B3fC5B79c6cfeD886bc8BD0b6Fd72DA4165CF
0xc8671f6A08F6e64047f2F9164E316F065780ce91
0x617F2E2fD72FD9D5503197092aC168c91465E7f2
0xA5aE14656C35Cf553cEaa9207f8507ce591fcb59
*/
