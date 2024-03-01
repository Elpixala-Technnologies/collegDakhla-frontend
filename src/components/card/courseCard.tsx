import Image from "next/image";
export default function CourseCard() {
  return (
    <>
      <div className="flex flex-col border-[0.5px] border-extra-light-text text-primary-text p-4 w-64 rounded">
        <div className="flex gap-4 items-center">
          <div className="border-[0.1px] border-extra-light-text rounded-full">
            <Image src={"/engineering.svg"} width={70} height={70} alt="" />
          </div>
          <div>
            <h6 className="text-2xl font-medium">Engineering</h6>
            <p className="text-sm text-secondary-text">2345 Colleges</p>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-2">
          <div className="border-b-[0.2px] border-b-extra-light-text text-secondary-text text-sm px-1 flex justify-between">
            <div>BE/B.Tech</div>
            <div>4 years</div>
          </div>
          <div className="border-b-[0.2px] border-b-extra-light-text text-secondary-text text-sm px-1 flex justify-between">
            <div>BCA</div>
            <div>3 years</div>
          </div>
          <div className="border-b-[0.2px] border-b-extra-light-text text-secondary-text text-sm px-1 flex justify-between">
            <div>M.Tech</div>
            <div>2 years</div>
          </div>
        </div>
      </div>
    </>
  );
}
