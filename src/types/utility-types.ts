// NumRange от 0 и до ...
export type NumRange<
  End extends number,
  Acc extends number[] = []
> = Acc['length'] extends End
  ? Acc[number]
  : NumRange<End, [...Acc, Acc['length']]>

// RangeFromTo<3, 8>; // 3 | 4 | 5 | 6 | 7
export type RangeFromTo<From extends number, To extends number> = Exclude<
  NumRange<To>,
  NumRange<From>
>

export const BASE_URL = 'https://api.github.com'
