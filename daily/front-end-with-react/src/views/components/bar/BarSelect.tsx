import React, {useState} from 'react';
import css from './BarSelect.module.css';

interface IOption {
    caption: string;
    value: string;
}

interface IProps {
    value?: string;
    onChange: (value: string) => any;
    up?: boolean;
    options: IOption[];
    style?: React.CSSProperties | undefined;
}

const BarSelect = (props: IProps) => {
    const [stateShow, setStateShow] = useState<boolean>(false);
    const {options, style, up, value, onChange} = props;
    const height = stateShow ? `${(1 + 18) * 2 + 30 * options.length}px` : '0';
    const list = options.filter(it => it.value === value);
    const caption = list.length > 0 ? list[0].caption : '';
    const onItemClick = (item: IOption) => {
        setStateShow(false);
        if (item.value !== value) {
            onChange(item.value);
        }
    }
    return (
        <div onMouseLeave={() => setStateShow(false)}
             className={css.page}>
            <div className={css.boxSelect}>
                <div className={css.select}
                     onClick={() => setStateShow(!stateShow)}
                     style={style}>
                    <span className={css.text}>{caption || '(null)'}</span>
                    <i className={stateShow ? css.up : css.down}/>
                </div>
            </div>
            <div className={up ? css.top : css.bottom}
                 style={{height}}>
                <div className={css.view}>
                    {options.map(it => (
                        <p className={css.option}
                           onClick={() => onItemClick(it)}
                           key={it.value}>{it.caption}</p>)
                    )}
                </div>
            </div>
        </div>
    );
};

export default BarSelect;