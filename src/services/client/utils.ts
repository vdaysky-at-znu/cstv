export function notEmptyOrDefault<Val, Def>(data: Val[], def: Def): Val[] | Def  {
    return data.length == 0 ? def : data
}