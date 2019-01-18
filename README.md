# aliyun-base-api
a base aliyun api

### npm install aliyun-base-api --save

### how to use 
 you can extend the base class create your aliyun class, like demo

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