export default function OtpHeading({
  heading,
  color,
}: {
  heading: string;
  color?: string;
}) {
  return (
    <div>
      <div className={`font-semibold ${color ? color : ""}`}>
        <>{heading}</>
      </div>
    </div>
  );
}
