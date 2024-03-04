import Image from "next/image";
import { ReactNode } from "react";

export default function ContainerWithTextBgImg({
  imagePath,
  children,
  noOverlay = false,
  rounded = "rounded-lg",
  containerHeight = "h-72",
}: {
  imagePath: any;
  children: ReactNode;
  noOverlay?: boolean;
  rounded?: string;
  containerHeight?: string;
}) {
  return (
    <div className={`relative ${rounded} overflow-hidden ${containerHeight}`}>
      <Image
        src={imagePath}
        width={300}
        height={300}
        objectFit="fill"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt=""
      />
      {!noOverlay ? (
        <div className="absolute inset-0 bg-black opacity-20 h-full w-full object-cover" />
      ) : (
        <></>
      )}
      <div className="absolute inset-0 p-6">
        <>{children}</>
      </div>
    </div>
  );
}
