const Stats = require('../GlobalStats');

describe('Global Stats Model', () => {
  it('requires a count', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.count.message).toEqual('Path `count` is required.');
  });

  it('should require a mean', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.mean.message).toEqual('Path `mean` is required.');
  });

  it('should require a circumferenceMax', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.circumferenceMax.message).toEqual('Path `circumferenceMax` is required.');
  });

  it('should require a diameterMax', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.diameterMax.message).toEqual('Path `diameterMax` is required.');
  });

  it('should require a piApproximationsArray', () => {
    const stats = new Stats();
    const { errors } = stats.validateSync();

    expect(errors.piApproximationsArray.message).toEqual('Path `piApproximationsArray` is required.');
  });
});
