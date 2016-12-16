import { sorter } from 'sortabular';
import { orderBy } from 'lodash';
import { wrap } from '../src';

describe('tree.wrap', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(wrap({
      operations: [
        sorter({
          columns: [],
          sortingColumns: {},
          sort: orderBy
        })
      ]
    })([])).toEqual([]);
  });

  it('returns sorted rows', function () {
    const given = [
      {
        foo: 'zoo'
      },
      {
        foo: 'bar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const expected = [
      {
        foo: 'bar'
      },
      {
        foo: 'zoo'
      }
    ];

    expect(wrap({
      operations: [
        sorter({
          columns,
          sortingColumns,
          sort: orderBy
        })
      ]
    })(given)).toEqual(expected);
  });

  it('accepts custom id', function () {
    const given = [
      {
        foo: 'zoo',
        Id: 0
      },
      {
        foo: 'bar',
        Id: 1
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const sortingColumns = {
      0: {
        direction: 'asc',
        position: 0
      }
    };
    const expected = [
      {
        foo: 'bar',
        Id: 1
      },
      {
        foo: 'zoo',
        Id: 0
      }
    ];

    expect(wrap({
      idField: 'Id',
      operations: [
        sorter({
          columns,
          sortingColumns,
          sort: orderBy
        })
      ]
    })(given)).toEqual(expected);
  });

  it('throws an error if operations are not passed', function () {
    expect(wrap.bind(null, {})).toThrow(Error);
  });
});
