## treetabular

3.1.0 / 2017-02-09
==================

  * Feature - Expose `tree.toggleChildren` indexing through a `getIndex` callback. It looks into `rowData._index` by default.

3.0.1 / 2017-02-09
==================

  * Fix - Make sure `tree.hasChildren` does not crash if `index` is negative.

3.0.0 / 2017-02-09
==================

  * Breaking fix - Allow children that have sub-children to be displayed. #4
  * Fix - Allow `tree.hasChildren` to receive `parentField`. #4

2.1.0 / 2017-02-06
==================

  * Feature - Add `tree.fixOrder` - If children in your rows don't follow their parents you can use that helper method so they will be moved into right place. #2

2.0.2 / 2017-02-03
==================

  * Docs - Improve intro.

2.0.1 / 2017-02-02
==================

  * Docs - Fix example column toggling.

2.0.0 / 2016-12-16
==================

  * Feature - Add `tree.wrap = ({ operations: [rows => rows], idField = 'id' }) => (rows) => [<operatedRow>]`.
  * Breaking `tree.moveRows` does not depend on *reactabular-dnd* directly anymore. Instead you have to pass the move `operation` to it. The new signature is `tree.moveRows = ({ operation: (rows) => [<row>], retain = [], idField = 'id', parentField = 'parent' }) => (rows) => [<movedRow>]`.
  * Breaking - `tree.search` does not depend on *selectabular* directly anymore. Instead you have to pass the search `operation` to it. The new signature is `tree.search = ({ operation: (rows) => [<row>], idField = 'id', parentField = 'parent' }) => (rows) => [<searchedRow>]`.
  * Breaking - `tree.sort` has been dropped. Use `tree.wrap` instead. Example:

```javascript
wrap({
  operations: [
    sorter({
      columns,
      sortingColumns,
      sort: orderBy
    })
  ]
})(rows);
```

1.0.6 / 2016-11-30
==================

  * Bug fix - Bump `reactabular-dnd` peer dependency range.

1.0.0 / 2016-11-26
==================

  * Initial re-release under a different name.
  * Bug fix - Respect `idField` properly at `tree.moveRows`.
  * Breaking - Make `tree.filter` throw if `fieldName` is not passed. Without this it would fail silently.
  * Feature - Attach `_isParent` to parents when using `tree.unpack`.
  * Bug fix - `tree.moveRows` will return the original rows now if moving fails for some reason.

---

## reactabular-tree

7.0.0 / 2016-11-03
==================

  * Bug fix - Allow `tree.toggleChildren` to work without column `props` defined.
  * Feature - Add `tree.getImmediateChildren`.
  * Feature - Add `tree.moveRows`.
  * Breaking - Refactor `tree.filter` as `({ fieldName, parentField = 'parent' }) => (rows) => filteredRows`.

6.1.1 / 2016-10-27
==================

  * Bug fix - Allow `tree.filter` `parent` to be zero.

6.1.0 / 2016-10-25
==================

  * Feature - Allow `idField` to be passed to `tree.sort`.

6.0.3 / 2016-10-19
==================

  * Bug fix - Bump peer version ranges to avoid npm warnings.

6.0.0 / 2016-10-14
==================

  * Breaking - Merge `tree.flatten` with `tree.unpack`. The new signature for `tree.unpack` is `tree.unpack = ({ parentField = 'parent', parent, idField = 'id'}) => (rows) => <unpackedRows>`.
  * Breaking - Rework API so that all functions except `tree.toggleChildren` work in curry format (`(...) => (rows) => <new rows>`). This way the API is consistent and easy to extend.
  * Breaking - Expose `childrenField` for `tree.pack` and `tree.unpack`. It defaults to `children`.
  * Breaking - Make `tree.pack` to work in a recursive manner (packs children within children).
  * Breaking - Make `tree.search` match against children as well. If children as matched, it will return parents as well.
  * Feature - Add `tree.getChildren` utilities for getting node children.

5.2.1 / 2016-09-30
==================

  * Bug fix - If `className` is not provided to `tree.toggleChildren`, do not render `undefined` as a class. Also dropped extra `console.log`.

5.2.0 / 2016-09-30
==================

  * Bug fix - Calculate `tree.getParents` correctly for root level nodes without parents. Previously that gave false positives.
  * Feature - Annotate `tree.toggleChildren` with `has-children` and `has-parent` classes. Easier to style this way.

5.1.0 / 2016-09-29
==================

  * Feature - Add `tree.flatten` to allow transforming a nested tree structure into a flat structure used by the algorithms.

4.3.0 / 2016-09-27
==================

  * Feature - Let `toggleChildren` toggle when cell is clicked. If you want the old behavior, override `onClick` through `props`.
  * Feature - Add `collapseAll` and `expandAll` helpers.

4.2.0 / 2016-09-23
==================

  * Feature - Allow `toggleChildren` to accept `props` for customization.

3.0.5 / 2016-09-02
==================

  * Feature - Allow `id` to be passed to `filter`.

3.0.4 / 2016-09-02
==================

  * Feature - Allow `toggleChildren` `id` to be customized (not just "id" anymore).

3.0.2 / 2016-09-01
==================

  * Feature - Include suggested default styling for the toggle arrow.

3.0.1 / 2016-09-01
==================

  * Bug fix - Pass `strategy` to `sorter` at `tree.sort`.

3.0.0 / 2016-09-01
==================

  * Breaking - Rewrite API. Now most parts accept objects and you can also customize field names.
  * Feature - Add `tree.sort` to wrap toggling row children.

2.0.0 / 2016-08-16
==================

  * Initial release.
