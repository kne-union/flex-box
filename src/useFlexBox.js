import {useRef, useState} from "react";
import useResize from "@kne/use-resize";
import last from "lodash/last";
import isEqual from "lodash/isEqual";

const useFlexBox = (props) => {
    const {columns, onChange} = Object.assign({}, props);
    const [column, setColumn] = useState(null);
    const columnRef = useRef(null);
    const ref = useResize((el) => {
        const width = el.clientWidth;
        const column = columns.find((item, index) => {
            return item.width >= width;
        }) || last(columns);
        if (!isEqual(column, columnRef.current)) {
            setColumn(column);
            columnRef.current && onChange && onChange(column);
            columnRef.current = column;
        }
    });

    return {ref, column};
};

export default useFlexBox;
