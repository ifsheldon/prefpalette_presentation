import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function GithubLink(props: { href: string }) {
  return (
    <a
      className="text-[var(--muted)] text-2xl w-11 h-11 inline-flex items-center justify-center rounded-full bg-black/5 border hover:bg-black/10 transition"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
  );
}


