import { useSetAtom } from "valdres-react"
import { useSetRecoilState as useSetRecoilState_old } from "recoil"

export const useSetRecoilState = useSetAtom as typeof useSetRecoilState_old
