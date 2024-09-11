import React, {forwardRef} from "react";
import {List} from "antd";
import classnames from "classnames";
import useFlexBox from './useFlexBox';
import Fetch from '@kne/react-fetch';
import defaultColumns from './defaultColumns';

const FlexBoxFetch = forwardRef((props, forwardRef) => {
    const {
        columns, api, getFetchApi, outerClassName, className, gutter, dataFormat, ...others
    } = Object.assign({}, {
        gutter: 16, columns: defaultColumns, dataFormat: (data) => {
            return data.pageData;
        },
    }, props);
    const {ref, column} = useFlexBox({columns});
    return (<div ref={ref} className={outerClassName}>
        {column && (<Fetch
            {...Object.assign({}, api || getFetchApi(column))}
            ref={forwardRef}
            render={({data, isComplete}) => {
                return (<List
                    {...others}
                    className={classnames(className, "loading-container", {
                        ["is-loading"]: !isComplete,
                    })}
                    dataSource={dataFormat(data)}
                    grid={{
                        gutter, column: column.col,
                    }}
                />);
            }}
        />)}
    </div>);
});

FlexBoxFetch.Item = List.Item;

export default FlexBoxFetch;
