import Link from "next/link"

export default function Button({
    children, 
    className="", 
    onClick=undefined, 
    variant="default", 
    block=false, 
    dense=false, 
    href=undefined, 
    color=undefined, 
    text=undefined, 
    disabled=false
}: {[key: string]: any}) {

    const denseSize = variant == "tile" ? " py-3 ": " py-2 ";
    const normalSize = variant == "tile" ? " py-3 ": " py-2 ";
    let bgColor = variant == "flat" ? " ": " bg-green-600 ";
    const textColor =  text || (variant == "outline" ? "text-green-600 " : (variant == "flat" ? " text-black ": " text-white "));

    if (color) { 
        bgColor = color;
    }
    if (disabled) {
        bgColor = " bg-gray-400 "
    }
    
    if (variant == "outline") {
        bgColor = ""
    }

    if (href != null) {
        return <div onClick={onClick} className={
            (dense ? "px-4 " + denseSize : "px-8 " + normalSize) +
            (variant == "tile" ? "border-x border-gray-200 ": " rounded-lg ") +
            (variant == "outline" ? " border-green-600 border-2 text-green-600 " : " ") + 
            (block ? "block w-full text-center " : "") +
            " " + className
        }>
            <Link href={href} className={className}>
             { children }
            </Link>
        </div> 
    }

    return <button 
            disabled={disabled}
            onClick={onClick}
            className={ 
                className + 
                (variant == "outline" ? (bgColor || "border-green-600") + " border-2  " : bgColor) +
                (variant == "flat" ? "" : " ") +
                (dense ? "px-4 " + denseSize : "px-8 " + normalSize) +
                (block ? "block w-full " : "") +
                (variant == "tile" ? " ": "rounded-lg ") +
                textColor
            }>
            { children }
    </button>
}``