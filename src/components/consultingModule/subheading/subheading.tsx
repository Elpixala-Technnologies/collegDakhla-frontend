export default function OtpSubHeading({
  subHeading,
  paragraph,
}: {
  subHeading: string;
  paragraph: string;
}) {
  return (
    <div>
      <div className="text-black">
        <>
          {subHeading},{paragraph && <p>{paragraph}</p>}
        </>
      </div>
    </div>
  );
}

