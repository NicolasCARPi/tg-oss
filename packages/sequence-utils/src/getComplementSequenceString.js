import DNAComplementMap from "./DNAComplementMap";
import { merge } from "lodash";

// ac.throw([ac.string,ac.bool],arguments);
export default function getComplementSequenceString(sequence, isRna) {
  // ac.throw([ac.string],arguments);
  let complementSeqString = "";
  const complementMap = merge(
    DNAComplementMap,
    isRna ? { a: "u", A: "U" } : { a: "t", A: "T" }
  );
  for (let i = 0; i < sequence.length; i++) {
    let complementChar = complementMap[sequence[i]];
    if (!complementChar) {
      complementChar = sequence[i];
      // throw new Error('trying to get the reverse compelement of an invalid base');
    }
    complementSeqString += complementChar;
  }
  return complementSeqString;
}
