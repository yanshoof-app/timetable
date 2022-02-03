import { SchoolLookup } from '../utils';
import { AMI_ASSAF_SYMBOL } from '../utils/sample-constants';
import { StringCompare } from '../utils/search/StringCompare';
import { StringCompareEntity } from '../utils/search/StringCompareEntity';

describe('Tests the typos Comparer', () => {
  it("Compars Oshri's beloved Physics teacher name with typos with her correct typed name", async () => {
    const typos = [
        'כרמית רוזנבלום',
        'כרמית רןזנבלום',
        'כרמית רוזנבלןם',
        'כרמית רןזנבלןם',
        'רזבית כורנמום'
    ]
    typos.forEach(typo => {
        let carmit = new StringCompare(typo);
        expect(carmit.compare("כרמית רוזנלבום")).toBe(true)
    });
  });

  it("Compars random two words with Oshri's beloved Physics teacher name", async () => {
    let randomTwoWords = new StringCompare("אב tc");
    expect(randomTwoWords.compare("כרמית רוזנלבום")).toBe(false)
  });

});
