const Base = require('../lib');

class ECI extends Base {
  constructor(params) {
    super(params);
  }
  async deleteContainerGroup(params) {
    Object.assign(params, {
      Action: 'DeleteContainerGroup',
    });
    return await this.requestApi(params);
  }
}

module.exports = ECI;