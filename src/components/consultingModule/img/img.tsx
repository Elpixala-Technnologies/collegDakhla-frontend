import Image from "next/image";

export default function OtpImg({ imagePath }: { imagePath: any }) {
  return (
    <div>
      <Image src={imagePath} objectFit="fill" width={380} height={251} alt="" />
    </div>
  );
}
