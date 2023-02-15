import serviceAxios from "./serviceAxios";

const serviceDaily = serviceAxios('http://daily.cn')('/api');

export type IServiceDaily = ReturnType<typeof serviceDaily>;

export default serviceDaily;