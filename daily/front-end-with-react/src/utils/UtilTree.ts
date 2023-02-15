interface IMapItem {
    data: IObject;
    list: IMapItem[];
    parent?: IMapItem;
}

interface IMap {
    [index: string]: IMapItem;
}

class UtilTree {
    private _fieldId: string = '';
    private _fieldParentId: string = '';
    public fieldId = (fieldId: string) => {
        this._fieldId = fieldId;
        return this;
    }
    public fieldParentId = (fieldParentId: string) => {
        this._fieldParentId = fieldParentId;
        return this;
    }
    public list = (list: IObject[]) => {
        if (!this._fieldId || !this._fieldParentId) {
            return this.sequence(list);
        }
        return this.tree(list);
    }
    private sequence = (list: IObject[]) => {
        return list.map((it: IObject): ITreeNode => {
            return {data: it, list: []};
        });
    }
    private tree = (list: IObject[]) => {
        const map: IMap = {};
        const fieldId = this._fieldId;
        const fieldParentId = this._fieldParentId;
        list.forEach(it => {
            const id = it[fieldId];
            map[id] = {parent: undefined, data: it, list: []};
        });
        list.forEach(item => {
            const pId = item[fieldParentId];
            const pIt = map[pId];
            if (!pIt) {
                return;
            }
            const id = item[fieldId];
            const it = map[id];
            it.parent = pIt;
            pIt.list.push(it);
        });
        return list.map(it => map[it[fieldId]]).filter(it => !it.parent);
    }
}

export default UtilTree;