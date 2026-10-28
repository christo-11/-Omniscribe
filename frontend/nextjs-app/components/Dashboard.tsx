import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const starterStories = [
  { id: "signal-in-the-noise", title: "Signal in the noise", source: "The Daily Ledger", status: "Ready to edit", tone: "mint" },
  { id: "quiet-revolution", title: "The quiet revolution", source: "Field Notes", status: "Fact checking", tone: "amber" },
  { id: "last-mile", title: "Built for the last mile", source: "Wire / 24", status: "Drafting", tone: "blue" },
];

export default function Dashboard() {
  const router = useRouter();
  const [stories, setStories] = useState(starterStories);
  const [showNewStory, setShowNewStory] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const savedStories = window.localStorage.getItem("omniscribe-stories");
    if (savedStories) setStories(JSON.parse(savedStories));
  }, []);

  function persistStories(nextStories: typeof starterStories) {
    setStories(nextStories);
    window.localStorage.setItem("omniscribe-stories", JSON.stringify(nextStories));
  }

  function createStory(event: React.FormEvent) {
    event.preventDefault();
    const id = `story-${Date.now()}`;
    const nextStory = { id, title: "Untitled story", source: sourceUrl || "Manual draft", status: "Drafting", tone: "mint" };
    persistStories([nextStory, ...stories]);
    setShowNewStory(false);
    setSourceUrl("");
    router.push(`/story/${id}`);
  }

  return (
    <main className="shell">
      <aside className="sidebar"><div className="brand">omni<span>scribe</span></div><nav><a className="active" href="#stories">Overview</a><a href="#stories">Sources</a><a href="#stories">Fact checks</a><a href="#stories">Exports</a></nav><div className="profile"><div className="avatar">AS</div><div><strong>Alex Stone</strong><small>Editorial desk</small></div></div></aside>
      <section className="content"><header><div><p className="eyebrow">Editorial workspace / Wednesday</p><h1>Good stories, <em>made clear.</em></h1></div><button className="newButton" onClick={() => setShowNewStory(true)}>+ New story</button></header><div className="metrics"><div><span>Active stories</span><strong>{stories.length}</strong><small>↑ this workspace</small></div><div><span>In review</span><strong>{stories.filter((story) => story.status === "Fact checking").length.toString().padStart(2, "0")}</strong><small>Needs your eye</small></div><div><span>Published this month</span><strong>28</strong><small>Editorial output</small></div></div><section className="storySection" id="stories"><div className="sectionHeading"><div><p className="eyebrow">Your newsroom</p><h2>Stories in motion</h2></div><button className="quietButton" onClick={() => setNotice("Showing all stories in this workspace")}>View all →</button></div><div className="storyGrid">{stories.map((story) => <Link href={`/story/${story.id}`} className="storyCard" key={story.id}><div className={`storyAccent ${story.tone}`} /><div className="storyMeta"><span>{story.status}</span><small>2h ago</small></div><h3>{story.title}</h3><p>{story.source}</p><div className="progress"><i /></div><footer><small>Open editor</small><b>→</b></footer></Link>)}</div></section>{notice && <p className="notice" role="status">{notice}</p>}{showNewStory && <div className="modalBackdrop" role="presentation" onClick={() => setShowNewStory(false)}><form className="modal" onSubmit={createStory} onClick={(event) => event.stopPropagation()}><p className="eyebrow">Create story</p><h2>Start a new draft</h2><label>Source URL <input type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://example.com/article" /></label><div className="modalActions"><button type="button" className="quietButton" onClick={() => setShowNewStory(false)}>Cancel</button><button className="newButton" type="submit">Create draft</button></div></form></div>}</section></main>
  );
}
