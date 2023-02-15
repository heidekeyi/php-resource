import React from 'react';
import css from './ViewTree.module.css'

interface IItemCommon {
    item: ITreeNode;
    layer: number;
    fieldId: string;
}

const padding = (layer: number) => {
    return {paddingLeft: `${layer * 18}px`};
}

const ViewData = (props: { field: ITreeField } & IItemCommon) => {
    const {item, layer, fieldId, field} = props;
    const value = item.data[field.field];
    return (<React.Fragment>
        <i className={css.border}/>
        <div className={css.bd} style={padding(layer)}>
            <span>{field.handler ? field.handler(value) : value}</span>
        </div>
        {item.list.map(it => (<ViewData
            fieldId={fieldId}
            field={field}
            key={it.data[fieldId]}
            layer={layer + 1}
            item={it}/>))}
    </React.Fragment>);
}

const ViewOperation = (props: ITreeOperations & IItemCommon) => {
    const {
        item, layer, fieldId,
        onNewClick, onSelectClick, onDeleteClick, onUpdateClick
    } = props;
    return (<React.Fragment>
        <i className={css.border}/>
        <div className={css.operations} style={padding(layer)}>
            {onNewClick
                ? (<div className={css.operation}>
                    <span onClick={() => onNewClick(item.data)}
                          className={css.new}>new</span>
                </div>)
                : null}
            {onUpdateClick
                ? (<div className={css.operation}>
                    <span onClick={() => onUpdateClick(item.data)}
                          className={css.update}>update</span>
                </div>)
                : null}
            {onDeleteClick
                ? (<div className={css.operation}>
                    <span onClick={() => onDeleteClick(item.data)}
                          className={css.delete}>delete</span>
                </div>)
                : null}
            {onSelectClick
                ? (<div className={css.operation}>
                    <span onClick={() => onSelectClick(item.data)}
                          className={css.select}>select</span>
                </div>)
                : null}
        </div>
        {item.list.map(it => (<ViewOperation
            fieldId={fieldId}
            onNewClick={onNewClick}
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
            onSelectClick={onSelectClick}
            key={it.data[fieldId]}
            layer={layer + 1}
            item={it}/>))}
    </React.Fragment>)
}


interface ITreeProps extends ITreeOperations {
    fieldId: string;
    fields: ITreeField[];
    list: ITreeNode[];
    hide?: boolean;
}

const ViewTree = (props: ITreeProps) => {
    const {
        fields, fieldId, list, hide,
        onUpdateClick, onDeleteClick, onNewClick, onSelectClick,
    } = props;
    return (<div className={css.page}>
        {fields.map(field => (
            <div className={css.column}
                 key={field.field}>
                <div className={css.main}>
                    <i className={css.border}/>
                    <div className={css.hd}>
                        <span>{field.caption}</span>
                    </div>
                    {list.map(it => <ViewData
                        field={field}
                        key={it.data[fieldId]}
                        fieldId={fieldId}
                        layer={0}
                        item={it}/>)}
                </div>
            </div>
        ))}
        {
            hide ? null : (
                <div className={css.column}>
                    <div className={css.main}>
                        <i className={css.border}/>
                        <div className={css.hd}>
                            <span>Operation</span>
                        </div>
                        {list.map(it => (<ViewOperation
                            key={it.data[fieldId]}
                            fieldId={fieldId}
                            onNewClick={onNewClick}
                            onUpdateClick={onUpdateClick}
                            onDeleteClick={onDeleteClick}
                            onSelectClick={onSelectClick}
                            layer={0}
                            item={it}/>))}
                    </div>
                </div>
            )
        }
    </div>);
};

export default ViewTree;