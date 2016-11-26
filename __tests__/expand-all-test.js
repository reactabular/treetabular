import { expandAll } from '../src';

describe('tree.expandAll', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(expandAll()([])).toEqual([]);
  });

  it('returns rows with showingChildren set true', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        showingChildren: true
      }
    ];

    expect(expandAll()(given)).toEqual(expected);
  });

  it('allows property to be customized', function () {
    const property = 'demo';
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        [property]: true
      }
    ];

    expect(expandAll({ property })(given)).toEqual(expected);
  });
});
