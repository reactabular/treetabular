import { uniq } from 'lodash';
import getChildren from './get-children';
import getParents from './get-parents';

function searchTree({
  idField = 'id',
  parentField = 'parent',
  operation
} = {}) {
  if (!operation) {
    throw new Error('tree.search - Missing operation!');
  }

  return (rows) => {
    // Track fetched parents to get them into the results only once
    const fetchedParents = {};

    return uniq([].concat(
      ...operation(rows).map((row) => {
        const rowParent = row[parentField];

        if (fetchedParents[rowParent]) {
          return row;
        }

        fetchedParents[rowParent] = true;

        const children = getChildren({ index: row._index, idField, parentField })(rows);
        const parents = getParents({ index: row._index, parentField })(rows);

        return parents.concat(row).concat(children);
      }).filter(a => a)
    ));
  };
}

export default searchTree;
