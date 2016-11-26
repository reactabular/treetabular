import { collapseAll } from '../src';

describe('tree.collapseAll', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(collapseAll()([])).toEqual([]);
  });

  it('returns rows with showingChildren set false', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const expected = [
      {
        foo: 'bar',
        showingChildren: false
      }
    ];

    expect(collapseAll()(given)).toEqual(expected);
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
        [property]: false
      }
    ];

    expect(collapseAll({ property })(given)).toEqual(expected);
  });
});
