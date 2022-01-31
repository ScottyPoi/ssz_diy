import {
  BasicVectorType,
  NumberUintType,
  Type,
  Vector,
  VectorType,
} from "@chainsafe/ssz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ClassLikeDeclaration } from "typescript";

type aliasList = Record<string, Type<any>>;

class Byte extends NumberUintType {
  constructor() {
    super({ byteLength: 1 });
  }
}

interface SelectTypeAliasProps {
  setTypeName: Dispatch<SetStateAction<string>>;
  typeName: string;
  setType: Dispatch<SetStateAction<Type<any>>>;
}

export default function SelectTypeAlias(props: SelectTypeAliasProps) {
  const [aliasList, setAliasList] = useState<aliasList>({
    Byte: new Byte(),
    Bytes32: new VectorType({ elementType: new Byte(), length: 32 }),
  });

  function addAlias(alias: string, type: Type<any>) {
    if (Object.keys(aliasList!).includes(alias)) {
      throw console.error(`Alias: ${alias} already in list.`);
    } else {
      let a = aliasList!;
      a[alias] = type;
    }
  }

  const menu = 
      Object.entries(aliasList).map(([alias, type], idx) => {
        return <option key={idx} value={alias}>{alias}</option>;
      })

  return (<>{menu}</>);
}
