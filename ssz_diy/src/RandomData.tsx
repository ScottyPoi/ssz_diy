import { BasicListType, BasicVectorType, BitList, BitListType, BitVector, isBasicType, isBitListType, isBitVectorType, isCompositeType, isListType, isVectorType, Type } from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useState } from "react";
import { randBasic, randVector, randList } from "./components/randUint";

interface RandomDataProps{
    t: Type<any>
    setValues: Dispatch<SetStateAction<number | bigint | boolean | unknown[]>>
}

export default async function RandomData(props: RandomDataProps) {

    let values: number | bigint | boolean | unknown[] = 0;

    const t = props.t
    // const setValues = props.setValues
    if (isBasicType(t)) {
        values = (randBasic(t));
      } else if (isCompositeType(t)) {
        if (isVectorType(t)) {
          const data = randVector(t as BasicVectorType);
          const vals = isBitVectorType(t)
            ? t.tree_iterateValues(t.struct_convertToTree(data as BitVector))
            : t.tree_iterateValues(t.struct_convertToTree(data));
          values = (Array.from(vals));
        } else if (isListType(t)) {
          const data = randList(t as BasicListType | BitListType);
          const vals = isBitListType(t)
            ? t.tree_iterateValues(t.struct_convertToTree(data as BitList))
            : t.tree_iterateValues(t.struct_convertToTree(data));

          values = (Array.from(vals));
        }
      }

      return values

}