const Stats = require('../Stats');

describe('Stats model', () => {
  it('requires a circumferenceMax', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.circumferenceMax.message).toEqual('Path `circumferenceMax` is required.');
  });

  it('requires a diameterMax', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.diameterMax.message).toEqual('Path `diameterMax` is required.');
  });

  it('requires a mean', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.mean.message).toEqual('Path `mean` is required.');
  });

  it('requires a count', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.count.message).toEqual('Path `count` is required.');
  });
});
