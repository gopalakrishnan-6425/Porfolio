import resumeUrl from "../assets/Gopalakrishnan_S_Resume.pdf";

const FILE = "Gopalakrishnan_S_Resume.pdf";

const toBlob = async (url) => {
  if (!url.startsWith("data:")) return (await fetch(url)).blob();
  const bin = atob(url.split(",")[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: "application/pdf" });
};

/** Normal browsers just follow the download link; the Claude preview uses its downloads capability. */
export default function ResumeButton({
  className = "gs-btn primary",
  children = "Download resume \u2193",
  ...rest
}) {
  const onClick = async (e) => {
    if (!window.claude?.use) return;
    e.preventDefault();
    try {
      const dl = await window.claude.use("downloads");
      await dl.save({ filename: FILE, data: await toBlob(resumeUrl) });
    } catch {
      /* download cancelled or unavailable */
    }
  };
  return (
    <a
      className={className}
      href={resumeUrl}
      download={FILE}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
