import _ from "lodash";

export const fieldComparator = <T>(
  path: string | string[],
  comparator: (a: any, b: any) => number = defaultComparator
) => {
  console.log('comarator')
  return (objA: T, objB: T) => {
    console.log('compare')
    const valueA = _.get(objA, path);
    const valueB = _.get(objB, path);
    return comparator(valueA, valueB);
  };
};

const defaultComparator = (a: any, b: any) => {
  console.log(a, b)
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
