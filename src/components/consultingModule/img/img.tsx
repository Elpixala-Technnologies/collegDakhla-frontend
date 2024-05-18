import Image from "next/image";

export default function OtpImg({ imagePath }: { imagePath: any }) {
  return (
    <div>
      <Image src={imagePath} objectFit="fill" width={1200} height={1200} alt="" />
    </div>
  );
}
