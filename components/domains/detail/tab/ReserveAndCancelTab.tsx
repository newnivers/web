export default function ReserveAndCancelTab({
  children,
}: {
  children: string;
}) {
  return <div dangerouslySetInnerHTML={{ __html: children }}></div>;
}
