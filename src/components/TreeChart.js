import React, { useEffect, useState } from "react";

const data = [
  {
    name: "Root",
    children: [
      {
        name: "A0",
        children: [
          { name: "A00", children: [{ name: "A000" }, { name: "A001" }] },
          { name: "A01" },
        ],
      },
      {
        name: "B0",
        children: [
          { name: "B10", children: [{ name: "B000" }, { name: "B001" }] },
          { name: "B11" },
        ],
      },
      {
        name: "C0",
        children: [{ name: "C20" }, { name: "C21" }],
      },
      {
        name: "D0",
        children: [{ name: "D30" }, { name: "D31" }],
      },
    ],
  },
];

const TreeChart = () => {
  const [count, setCount] = useState(6);
  const [tree, setTree] = useState([
    {
      id: 1,
      children: [
        {
          id: 2,
          children: [],
        },
        {
          id: 3,
          children: [
            {
              id: 4,
              children: [],
            },
            {
              id: 5,
              children: [],
            },
          ],
        },
      ],
    },
  ]);

  // Function to add children to a node
  const addChild = (node) => {
    // const newNode = { id: Date.now(), children: [] };
    const newNode = { id: count, children: [] };
    setCount(count + 1);
    node.children.push(newNode);
    setTree([...tree]); // Use spread operator to update the state
  };

  const treeRendering = (node) => {
    return (
      <>
        <div className="tree">
          {/* Render the node passed as a parameter */}
          <ul key={node.id}>
            {node.map((child) => (
              <li key={child.id} className={child.text + child.id}>
                <div onClick={() => addChild(child)}>{child.id}</div>
                {child.children && child.children.length
                  ? treeRendering(child.children)
                  : null}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  return (
    <div className="tree" style={{ width: "max-content" }}>
      {treeRendering(tree)}
    </div>
  );
};

export default TreeChart;
