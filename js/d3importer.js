import { tsvParse } from "d3-dsv";
import { select, selectAll, event } from "d3-selection";
import { forceSimulation, forceManyBody, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";

export default {
  tsvParse: tsvParse,
  select: select,
  forceSimulation: forceSimulation,
  forceManyBody: forceManyBody,
  forceX: forceX,
  forceY: forceY,
  event: event,
  drag: drag,
  selectAll: selectAll,
};
