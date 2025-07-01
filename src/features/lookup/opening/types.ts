export type Opening = {
    id: number,
    name: string,
    width: string | number,
    height: string | number,
    type: OpeningType | OpeningTypeOption
}

export type OpeningType = 'DOOR' | 'WINDOW'
export type OpeningTypeOption = {id: OpeningType, name: string}