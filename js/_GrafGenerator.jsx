import React from "react";
import d3 from "./d3Importer.js";

const GrafGenerator = (container, kulicky, isMobile) => {
  const nodes = kulicky.map((d) => Object.assign({}, d));
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;
  //console.log(container, containerRect, height, width);

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "charge",
      d3.forceManyBody().strength(isMobile ? -width / 100 : -width / 95)
    )
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
    .attr("stroke-width", isMobile ? 1 : 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", isMobile ? width / 65 : width / 115)
    .attr("fill", (d) => d.col);

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
