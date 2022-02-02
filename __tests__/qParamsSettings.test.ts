import { IScheduleSettings } from '../interfaces';
import { InputError } from '../interfaces/errors';
import { QueryParams, QueryParamsSettings } from '../utils';
import { SETTINGS } from '../utils/sample-constants';

describe('Tests the QueryParamsSettings class', () => {
  const { showOthersChanges, studyGroups, studyGroupMap } = SETTINGS;
  const input: QueryParams = {
    showOthersChanges: showOthersChanges ? 'true' : 'false',
    studyGroups: studyGroups.map(sg => sg.join(':')).join(','),
    studyGroupMap: Array.from(studyGroupMap.keys())
      .map(key => `${key.replace(',', '/')}:${studyGroupMap.get(key)!}`)
      .join(','),
  };


  it('Enters a valid input', () => {
    const result: IScheduleSettings = new QueryParamsSettings(input)
    expect(result).toMatchObject<IScheduleSettings>(SETTINGS);
    console.log(input);
  });

  it('Gets a failing showOthersChanges', () => {
    expect(() => {
      new QueryParamsSettings({ ...input, showOthersChanges: 'ture' });
    }).toThrowError(InputError);
  });

  it('Gets a failing study group array', () => {
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroups: input.studyGroups + ',subjecteacher',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroups: input.studyGroups + ',subject::teacher',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroups: input.studyGroups + ',subject:teacher:another',
      });
    }).toThrowError(InputError);
  });

  it('Gets a failing study group map', () => {
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',0',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',0/0',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',-1/0:-1',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',0/83:-1',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',0/0:-2',
      });
    }).toThrowError(InputError);
    expect(() => {
      new QueryParamsSettings({
        ...input,
        studyGroupMap: input.studyGroupMap + ',0/1:-1',
      });
    }).toThrowError(InputError);
  });
});
