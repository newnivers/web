export default function InfoTab({ children }: { children: string }) {
  return <div dangerouslySetInnerHTML={{ __html: children }}></div>;
}
