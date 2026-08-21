import {useNavigate} from "react-router";
import {useRef} from "react";

const Search = ()=>{
    const navigate = useNavigate();
    const inputRef = useRef<null|HTMLInputElement>(null);
    return ( <div className="flex items-center rounded-full border border-gray-600 bg-slate-800 px-3 py-2">
        <input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            className="w-48 bg-transparent text-sm text-white placeholder:text-gray-400 outline-none"
        />

        <button className="ml-2 text-lg hover:text-blue-400" onClick={()=>{
            const value = inputRef.current?.value ?? "";
            navigate(`/search?q=${encodeURIComponent(value)}`);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }}>
            🔍
        </button>
    </div>)
}
export default Search;