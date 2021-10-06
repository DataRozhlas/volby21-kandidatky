import { forceCenter } from "d3-force";
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
    .force("charge", d3.forceManyBody().distanceMax(0))
    .force(
      "collision",
      d3.forceCollide().radius((d) => ((d.pocet / 2) * Math.PI) / 2.5)
    )
    .force("center", forceCenter())
    .stop();

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("id", "graf");

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => ((d.pocet / 2) * Math.PI) / 5)
    .attr("fill", "none");

  simulation.tick(300);

  // update node positions
  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

  nodes.forEach((n) => {
    const subnodes = Array.from({ length: n.pocet }, (v, i) => {
      const obj = { id: i };
      return obj;
    });

    const subsimulation = d3
      .forceSimulation(subnodes)
      .force("charge", d3.forceManyBody().strength(-5))
      .force("collision", d3.forceCollide().radius(3))
      .force("x", d3.forceX(n.x))
      .force("y", d3.forceY(n.y));

    //      .force("center", forceCenter(n.x, n.y));

    const subnode = svg
      .append("g")
      .selectAll("circle")
      .data(subnodes)
      .join("circle")
      .attr("r", 3)
      .attr("fill", "#000");

    subsimulation.on("tick", () => {
      subnode.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  });
  return {
    destroy: () => {
      return simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
};

export default GrafGenerator;
