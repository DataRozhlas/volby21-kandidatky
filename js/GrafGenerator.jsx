import React from "react";
import d3 from "./d3Importer.js";

const GrafGenerator = (container, kulicky) => {
  const nodes = kulicky.map((d) => Object.assign({}, d));
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  // console.log(container, containerRect, height, width);

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-13))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("id", "graf");

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 9)
    .attr("fill", (d) => (d.vyb ? "#3f50b5" : "#C8C8C8"));

  simulation.on("tick", () => {
    // update node positions
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
};

export default GrafGenerator;
