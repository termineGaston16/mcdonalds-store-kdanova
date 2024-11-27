import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Search(){

    const navigate = useNavigate()

    const searchSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const query = new FormData(e.currentTarget).get('queryByUser')
        if(query) navigate(`/buscar/${query}`)
    }

    return(<form onSubmit={searchSubmit}>
        <input type="search" name="queryByUser"/>
        <button type="submit"><BiSearch /></button>
    </form>)
}