/* holds an array of sets of word characters */
export class StringCompareEntity {
  public static compareSets(set1: Set<string>, set2: Set<string>) {
    const commonSet = new Set([...set1, ...set2]);
    return commonSet.size / Math.max(set1.size, set2.size);
  }

  readonly words: Set<string>[];
  readonly length: number;

  constructor(str: string) {
    this.length = str.length;
    this.words = [];
    for (let word of str.split(' ')) {
      this.words.push(new Set(Array.from(word)));
    }
  }

  /**
   * Compares two strings together in our desired comparison algorithm, return percentage of similatiry
   * @param other the string compare entity to compare to
   */
  public similarity(other: StringCompareEntity): number {
    const INDEX_UNAVILABLE = -1;
    let similarityPoints = 0,
      mostMatchingIndex = 0,
      currentPoints = 0;
    const indexesAvailableInOther = [...Array(other.words.length).keys()];
    for (let charSet of this.words) {
      [currentPoints, mostMatchingIndex] = indexesAvailableInOther.reduce(
        ([prevPts, prevIdx], index) => {
          if (indexesAvailableInOther[index] != INDEX_UNAVILABLE) {
            const similarity = StringCompareEntity.compareSets(
              charSet,
              other.words[index]
            );
            if (similarity > prevPts) return [similarity, index];
          }
          return [prevPts, prevIdx];
        },
        [0, 0]
      );
      indexesAvailableInOther[mostMatchingIndex] = INDEX_UNAVILABLE;
      similarityPoints += currentPoints * charSet.size;
    }
    return similarityPoints / this.length;
  }
}
