import _ from 'lodash';

const fixOrder = ({
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => {
  if (_.isEmpty(rows)) {
    return rows;
  }

  // collect all IDs from rows so we can validate parent IDs
  const existingIds = rows.reduce((ids, row) => {
    if (!_.isNil(row[idField])) {
      ids.push(row[idField]);
    }
    return ids;
  }, []);

  // collect all rows which are children,
  // meaning they have "parent" property and it points to existing row
  const children = rows.filter((x) => {
    const hasParentId = !_.isNil(x[parentField]);
    const parentExists = hasParentId && _.indexOf(existingIds, x[parentField]) !== -1;
    return hasParentId && parentExists;
  });

  if (!children.length) {
    return rows;
  }

  // groups all children per parent into a object,
  // which looks like that:
  // { parent_id1 : [children of parent id1], parent_id2: [... ] }
  let childrenPerParent = _.groupBy(children, (x) => x[parentField]);

  // removes all children from rows so we can start putting them
  // into right place
  const rowsWithoutChildren = _.differenceWith(rows, children, _.isEqual);
  let childrenCount = _.keys(childrenPerParent).length;
  let prevChildrenCount;
  do {
    prevChildrenCount = childrenCount;
    childrenPerParent = attachChildren(rowsWithoutChildren, childrenPerParent, idField);
    childrenCount = _.keys(childrenPerParent).length;
  }
  while (childrenCount < prevChildrenCount);

  return rowsWithoutChildren;
};

function attachChildren(rowsWithoutChildren, childrenPerParent, idField) {
  const remainingChildrenPerParent = childrenPerParent;
  _.forOwn(childrenPerParent, (childrenFromParent, parentId) => {
    const parentPosition = _.findIndex(rowsWithoutChildren, (x) => {
      const hasId = !_.isNil(x[idField]);
      const matchesParentId = hasId && (parentId === x[idField].toString());
      return hasId && matchesParentId;
    });
    // puts children right after their parent so correct order will be kept
    if (parentPosition !== -1) {
      rowsWithoutChildren.splice(parentPosition + 1, 0, ...childrenFromParent);
      delete remainingChildrenPerParent[parentId];
    }
  });
  return remainingChildrenPerParent;
}

export default fixOrder;
