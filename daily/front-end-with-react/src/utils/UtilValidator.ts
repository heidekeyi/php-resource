interface IValidatorResult {
    errors: IResult[];
    data: IObject;
    status: boolean;
}

class UtilValidator {
    private _result: IValidatorResult = {
        errors: [],
        data: {},
        status: true
    };
    public data = (data: IObject) => {
        this._result.data = data;
        return this;
    }
    private error = (message: string) => {
        this._result.status = false;
        this._result.errors.push({status: false, message});
        return this;
    }
    private setValue = (field: string, value: string) => {
        this._result.data[field] = value;
    }
    private getValue = (field: string) => {
        return this._result.data[field] || '';
    }
    private status = () => {
        return this._result.status;
    }
    public empty = (field: string) => {
        let value = this.getValue(field);
        value = value.trim();
        this.setValue(field, value);
        if (!value) {
            this.error(`${field} is empty`);
        }
        return this;
    }
    public integer = (field: string) => {
        this.empty(field);
        if (!this.status()) {
            return this;
        }
        let value = this.getValue(field);
        if (!value.match(/^\d+$/)) {
            this.error(`${field}=${value} is not a integer`);
        }
        return this;
    }
    public date = (field: string) => {
        this.empty(field);
        if (!this.status()) {
            return this;
        }
        let value = this.getValue(field);
        if (!value.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            this.error(`${field}=${value} is not match date format`);
        }
        return this;
    }
    public time = (field: string) => {
        this.empty(field);
        if (!this.status()) {
            return this;
        }
        let value = this.getValue(field);
        if (value.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            this.setValue(field, `${value} 00:00:00`);
        } else if (value.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}$/)) {
            this.setValue(field, `${value}:00:00`);
        } else if (value.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}$/)) {
            this.setValue(field, `${value}:00`);
        } else if (value.match(/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}(:\d{1,2}){0,2}$/)) {
            this.setValue(field, value);
        } else {
            this.error(`${field}=${value} is not match time format`);
        }
        return this;
    }
    public rmb = (field: string) => {
        this.empty(field);
        if (!this.status()) {
            return this;
        }
        let value = this.getValue(field);
        if (!value.match(/^[-.\d]+$/)) {
            return this.error(`${field} has invalid char`);
        }
        if (Number.isNaN(+value) || +value === 0) {
            return this.error(`${field}=${value} make no sense`);
        }
        const list = value.split('.');
        if (list.length > 2) {
            return this.error(`${field}=${value} make no sense`);
        }
        if (list.length === 2) {
            let [integer, point] = list;
            const len = point.length;
            if (len > 2) {
                return this.error(`${field}=${value} make no sense`);
            }
            if (len === 0) {
                point = '00';
            } else if (len === 1) {
                point = `${point}0`;
            }
            value = `${integer}${point}`;
        } else {
            value = `${value}00`;
        }
        this.setValue(field, value);
        return this;
    }

    public result = (): IValidatorResult => {
        return this._result;
    }
}

export default UtilValidator;