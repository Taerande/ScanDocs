import MultiSelect from "../components/ui/MutiSelect"

const Test = () => {
    return (
        <MultiSelect options={[
            {id:0, value:'한국어', text:'한국어'},
            {id:1, value:'ja', text: '日本語'},
            {id:2, value:'kor', text: 'English'},
            {id:3, value:'sadf', text: '123'},
            {id:4, value:'asddd', text: '알바어'},
        ]} onChange={(result) => console.log(result)} />
    )

}
export default Test