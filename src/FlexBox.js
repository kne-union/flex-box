import React from 'react';
import {List} from "antd";
import defaultColumns from './defaultColumns';
import useFlexBox from './useFlexBox';

const FlexBox = (props) => {
    const {columns, outerClassName, gutter, ...others} = Object.assign({}, {
        gutter: 16, columns: defaultColumns,
    }, props);
    const {ref, column} = useFlexBox({columns});
    return (<div ref={ref} className={outerClassName}>
        {column && (<List {...others} grid={{
            gutter, column: column.col,
        }}/>)}
    </div>);
};

FlexBox.Item = List.Item;

export default FlexBox;
