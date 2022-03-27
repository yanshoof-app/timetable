export default function useRanges(arr: number[]) {
  const rangedArr = []

  let counter = 0
  for (let i = 0; i < arr.length; i++) {
    rangedArr[counter] = []
    rangedArr[counter].push(arr[i])
    if (arr[i + 1] == arr[i] + 1) {
      rangedArr[counter].push(arr[i + 1])
      i++
    }
    counter++
  }
  //TODO: make it actually work Like it should
  return rangedArr
}
