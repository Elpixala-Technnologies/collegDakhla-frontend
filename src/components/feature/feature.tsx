import Tag from "../tag/tags";

type Tag = {
    name: string; 
  };
type Props ={
    title:string,
    tags:Tag[],
}
export default function Feature({
    title,
    tags
}:Props){
    return (
        <>
            <div className="bg-primary-light mb-4 p-4">
                <h5 className="text-primary text-lg font-bold mb-4">
                    {title}
                </h5>
                <div className="flex gap-2">
                    {tags.map((tag)=>{
                        return <Tag key={tag.name} text={tag.name} href={"/"} bgcolor="bg-white" borderColor="border-primary" big rounded/>
                    })}
                </div>
            </div>
        </>
    )
}