import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = { title: string };

export default function StoryEditor({ title }: Props) {
  const router = useRouter();
  const [headline, setHeadline] = useState(title.replaceAll("-", " "));
  const [body, setBody] = useState("Shape the first paragraph here. Omniscribe keeps the source, facts, and final voice in one place.");
  const [status, setStatus] = useState("Drafting");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedStories = window.localStorage.getItem("omniscribe-stories");
    const story = savedStories && JSON.parse(savedStories).find((item: { id: string }) => item.id === title);
    if (story) { setHeadline(story.title); setBody(story.body || body); setStatus(story.status); }
  }, [title]);

  function saveDraft() {
    const stories = JSON.parse(window.localStorage.getItem("omniscribe-stories") || "[]");
    const nextStories = stories.map((story: { id: string }) => story.id === title ? { ...story, title: headline, body, status } : story);
    window.localStorage.setItem("omniscribe-stories", JSON.stringify(nextStories));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return <main className="editor"><button className="backButton" onClick={() => router.push("/")}>← Back to overview</button><p className="eyebrow">Story editor</p><input className="headlineInput" value={headline} onChange={(event) => setHeadline(event.target.value)} aria-label="Story title" /><div className="editorToolbar"><label>Status <select value={status} onChange={(event) => setStatus(event.target.value)}><option>Drafting</option><option>Fact checking</option><option>Ready to edit</option><option>Published</option></select></label><button className="newButton" onClick={saveDraft}>Save draft</button></div><textarea value={body} onChange={(event) => setBody(event.target.value)} aria-label="Story body" />{saved && <p className="notice" role="status">Draft saved locally.</p>}</main>;
}
