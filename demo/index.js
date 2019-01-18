const ECI = require('./ECI');

const eciClient = new ECI({
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: 'https://eci.aliyuncs.com',
  version: '2018-08-08'
});
(async function () {
  try {
    const res = await eciClient.deleteContainerGroup({
      RegionId: 'cn-hangzhou',
      ContainerGroupId: 'eci-uf6fonnghi50valsr7yw',
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
})();