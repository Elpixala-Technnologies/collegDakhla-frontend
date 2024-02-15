import Image from "next/image";
import Link from "next/link";
export default function NotificationCard() {
  return (
    <div className="w-96 bg-white p-4 flex flex-col gap-4 shadow-2xl rounded-md">
      <div className="flex gap-2 items-center">
        <div className=" bg-white rounded-md p-1 ">
          <Image src={"/Gate_Logo.webp"} alt="" width={60} height={60} />
        </div>
        <div>
          <div className="font-bold text-sm mb-1">
            GATE 2024 response sheet out on Feb 16, Download pdf Here
          </div>
          <div className="flex gap-4">
            <div className="text-xs py-1 px-2 bg-slate-200 rounded-full">
              Exam
            </div>
            <div className="text-xs py-1 px-2 bg-slate-200 rounded-full">
              Feb 13,2024
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-secondary-text">
        IISc Bangalore is going to release the GATE 2024 response sheet on Feb
        16, 2024. Candidates can download the PDF from its official website -
        gate2024.iisc.ac.in.
      </div>
      <div>
        <Link href={"/"}>Read More</Link>
      </div>
    </div>
  );
}
