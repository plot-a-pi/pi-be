const DataPoint = require('../GlobalData');

describe('DataPoint Model', () => {
  it('requires a cicumference', () => {
    const dataPoint = new DataPoint();
    const { errors } = dataPoint.validateSync();

    expect(errors.circumference.message).toEqual('Path `circumference` is required.');
  });

  it('requires a diameter', () => {
    const dataPoint = new DataPoint();
    const { errors } = dataPoint.validateSync();

    expect(errors.diameter.message).toEqual('Path `diameter` is required.');
  });

  it('requires a circumferenceUnit', () => {
    const dataPoint = new DataPoint();
    const { errors } = dataPoint.validateSync();

    expect(errors.circumferenceUnit.message).toEqual('Path `circumferenceUnit` is required.');
  });

  it('requires a diameterUnit', () => {
    const dataPoint = new DataPoint();
    const { errors } = dataPoint.validateSync();

    expect(errors.diameterUnit.message).toEqual('Path `diameterUnit` is required.');
  });

  it('should require an enum for circumference unit', () => {
    const dataPoint = new DataPoint({ circumferenceUnit: 'notAUnit' });
    const { errors } = dataPoint.validateSync();

    expect(errors.circumferenceUnit.message).toEqual('`notAUnit` is not a valid enum value for path `circumferenceUnit`.');
  });

  it('should require an enum for diameterUnit', () => {
    const dataPoint = new DataPoint({ diameterUnit: 'notAUnit' });
    const { errors } = dataPoint.validateSync();

    expect(errors.diameterUnit.message).toEqual('`notAUnit` is not a valid enum value for path `diameterUnit`.');
  });
});
