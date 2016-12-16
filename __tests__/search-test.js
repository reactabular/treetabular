import { multipleColumns } from 'searchtabular';
import { search } from '../src';

describe('tree.search', function () {
  it('returns empty rows if empty rows are passed', function () {
    expect(search({
      operation: multipleColumns({
        columns: [],
        query: {}
      })
    })([])).toEqual([]);
  });

  it('returns matching rows', function () {
    const given = [
      {
        foo: 'bar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'bar'
    };

    expect(
      search({
        operation: multipleColumns({ columns, query })
      })(given)
    ).toEqual(given);
  });

  it('matches children', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'zoo'
    };

    expect(search({
      operation: multipleColumns({ columns, query })
    })(given)).toEqual(given);
  });

  it('matches multiple children', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      foo: 'zoo'
    };

    expect(search({
      operation: multipleColumns({ columns, query })
    })(given)).toEqual(given);
  });

  it('returns the same structure with an empty query', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {};

    expect(search({
      operation: multipleColumns({ columns, query })
    })(given)).toEqual(given);
  });

  it('returns the same structure with an empty all query', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 0,
        foo: 'zoo'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      all: ''
    };

    expect(search({
      operation: multipleColumns({ columns, query })
    })(given)).toEqual(given);
  });

  it('retains children on match', function () {
    const given = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];
    const columns = [
      {
        property: 'foo'
      }
    ];
    const query = {
      all: 'zoo'
    };
    const expected = [
      {
        _index: 0,
        id: 0,
        foo: 'bar'
      },
      {
        _index: 1,
        id: 1,
        parent: 0,
        foo: 'zoo'
      },
      {
        _index: 2,
        id: 2,
        parent: 1,
        foo: 'barbar'
      }
    ];

    expect(search({
      operation: multipleColumns({ columns, query })
    })(given)).toEqual(expected);
  });

  /* TODO: test idField/parentField */

  it('throws an error if operation is not passed', function () {
    expect(search.bind(null, {})).toThrow(Error);
  });
});
