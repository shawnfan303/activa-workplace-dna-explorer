type SourceLinkProps = {
  href: string;
};

export function SourceLink({ href }: SourceLinkProps) {
  return (
    <a className="text-sm font-semibold text-aurora-red underline-offset-4 hover:underline" href={href} target="_blank" rel="noreferrer">
      公開來源連結
    </a>
  );
}

