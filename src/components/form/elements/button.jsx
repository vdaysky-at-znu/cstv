import Link from "next/link"

export default function Button(props) {

    const className = props.className || "";
    const variant = props.variant || "default";
    const block = "block" in props;
    const dense = "dense" in props;

    const denseSize = variant == "tile" ? " py-3 ": " py-2 ";
    const normalSize = variant == "tile" ? " py-3 ": " py-2 ";
    let bgColor = variant == "flat" ? " ": " bg-green-600 ";
    const textColor =  props.text || (variant == "outline" ? "text-green-600 " : (variant == "flat" ? " text-black ": " text-white "));

    if (props.color) { 
        bgColor = props.color;
    }

    if (props.href) {
        return <div className={
            (dense ? "px-4 " + denseSize : "px-8 " + normalSize) +
            (variant == "tile" ? "border-x border-gray-200 ": " rounded-lg ") +
            (variant == "outline" ? " border-green-600 border-2 text-green-600 " : " ") + 
            (block ? "block w-full text-center " : "") +
            " " + className
        }>
            <Link {...props} className="">
             { props.children }
            </Link>
        </div> 
    }

    return <button 
            
            {...props} 
            className={ 
                className + 
                (variant == "outline" ? (bgColor || "border-green-600") + " border-2  " : bgColor) +
                (variant == "flat" ? "" : " ") +
                (dense ? "px-4 " + denseSize : "px-8 " + normalSize) +
                (block ? "block w-full " : "") +
                (variant == "tile" ? " ": "rounded-lg ") +
                textColor
            }>
            { props.children }
    </button>
}``