import d3 from "./d3Importer.js";
import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

const GrafGenerator = (container, kandidati, filtr, classes) => {
  const nodes = kandidati.map((d) => Object.assign({}, d));
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  let dragged = false;
  container.innerHTML = "";

  const color = () => {
    return "#9D00A0";
  };

  const tooltip = document.querySelector("#graph-tooltip");
  if (!tooltip) {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add(classes.tooltip);
    tooltipDiv.style.opacity = "0";
    tooltipDiv.id = "graph-tooltip";
    document.body.appendChild(tooltipDiv);
  }
  const div = d3.select("#graph-tooltip");

  const addTooltip = (hoverTooltip, d, x, y) => {
    div.transition().duration(200).style("opacity", 0.9);
    div
      .html(hoverTooltip(d))
      .style("left", `${x}px`)
      .style("top", `${y - 28}px`);
  };

  const removeTooltip = () => {
    div.transition().duration(200).style("opacity", 0);
  };

  const colorScale = (num) => parseInt(color().slice(1), 16);

  function onDragStart(evt) {
    viewport.plugins.pause("drag");
    simulation.alphaTarget(0.3).restart();
    this.isDown = true;
    this.eventData = evt.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onDragEnd(evt) {
    evt.stopPropagation();
    if (!evt.active) simulation.alphaTarget(0);
    this.alpha = 1;
    this.dragging = false;
    this.isOver = false;
    this.eventData = null;
    viewport.plugins.resume("drag");
  }

  function onDragMove(gfx) {
    if (gfx.dragging) {
      dragged = true;
      const newPosition = gfx.eventData.getLocalPosition(gfx.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
  const app = new PIXI.Application({
    width,
    height,
    antialias: !0,
    transparent: !0,
    resolution: 1,
  });
  container.appendChild(app.view);

  // create viewport
  const viewport = new Viewport({
    screenWidth: width,
    screenHeight: height,
    worldWidth: width * 4,
    worldHeight: height * 4,
    passiveWheel: false,

    interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  });

  app.stage.addChild(viewport);

  // activate plugins
  viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()
    .clampZoom({ minWidth: width / 4, minHeight: height / 4 });

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1)) // This adds repulsion (if it's negative) between nodes.
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force(
      "collision",
      d3
        .forceCollide()
        .radius((d) => d.radius)
        .iterations(2)
    )
    .velocityDecay(0.8);

  /*
   Implementation
   */

  nodes.forEach((node) => {
    const boundDrag = onDragMove.bind(node);
    const { j, p } = node;
    node.gfx = new PIXI.Graphics();
    node.gfx.lineStyle(1, 0xd3d3d3);
    node.gfx.beginFill(colorScale(node.id));
    node.gfx.drawCircle(0, 0, 24);
    node.gfx.endFill();
    node.gfx
      // events for click
      .on("click", (e) => {
        if (!dragged) {
          e.stopPropagation();
        }
        dragged = false;
      })
      .on("mousedown", onDragStart)
      // events for drag end
      .on("mouseup", onDragEnd)
      .on("mouseupoutside", onDragEnd)
      // events for drag move
      .on("mousemove", () => boundDrag(node.gfx));

    viewport.addChild(node.gfx);

    node.gfx.interactive = true;
    node.gfx.buttonMode = true;

    // create hit area, needed for interactivity
    node.gfx.hitArea = new PIXI.Circle(0, 0, 24);

    // show tooltip when mouse is over node
    node.gfx.on("mouseover", (mouseData) => {
      addTooltip(
        nodeHoverTooltip,
        { p },
        mouseData.data.originalEvent.pageX,
        mouseData.data.originalEvent.pageY
      );
    });

    // make circle half-transparent when mouse leaves
    node.gfx.on("mouseout", () => {
      removeTooltip();
    });

    const text = new PIXI.Text(name, {
      fontSize: 12,
      fill: "#000",
    });
    text.anchor.set(0.5);
    text.resolution = 2;
    node.gfx.addChild(text);
  });

  const ticked = () => {
    nodes.forEach((node) => {
      let { x, y, gfx } = node;
      gfx.position = new PIXI.Point(x, y);
    });
  };

  // Listen for tick events to render the nodes as they update in your Canvas or SVG.
  simulation.on("tick", ticked);
  return {
    destroy: () => {
      simulation.stop();
      nodes.forEach((node) => {
        node.gfx.clear();
      });
    },
  };
};

export default GrafGenerator;
