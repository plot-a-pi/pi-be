const Session = require('../Session');

describe('Session Model', () => {
  it('Requires a name', () => {
    const session = new Session();
    const { errors } = session.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('Requires a teacherId', () => {
    const session = new Session();
    const { errors } = session.validateSync();

    expect(errors.teacherId.message).toEqual('Path `teacherId` is required.');
  });
});
