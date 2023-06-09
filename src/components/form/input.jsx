export default function Input(props) {
    return <input 
        {...props} 
        className={props.className + " bg-gray-300 border border-gray-200 px-4 py-4  shadow-inner placeholder-gray-600 rounded-lg"}
    />
}