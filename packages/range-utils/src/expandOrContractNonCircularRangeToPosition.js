import { assign } from "lodash";

export default function expandOrContractNonCircularRangeToPosition(
  range,
  position
) {
  const newRange = assign({}, range);
  let endMoved = true;
  if (range.start > position) {
    newRange.start = position;
    endMoved = false;
  } else {
    if (range.end < position) {
      newRange.end = position - 1;
    } else {
      if (position - range.start > range.end - position) {
        newRange.end = position - 1;
      } else {
        newRange.start = position;
        endMoved = false;
      }
    }
  }
  return {
    newRange: newRange,
    endMoved: endMoved
  };
}
