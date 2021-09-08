import { tsvParse } from "d3-dsv";
import { select } from "d3-selection";
import { forceSimulation, forceManyBody, forceX, forceY } from "d3-force";

export default {
  tsvParse: tsvParse,
  select: select,
  forceSimulation: forceSimulation,
  forceManyBody: forceManyBody,
  forceX: forceX,
  forceY: forceY,
};
