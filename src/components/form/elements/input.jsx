import DatePicker from "react-datepicker";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Input(props) {
    const block = "block" in props;
    const rightIcon = props.rightIcon || null;
    const leftIcon = props.leftIcon || null;
    const color = props.color;

    if (props.type === "datetime") {
        return <DatePicker
            {...props}
            className={
                (block ? "block w-full " : "") +
                props.className +
                " bg-gray-300 border border-gray-200 px-4 py-3  shadow-inner placeholder-gray-600 rounded-lg"
            }
            selected={props.value}
            onChange={props.onChange}
        />
    }

    return <div className="relative">
        <input
            {...props}
            className={
                (block ? "block w-full " : "") +
                " " + color + " " + 
                props.className +
                " bg-gray-300 border border-gray-200 py-3  shadow-inner placeholder-gray-600 rounded-lg " +
                (rightIcon ? "pr-4 " : "pr-2 ") +
                (leftIcon ? "pl-4 " : "pl-2 ") +
                ""
            }
        />
        {
            leftIcon ?
            <div className="absolute left-0 top-0 text-gray-600 h-full flex items-center px-3">
                <FontAwesomeIcon icon={leftIcon} />
            </div> : null
        }
        {
            rightIcon ?
            <div className="absolute right-0 top-0 text-gray-600 h-full flex items-center px-3">
                <FontAwesomeIcon icon={rightIcon} />
            </div> : null
        }

    </div>
}