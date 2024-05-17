import Image from "next/image";

export default function OtpImg({ imagePath }: { imagePath: any }) {
  return (
    <div>
      <Image src={imagePath} objectFit="fill" width={500} height={500} alt="" />
    </div>
  );
}
