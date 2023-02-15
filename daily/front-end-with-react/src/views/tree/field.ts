import UtilTimeFormat from "../../utils/UtilTimeFormat";

const fieldId = (): ITreeField => {
    return {
        field: 'id',
        caption: 'ID'
    };
};

const fieldCreateTime = (): ITreeField => {
    return {
        field: 'createTime',
        caption: 'CreateTime',
        handler: (value: string) => new UtilTimeFormat(+value).timestamp()
    };
};

const fieldName = (): ITreeField => {
    return {
        field: 'name',
        caption: 'Name',
    };
};

const fieldNameId = (): ITreeField => {
    return {
        field: 'nameId',
        caption: 'NameId',
    };
};

const fieldParentName = (): ITreeField => {
    return {
        field: 'parentName',
        caption: 'ParentName',
    };
};

const fieldParentId = (): ITreeField => {
    return {
        field: 'parentId',
        caption: 'ParentId',
    };
};

const fieldAmount = (): ITreeField => {
    return {
        field: 'amount',
        caption: 'Amount',
    };
};

const fieldDate = (): ITreeField => {
    return {
        field: 'date',
        caption: 'Date',
        handler: (value: string) => new UtilTimeFormat(+value).dateTime()
    };
};

const fieldCategoryName = (): ITreeField => {
    return {
        field: 'categoryName',
        caption: 'Category',
    };
};
const fieldCategoryId = (): ITreeField => {
    return {
        field: 'categoryId',
        caption: 'CategoryId',
    };
};
const fieldUnitName = (): ITreeField => {
    return {
        field: 'unitName',
        caption: 'Unit',
    };
};

const fieldUnitId = (): ITreeField => {
    return {
        field: 'unitId',
        caption: 'UnitId',
    };
};

const fieldBeginTime = (): ITreeField => {
    return {
        field: 'beginTime',
        caption: 'BeginTime',
        handler: (value: string) => new UtilTimeFormat(+value).timestamp()
    };
};

const fieldEndTime = (): ITreeField => {
    return {
        field: 'endTime',
        caption: 'EndTime',
        handler: (value: string) => new UtilTimeFormat(+value).timestamp()
    }
};

const fieldSecond = (): ITreeField => {
    return {
        field: 'second',
        caption: 'Second',
    }
}

export {
    fieldAmount, fieldDate,
    fieldBeginTime, fieldEndTime,
    fieldCategoryName, fieldCategoryId,
    fieldId, fieldCreateTime,
    fieldName, fieldNameId,
    fieldParentName, fieldParentId,
    fieldUnitId, fieldUnitName,
    fieldSecond,
};