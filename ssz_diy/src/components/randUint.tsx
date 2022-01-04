import { BasicListType, BasicType, BasicVectorType, BitListType, BitVectorType, BooleanType, isBigIntUintType, isBooleanType, isNumberUintType, List, UintType, Vector } from "@chainsafe/ssz";
 export default function hey() {} 
export   function randBasic(type: BasicType<any>): number | bigint | boolean {
  let numType = type as UintType<any>
  let byteLength = numType.byteLength * 8
  let num =
    isBooleanType(type)
      ? Math.random() > 0.5
      : isNumberUintType(type) 
      ? Math.abs(Math.floor(2 ** byteLength * Math.random() - 1))
      : isBigIntUintType(type)
      ? BigInt(Math.abs(Math.floor(2 ** byteLength * Math.random() - 1)))
      : 0
      return num
}

export function randVector(type: BasicVectorType<Vector<unknown>> | BitVectorType) {
  let length = type.length;
  let elementType = type.elementType
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(randBasic(elementType));
  }
  return array
}

export function randList(type: BasicListType<List<unknown>> | BitListType) {
    let limit = type.limit;
    let length = Math.ceil(Math.random() * limit);
    let elementType = type.elementType;
    let array = [];
  for (let i = 0; i < length; i++) {
    array.push(randBasic(elementType));
  }
  return array
}
