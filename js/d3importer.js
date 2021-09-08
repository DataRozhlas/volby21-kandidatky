import { tsvParse } from "d3-dsv";
import { select, event } from "d3-selection";
import {
  forceSimulation,
  forceCenter,
  forceCollide,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force";
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
  forceCenter: forceCenter,
  forceCollide: forceCollide,
};
