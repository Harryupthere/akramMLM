// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// L.    R
// 150.  120 = 20
// 1000  1200 = 880

contract Rahul {
    struct TreeNode {
        string left;
        string right;
        bool exists;
    }
    mapping(string => TreeNode) public nodes;
    mapping(string => string[]) private directSponsors;
    string public root;

    uint256 totalSize;

    constructor() {
        root = "root";

        nodes[root] = TreeNode({left: "", right: "", exists: true});
    }

    function getDirectSponsors(
        string memory _userId
    ) public view returns (string[] memory) {
        return directSponsors[_userId];
    }

    function isTextEmpty(string memory data) public pure returns (bool) {
        if (
            keccak256(abi.encodePacked(data)) == keccak256(abi.encodePacked(""))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function joinUser(string memory _sponsor, string memory _newNode) public {
        require(!nodes[_newNode].exists, "User already exists");
        require(nodes[_sponsor].exists, "Sponsor does not exist");

        uint256 sponsorSize = directSponsors[_sponsor].length;

        bool isLeft = sponsorSize % 2 == 0;

        string memory parentNode = findParentNode(_sponsor, isLeft);
        require(!isTextEmpty(parentNode), "Parent node not found");

        if (isLeft) {
            require(
                isTextEmpty(nodes[parentNode].left),
                "Left child nodes are occupied"
            );
            nodes[parentNode].left = _newNode;
        } else {
            require(
                isTextEmpty(nodes[parentNode].right),
                "Right child nodes are occupied"
            );
            nodes[parentNode].right = _newNode;
        }

        nodes[_newNode] = TreeNode({left: "", right: "", exists: true});

        directSponsors[_sponsor].push(_newNode);

        totalSize += 1;
    }

    // Function to find the last node in the binary tree
    function findParentNode(
        string memory _sponsor,
        bool isLeft
    ) public view returns (string memory) {
        if (isLeft) {
            if ((isTextEmpty(nodes[_sponsor].left))) {
                return _sponsor; // Return the current node if the left child is empty
            } else {
                return findParentNode(nodes[_sponsor].left, true);
            }
        } else {
            if (isTextEmpty(nodes[_sponsor].right)) {
                return _sponsor; // Return the current node if the right child is empty
            } else {
                return findParentNode(nodes[_sponsor].right, false);
            }
        }
    }

    function getChildNodes(
        string memory _sponsor
    ) public view returns (string memory leftChild, string memory rightChild) {
        require(nodes[_sponsor].exists, "Sponsor does not exist");
        return (nodes[_sponsor].left, nodes[_sponsor].right);
    }

    function getAllChildNodes(
        string memory _sponsor
    )
        public
        view
        returns (string[] memory leftChildren, string[] memory rightChildren)
    {
        require(nodes[_sponsor].exists, "Sponsor does not exist");

        // Initialize dynamic arrays to store children
        string[] memory left = new string[](totalSize);
        string[] memory right = new string[](totalSize);

        // Start recursive traversal
        uint256 leftIndex = 0;
        uint256 rightIndex = 0;

        if (!isTextEmpty(nodes[_sponsor].left)) {
            (left, leftIndex) = _getAllChildNodesRecursive(
                nodes[_sponsor].left,
                left,
                leftIndex
            );
        }

        if (!isTextEmpty(nodes[_sponsor].right)) {
            (right, rightIndex) = _getAllChildNodesRecursive(
                nodes[_sponsor].right,
                right,
                rightIndex
            );
        }

        // Resize arrays to fit the number of children
        string[] memory leftResult = new string[](leftIndex);
        string[] memory rightResult = new string[](rightIndex);

        for (uint256 i = 0; i < leftIndex; i++) {
            leftResult[i] = left[i];
        }

        for (uint256 i = 0; i < rightIndex; i++) {
            rightResult[i] = right[i];
        }

        return (leftResult, rightResult);
    }

    function _getAllChildNodesRecursive(
        string memory _node,
        string[] memory children,
        uint256 index
    ) private view returns (string[] memory, uint256) {
        // Add the current node to the children array
        children[index] = _node;
        index++;

        // Recursively traverse left and right children
        if (!isTextEmpty(nodes[_node].left)) {
            (children, index) = _getAllChildNodesRecursive(
                nodes[_node].left,
                children,
                index
            );
        }

        if (!isTextEmpty(nodes[_node].right)) {
            (children, index) = _getAllChildNodesRecursive(
                nodes[_node].right,
                children,
                index
            );
        }

        return (children, index);
    }

    // function getAllChildNodes(string memory _sponsor)
    //     public
    //     view
    //     returns (string[] memory leftChildren, string[] memory rightChildren)
    // {
    //     require(nodes[_sponsor].exists, "Sponsor does not exist");

    //     string[] memory left = new string[](totalSize);
    //     string[] memory right = new string[](totalSize);

    //     uint256 leftIndex = 0;
    //     uint256 rightIndex = 0;

    //     (leftIndex, rightIndex) = _getAllChildNodesRecursive(
    //         _sponsor,
    //         left,
    //         right,
    //         leftIndex,
    //         rightIndex
    //     );

    //     // Resize arrays to match the count of children
    //     string[] memory leftResult = new string[](leftIndex);
    //     string[] memory rightResult = new string[](rightIndex);
    //     for (uint256 i = 0; i < leftIndex; i++) {
    //         leftResult[i] = left[i];
    //     }
    //     for (uint256 i = 0; i < rightIndex; i++) {
    //         rightResult[i] = right[i];
    //     }

    //     return (leftResult, rightResult);
    // }

    // function _getAllChildNodesRecursive(
    //     string memory _node,
    //     string[] memory left,
    //     string[] memory right,
    //     uint256 leftIndex,
    //     uint256 rightIndex
    // ) public  view returns (uint256, uint256) {
    //     (string memory leftChild, string memory rightChild) = getChildNodes(
    //         _node
    //     );

    //     if (!isTextEmpty(leftChild)) {
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

    //     if (!isTextEmpty(rightChild)) {
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

    function ABCD() public {
        joinUser(root, "A");
        joinUser(root, "B");
        joinUser(root, "C");
        joinUser(root, "D");
    }

    function E() public {
        joinUser(root, "E");
    }

    function F() public {
        joinUser(root, "F");
    }

    // function G() public {
    //     joinUser(root, "G");
    // }

    // function H() public {
    //     joinUser(root, "H");
    // }
    // function I() public {
    //     joinUser(root, "I");
    // }
    // function J() public {
    //     joinUser(root, "J");
    // }
}
