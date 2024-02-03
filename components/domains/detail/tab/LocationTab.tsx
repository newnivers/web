export default function LocationTab({ children }: { children: string }) {
  return <div dangerouslySetInnerHTML={{ __html: children }}></div>;
}
