import { isVectorType, isListType, isUintType, UintType, isUnionType, isBitVectorType, isBitListType, Type, BasicType, BigIntUintType, BooleanType, CompositeType, NumberUintType, BasicListType, BasicVectorType, BitListType, BitVectorType, isBooleanType, Number64UintType, UnionType } from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UnionObject } from "../RandomData";
import SetElementType from "./SetElementType";
import SetLength from "./setLength";
import { SetLimit } from "./SetLimit";
import Union from "./Union";


interface TypeOptionsProps{
    unionTypeNames: string[]
    setUnionTypeNames: Dispatch<SetStateAction<string[]>>
    typeName: string
    setTypeName: Dispatch<SetStateAction<string>>
    elementType: Type<unknown>
    setEType: Dispatch<SetStateAction<Type<unknown>>>
    vectorLen: number
    setVectorLen: Dispatch<SetStateAction<number>>
    listLimit: number
    setListLimit: Dispatch<SetStateAction<number>>
    setShowInfo: Dispatch<SetStateAction<JSX.Element>>
    typeSelect: Type<unknown>
    setTypeSelect: Dispatch<SetStateAction<Type<unknown>>>
    
}

export default function TypeOptions(props: TypeOptionsProps) {

    const [unionTypes, setUnionTypes] = useState<Type<any>[]>([new BigIntUintType({byteLength: 32})])
  const [unionTypeNames, setUnionTypeNames] = [props.unionTypeNames, props.setUnionTypeNames]
  
  const typeName = props.typeName
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [elementType, setEType] = [props.elementType, props.setEType]
  const [vectorLen, setVectorLen] = [props.vectorLen, props.setVectorLen]
  const [listLimit, setListLimit] = [props.listLimit, props.setListLimit]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setShowInfo = props.setShowInfo
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typeSelect, setTypeSelect] = [props.typeSelect, props.setTypeSelect]

  
  async function getTypeSelect() {
    return typeSelect;
  }
  async function getTypeName() {
    return typeName;
  }
  async function getEType() {
    return elementType;
  }



    return (
        <div className="row">
                {isVectorType(props.typeSelect) && (
                  <SetLength
                    setVectorLen={setVectorLen}
                    currentLen={vectorLen}
                  />
                )}
                {/* {isListType(typeSelect) && <>Set Limit: {listLimit}</>} */}
                {isListType(typeSelect) && (
                  <SetLimit
                    perChunk={
                      isUintType(typeSelect.elementType)
                        ? 32 /
                          (typeSelect.elementType as UintType<unknown>)
                            .byteLength
                        : 256
                    }
                    setLimit={setListLimit}
                    curLimit={listLimit}
                  />
                )}
                {isUnionType(typeSelect) &&  (
                  <Union setUnion={setTypeSelect} setUnionTypes={setUnionTypes} setTypeNames={setUnionTypeNames}/>
                )}
                <div className="col border">
                  {(isVectorType(typeSelect) || isListType(typeSelect)) &&
                    !isBitVectorType(typeSelect) &&
                    !isBitListType(typeSelect) && (
                      <SetElementType setEType={setEType} />
                    )}
                </div>
              </div>
    )
}