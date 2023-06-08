export default function Input(props) {
    return <input 
        {...props} 
        className={props.className + " bg-gray-300 px-4 py-4 text-gray-800 rounded-lg"}
    />
}