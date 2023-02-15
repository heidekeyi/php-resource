import axios from "axios";
import UtilQuery from "../utils/UtilQuery";

const error: IResult = {status: false, message: 'network errors'};
const serviceAxios = (target: string) => (api: string) => {
    target = api ? `${target}${api}` : target;
    return (path: string) => {
        path = `${target}${path}`;
        const joinId = (id: string) => `${path}/${id}`;
        const json = (formData: IObject) => JSON.stringify(formData);
        const joinQuery = (pathname: string, query ?: IObject) => `${pathname}${UtilQuery.search(query || {})}`;
        return {
            query<T = IResultQuery>(query?: IObject) {
                return new Promise<IResult<T>>(resolve => {
                    axios.get <IResult<T>>(joinQuery(path, query))
                        .then(res => resolve(res.data))
                        .catch(() => resolve(error));
                });
            },
            select<T = IObject>(id: string) {
                return new Promise<IResult<T>>(resolve => {
                    axios.get<IResult<T>>(joinId(id))
                        .then(res => resolve(res.data))
                        .catch(() => resolve(error));
                });
            },
            insert<T = string>(formData: IObject, query ?: IObject) {
                return new Promise<IResult<T>>(resolve => {
                    axios.post<IResult<T>>(joinQuery(path, query), json(formData))
                        .then(res => resolve(res.data))
                        .catch(() => resolve(error));
                });
            },
            update<T = number>(id: string, formData: IObject, query?: IObject) {
                return new Promise<IResult<T>>(resolve => {
                    axios.put<IResult<T>>(joinQuery(joinId(id), query), json(formData))
                        .then(res => resolve(res.data))
                        .catch(() => resolve(error));
                });
            },
            delete<T = number>(id: string) {
                return new Promise<IResult<T>>(resolve => {
                    axios.delete<IResult<T>>(joinId(id))
                        .then(res => resolve(res.data))
                        .catch(() => resolve(error));
                });
            },
        };
    }
}

export default serviceAxios;