export default function TextArea({placeholder}: {placeholder: string}) {
    return <div>
        <textarea placeholder={placeholder} className="w-full px-2 py-2" rows={5}></textarea>
    </div>
}