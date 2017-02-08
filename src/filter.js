import getParents from './get-parents';

const filterTree = ({
  fieldName,
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  if (!fieldName) {
    throw new Error('tree.filterTree - Missing fieldName!');
  }

  return rows.filter((row, index) => {
    if (typeof row[parentField] === 'undefined' || row[parentField] === null) {
      return true;
    }

    const parents = getParents({ index, idField, parentField })(rows);

    return parents.filter(
      parent => parent[fieldName]
    ).length === parents.length;
  });
};

export default filterTree;
