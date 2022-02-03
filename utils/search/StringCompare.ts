import { StringCompareEntity } from './StringCompareEntity';

/**
 * Compare given strings to a specified string and find the best match
 */
export class StringCompare {
  static readonly SIMILARITY_TRESHOLD = 0.9;
  readonly target: StringCompareEntity;
  private maxSimilarity;
  private maxSimilarityInput;

  constructor(target: string) {
    this.target = new StringCompareEntity(target);
    this.maxSimilarityInput = target;
  }

  public compare(compareTo: string) {
    if (this.maxSimilarity > StringCompare.SIMILARITY_TRESHOLD) {
      // if already found input "similar enough"
      return compareTo === this.maxSimilarityInput;
    }

    // if not, create a comparison object and compare to it
    const inputCompareEntity = new StringCompareEntity(compareTo);
    const similarity = this.target.similarity(inputCompareEntity);
    if (similarity > StringCompare.SIMILARITY_TRESHOLD) {
      this.maxSimilarity = similarity;
      this.maxSimilarityInput = compareTo;
      return true;
    }
    return false;
  }
}
