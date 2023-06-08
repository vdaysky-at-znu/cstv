import Link from "next/link"

export default function Button(props) {

    const className = props.className || "";
    const variant = props.variant || "default";
    const block = "block" in props;
    const dense = "dense" in props;

    if (props.href) {
        return <div className={(dense ? "px-4 py-3 " : "px-8 py-3 ") + 
        (variant == "tile" ? "border-x border-gray-200 ": " rounded-lg ") +
        " " + className}>
            <Link {...props} className="">
             { props.children }
            </Link>
        </div> 
    }

    return <button 
            
            {...props} 
            className={ 
                className + (variant == "flat" ? "" : " bg-green-600 ") + 
                (dense ? "px-2 py-3 " : "px-8 py-3 ") + 
                (block ? "block w-full " : "") +
                (variant == "tile" ? "bg-gray-100 ": "rounded-lg ") +
                " text-white "
            }>
            { props.children }
    </button>
}