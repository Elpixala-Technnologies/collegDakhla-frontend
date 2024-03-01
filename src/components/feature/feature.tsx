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
      <div className="bg-primary-light mb-4 p-4 shadow-lg">
        <h5 className="text-primary text-lg font-bold mb-4">{title}</h5>
        <div className="flex gap-2  flex-wrap">
          {tags?.map((tag, index) => {
            return (
              <Tag
                key={index}
                text={tag.attributes.name}
                href={""}
                bgcolor="bg-white"
                borderColor="border-primary"
                color="text-primary"
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
