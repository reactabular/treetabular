import { cloneDeep, reverse } from 'lodash';
import { fixOrder } from '../src';

describe('fixOrder', () => {
  it('works with empty array', () => {
    expect(fixOrder()([])).toEqual([]);
  });

  it('works with null', () => {
    expect(fixOrder()(null)).toEqual(null);
  });

  it('works with rows with no children', () => {
    const dummyRows = [
      {
        name: 'A',
        id: 1
      },
      {
        name: 'B',
        id: 2
      }
    ];

    expect(fixOrder()(dummyRows)).toEqual(dummyRows);
  });

  it('works with rows with children in right order', () => {
    const dummyRows = [
      {
        name: 'parent',
        id: 13
      },
      {
        name: 'children',
        parent: 13
      },
      {
        name: 'another one'
      }
    ];

    expect(fixOrder()(dummyRows)).toEqual(dummyRows);
  });

  it('works with simple case of wrong order', () => {
    const rowsWithWrongOrder = [
      {
        name: 'parent',
        id: 13
      },
      {
        name: 'another one'
      },
      {
        name: 'children',
        parent: 13
      }
    ];

    const expectedRows = [
      {
        name: 'parent',
        id: 13
      },
      {
        name: 'children',
        parent: 13
      },
      {
        name: 'another one'
      }
    ];

    expect(fixOrder()(rowsWithWrongOrder)).toEqual(expectedRows);
  });


  it('works when id is equal to zero', () => {
    const rowsWithWrongOrder = [
      {
        name: 'parent',
        id: 0
      },
      {
        name: 'another one'
      },
      {
        name: 'another one2'
      },
      {
        name: 'children',
        parent: 0
      }
    ];

    const expectedRows = [
      {
        name: 'parent',
        id: 0
      },
      {
        name: 'children',
        parent: 0
      },
      {
        name: 'another one'
      },
      {
        name: 'another one2'
      }
    ];

    expect(fixOrder()(rowsWithWrongOrder)).toEqual(expectedRows);
  });

  it('works when parent is set to null', () => {
    const rowsWithNullParent = [
      {
        name: 'something'
      },
      {
        id: 0
      },
      {
        name: 'invalid element',
        parent: null
      },
      {
        parent: 0
      },
      {
        name: 'valid element'
      }
    ];

    const expected = [
      {
        name: 'something'
      },
      {
        id: 0
      },
      {
        parent: 0
      },
      {
        name: 'invalid element',
        parent: null
      },
      {
        name: 'valid element'
      }
    ];

    expect(fixOrder()(rowsWithNullParent)).toEqual(expected);
  });

  it('works when id set to null', () => {
    const rowsWithIdNull = [
      {
        id: null
      },
      {
        name: 'something'
      },
      {
        id: 5
      }
    ];

    expect(fixOrder()(rowsWithIdNull)).toEqual(rowsWithIdNull);
  });

  it('works when parent id points to non existing element', () => {
    const rowsWithInvalidParentId = [
      {
        id: 2
      },
      {
        name: 'something'
      },
      {
        parent: 1
      }
    ];
    expect(fixOrder()(rowsWithInvalidParentId)).toEqual(rowsWithInvalidParentId);
  });

  it('works with multiple parents', () => {
    const rowsWithMultipleParents = [
      {
        name: 'parent1',
        id: 13
      },
      {
        name: 'something else',
        id: 1
      },
      {
        name: 'children1-1',
        parent: 13
      },
      {
        name: 'something else 2'
      },
      {
        name: 'children1-2',
        parent: 13
      },
      {
        name: 'parent2',
        id: 14
      },
      {
        name: 'something else 3'
      },
      {
        name: 'children2-1',
        parent: 14
      }
    ];

    const expected = [
      {
        name: 'parent1',
        id: 13
      },
      {
        name: 'children1-1',
        parent: 13
      },
      {
        name: 'children1-2',
        parent: 13
      },
      {
        name: 'something else',
        id: 1
      },
      {
        name: 'something else 2'
      },
      {
        name: 'parent2',
        id: 14
      },
      {
        name: 'children2-1',
        parent: 14
      },
      {
        name: 'something else 3'
      }
    ];

    expect(fixOrder()(rowsWithMultipleParents)).toEqual(expected);
  });

  it('works with nested children', () => {
    const rowsWithNestedChildren = [
      {
        name: 'something else'
      },
      {
        id: 0
      },
      {
        name: 'something else2'
      },
      {
        parent: 0,
        id: 1
      },
      {
        name: 'something else3'
      },
      {
        parent: 1
      },
      {
        name: 'something else4'
      }
    ];

    const expectedOrder = [
      {
        name: 'something else'
      },
      {
        id: 0
      },
      {
        parent: 0,
        id: 1
      },
      {
        parent: 1
      },
      {
        name: 'something else2'
      },
      {
        name: 'something else3'
      },
      {
        name: 'something else4'
      }
    ];

    expect(fixOrder()(rowsWithNestedChildren)).toEqual(expectedOrder);
  });

  it('works with complex example', () => {
    const complexRows = [
      {
        name: 'a'
      },
      {
        id: 0
      },
      {
        name: 'b'
      },
      {
        parent: 0,
        id: 1
      },
      {
        name: 'c'
      },
      {
        parent: 1,
        id: 2
      },
      {
        parent: 0
      },
      {
        name: 'd'
      },
      {
        parent: 2,
        id: 3
      },
      {
        name: 'e'
      },
      {
        name: 'f'
      },
      {
        parent: 1,
        id: 4
      },
      {
        name: 'g'
      },
      {
        parent: 4
      },
      {
        parent: 3
      }
    ];

    const expectedRows = [
      {
        name: 'a'
      },
      {
        id: 0
      },
      {
        parent: 0,
        id: 1
      },
      {
        parent: 1,
        id: 2
      },
      {
        parent: 2,
        id: 3
      },
      {
        parent: 3
      },
      {
        parent: 1,
        id: 4
      },
      {
        parent: 4
      },
      {
        parent: 0
      },
      {
        name: 'b'
      },
      {
        name: 'c'
      },

      {
        name: 'd'
      },
      {
        name: 'e'
      },
      {
        name: 'f'
      },
      {
        name: 'g'
      }
    ];

    expect(fixOrder()(complexRows)).toEqual(expectedRows);
  });

  it('allows to have custom parent and id fields', () => {
    const customFieldsRows = [
      {
        name: 'something'
      },
      {
        my_id: 0
      },
      {
        name: 'something else'
      },
      {
        parent_id: 0
      }
    ];

    const expected = [
      {
        name: 'something'
      },
      {
        my_id: 0
      },
      {
        parent_id: 0
      },
      {
        name: 'something else'
      }
    ];

    expect(fixOrder({
      idField: 'my_id',
      parentField: 'parent_id'
    })(customFieldsRows)).toEqual(expected);
  });

  it('allows to use string ids', () => {
    const stringIdsRows = [
      {
        id: 'a'
      },
      {
        name: 'something else'
      },
      {
        parent: 'a'
      }
    ];

    const expected = [
      {
        id: 'a'
      },
      {
        parent: 'a'
      },
      {
        name: 'something else'
      }
    ];

    expect(fixOrder()(stringIdsRows)).toEqual(expected);
  });

  it('does not mutate parameter', () => {
    const rowsWithWrongOrder = [
      {
        name: 'parent',
        id: 13
      },
      {
        name: 'another one'
      },
      {
        name: 'children',
        parent: 13
      }
    ];

    const memo = cloneDeep(rowsWithWrongOrder);

    fixOrder()(rowsWithWrongOrder);

    expect(rowsWithWrongOrder).toEqual(memo);
  });

  it('works with reverse case', () => {
    const reversedRows = [
      {
        parent: 3
      },
      {
        id: 3,
        parent: 2
      },
      {
        id: 2,
        parent: 1
      },
      {
        id: 1
      }
    ];

    expect(fixOrder()(reversedRows)).toEqual(reverse(reversedRows));
  });

  it('works with deep nesting', () => {
    const rows = [
      {
        id: 'D1',
        parent: 'C2'
      },
      {
        id: 'A1',
        parent: null
      },
      {
        id: 'D2',
        parent: 'C2'
      },
      {
        id: 'D3',
        parent: 'C1'
      },
      {
        id: 'D4',
        parent: 'C2'
      },
      {
        id: 'C1',
        parent: 'B1'
      },
      {
        id: 'D5',
        parent: 'C1'
      },
      {
        id: 'D6',
        parent: 'C2'
      },
      {
        id: 'C2',
        parent: 'B1'
      },
      {
        id: 'B1',
        parent: 'A1'
      }
    ];

    const expectedRows = [
      {
        id: 'A1',
        parent: null
      },
      {
        id: 'B1',
        parent: 'A1'
      },
      {
        id: 'C1',
        parent: 'B1'
      },
      {
        id: 'D3',
        parent: 'C1'
      },
      {
        id: 'D5',
        parent: 'C1'
      },
      {
        id: 'C2',
        parent: 'B1'
      },
      {
        id: 'D1',
        parent: 'C2'
      },
      {
        id: 'D2',
        parent: 'C2'
      },
      {
        id: 'D4',
        parent: 'C2'
      },
      {
        id: 'D6',
        parent: 'C2'
      }
    ];

    expect(fixOrder()(rows)).toEqual(expectedRows);
  });
});
