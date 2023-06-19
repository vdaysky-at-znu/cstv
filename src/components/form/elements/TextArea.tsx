import { MutableRefObject } from "react";

export default function TextArea({innerRef, placeholder}: {placeholder: string, innerRef: MutableRefObject<HTMLTextAreaElement>}) {
    return <div>
        <textarea ref={innerRef} placeholder={placeholder} className="w-full px-2 py-2" rows={5}></textarea>
    </div>
}