export default function Input({onChange,Value,type="text",palceholder=""}){
    return(
        <input type={type} palceholder={palceholder} className="inputColore borderStyle w-[100%]" onChange={onChange} value={Value} />
    )
}