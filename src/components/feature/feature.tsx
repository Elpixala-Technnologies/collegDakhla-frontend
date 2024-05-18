import Tag from "../tag/tags";

type Tag = {
  attributes: any;
  name: string;
};
type Props = {
  title: string;
  tags: Tag[];
};
export default function Feature({ title, tags }: Props) {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 via-gray-300 to bg-gray-50 mb-4 p-4 shadow-lg rounded-md">
        <h5 className="text-white text-lg font-bold mb-4">{title}</h5>
        <div className="flex gap-2  flex-wrap">
          {tags?.map((tag, index) => {
            return (
              <Tag
                key={index}
                text={tag.attributes.name}
                href={""}
                bgcolor="bg-white"
                borderColor="border-gray-500"
                color="text-gray-800"
                big
                rounded
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
