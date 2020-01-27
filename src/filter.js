import getParents from './get-parents';

const filterTree = ({
  fieldName,
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  if (!fieldName) {
    throw new Error('tree.filterTree - Missing fieldName!');
  }

  // build up a cache of parent ids and whether their child rows should show
  // to reduce the amount of lookups for performance
  const parentCache = {};

  return rows.filter((row, index) => {
    if (typeof row[parentField] === 'undefined' || row[parentField] === null) {
      return true;
    }

    const parentVal = parentCache[row[parentField]];
    if (parentVal === false || parentVal === true) {
      return parentVal;
    }

    const parents = getParents({ index, idField, parentField })(rows);

    // if all the rows parents are showing then we know that the row should should
    const rowShouldShow = parents.filter(
      (parent) => parent[fieldName]
    ).length === parents.length;

    parentCache[row[parentField]] = rowShouldShow;

    return rowShouldShow;
  });
};

export default filterTree;
