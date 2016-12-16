import { compose } from 'redux';
import pack from './pack';
import unpack from './unpack';

function wrap({
  idField,
  operations
} = {}) {
  if (!operations) {
    throw new Error('tree.wrap - Missing operations!');
  }

  return compose(...[
    unpack({ idField }),
    ...operations,
    pack({ idField })
  ]);
}

export default wrap;
