
export function Input({placeholder, reference}:{placeholder:string,reference:any  }){
    return <div className="py-2 px-4">
        <input className="py-2 px-5 border-2 rounded-md m-2"  placeholder={placeholder} type={"text"} ref={reference}/>
    </div>
}