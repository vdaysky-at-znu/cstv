import DatePicker from "react-datepicker";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Input({onFocus = undefined, onClick=undefined, readonly = false, placeholder = "", type = "", rightIcon = undefined, leftIcon = undefined, color
, className = undefined, value = undefined, onChange = undefined, innerRef = undefined, block = false}: {[key: string]: any} = {}) {

    if (type === "datetime") {
        return <DatePicker
            className={
                (block ? "block w-full " : "") +
                className +
                " bg-gray-300 border border-gray-200 px-4 py-3  shadow-inner placeholder-gray-600 rounded-lg"
            }
            placeholder={placeholder}
            selected={value}
            onChange={onChange}
        />
    }

    return <div className={block ? "w-full " : "" + "relative"}>
        <input readOnly={readonly} ref={innerRef}
            value={value}
            onClick={onClick}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={placeholder}
            className={
                (block ? "block w-full " : "") +
                " " + color + " " + 
                className +
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