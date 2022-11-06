import { create, all } from 'mathjs';

const config = {
  number: 'number',
  precision: 64,
};
const math = create(all, config);

export default math;
