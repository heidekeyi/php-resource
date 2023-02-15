class UtilQuery {
    public static timezone = (): string => {
        return (new Date().getTimezoneOffset() * 60).toString();
    }
    public static parse = (search: string): IObject => {
        const params = new URLSearchParams(search);
        const data: IObject = {};
        params.forEach((value, key) => data[key] = value);
        return data;
    }
    public static extract = (list: ({ field: string, value: string })[]): IObject => {
        const data: IObject = {};
        list.forEach(it => data[it.field] = it.value.trim());
        return data;
    }
    public static search = (query: IObject) => {
        const kv = Object.keys(query)
            .map(field => `${field}=${query[field]}`)
            .join('&');
        return kv ? `?${kv}` : kv;
    }
    private data: IObject = {};
    public query = (search: string) => {
        this.data = UtilQuery.parse(search);
        return this;
    }
    public fetchAll = (): IObject => {
        return this.data;
    }
    public fetchOne = (field: string): string => {
        return (this.data[field] || '').trim();
    }
    public positive = (field: string, value: string): string => {
        const val = this.fetchOne(field);
        return val.match(/^\d+$/) && +val > 0 ? val : value;
    }
}

export default UtilQuery;