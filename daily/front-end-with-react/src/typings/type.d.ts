interface IObject {
    [index: string]: string;
}

interface IResult<T = any> {
    readonly status: boolean;
    readonly message: string;
    data?: T;
}

interface ITreeNode {
    data: IObject;
    list: ITreeNode[];
}

interface ISearch {
    field: string;
    value: string;
    maxLength?: number;
    placeholder?: string;
    date?: boolean;
}

interface IResultQuery {
    pageIndex: string;
    totalPage: string;
    prevPageIndex: string;
    nextPageIndex: string;
    pageSize: string;
    list: IObject[];
}

interface ITreeField {
    field: string;
    caption: string;
    handler?: (value: string) => any;
}


interface ITreeOperations {
    onUpdateClick?: (it: IObject) => any;
    onDeleteClick?: (it: IObject) => any;
    onNewClick?: (it: IObject) => any;
    onSelectClick?: (it: IObject) => any;
}

interface IQueryPage {
    pageIndex: string;
    pageSize: string;
}
