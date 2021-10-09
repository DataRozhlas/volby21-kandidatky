import d3 from "./d3Importer.js";

const GrafGenerator = (container, kulicky, isMobile) => {
  //console.log(kulicky);
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  //console.log(container, containerRect, height, width);

  if (kulicky.length > 1) {
    // rozděl kuličky na obarvené podle strany a ostatní
    const kulickyUrcene = kulicky.filter((k) => k.vstrana !== 0);
    const kulickyOstatni = kulicky.filter((k) => k.vstrana === 0);

    const nodes = kulickyUrcene.map((d) => Object.assign({}, d));
    const nodesOstatni = kulickyOstatni.map((d) => Object.assign({}, d));

    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force(
        "collision",
        d3
          .forceCollide()
          .radius(
            (d) =>
              Math.sqrt(d.pocet * 100) -
              (d.pocet < 150 ? d.pocet / 2 : d.pocet / 6)
          )
      )
      .force("charge", d3.forceManyBody().strength(2)) //.distanceMax(200)) //-200 100
      .stop();

    const svg1 = d3
      .select(container)
      .append("svg")
      .attr("width", isMobile ? width : width / 2)
      .attr("height", isMobile ? height / 2 : height)
      .attr(
        "viewBox",
        isMobile
          ? [-width / 2, -height / 4, width, height / 2]
          : [-width / 4, -height / 2, width / 2, height]
      )
      .attr("class", "graf");

    const node1 = svg1
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => ((d.pocet / 2) * Math.PI) / 5)
      .attr("fill", "none");

    simulation.tick(300);

    // update node positions
    node1.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    nodes.forEach((n) => {
      //console.log(n);
      const subnodes = Array.from({ length: n.pocet }, (v, i) => {
        const obj = { id: i, barva: n.barva };
        return obj;
      });

      const subsimulation = d3
        .forceSimulation(subnodes)
        .force("x", d3.forceX(n.x))
        .force("y", d3.forceY(n.y))
        .force("charge", d3.forceManyBody().strength(-3));

      const subnode = svg1
        .append("g")
        .selectAll("circle")
        .data(subnodes)
        .join("circle")
        .attr("r", 4)
        .attr("class", `kand ${n.vstrana}`)
        .attr("fill", (d) => d.barva);

      subsimulation.on("tick", () => {
        subnode.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });
    });

    // generuj druhý graf

    const nodes2 = Array.from({ length: nodesOstatni[0].pocet }, (v, i) => {
      const obj = { id: i, barva: nodesOstatni[0].barva };
      return obj;
    });

    const simulation2 = d3
      .forceSimulation(nodes2)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("charge", d3.forceManyBody().strength(-3));
    const svg2 = d3
      .select(container)
      .append("svg")
      .attr("width", isMobile ? width : width / 2)
      .attr("height", isMobile ? height / 2 : height)
      .attr(
        "viewBox",
        isMobile
          ? [-width / 2, -height / 4, width, height / 2]
          : [-width / 4, -height / 2, width / 2, height]
      )
      .attr("class", "graf");

    const node2 = svg2
      .append("g")
      .selectAll("circle")
      .data(nodes2)
      .join("circle")
      .attr("r", 4)
      .attr("class", `kand ${nodesOstatni[0].vstrana}`)
      .attr("fill", (d) => d.barva);

    simulation2.on("tick", () => {
      node2.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  } else if (kulicky.length === 1) {
    const nodes = Array.from({ length: kulicky[0].pocet }, (v, i) => {
      const obj = {
        id: i,
        barva: kulicky[0].barva,
        vstrana: kulicky[0].vstrana,
      };
      return obj;
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("charge", d3.forceManyBody().strength(-3));
    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("class", "graf");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 4)
      .attr("class", (d) => `kand ${d.vstrana}`)
      .attr("fill", (d) => d.barva);

    simulation.on("tick", () => {
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }

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
