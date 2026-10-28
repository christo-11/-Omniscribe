import { useRouter } from "next/router";
import StoryEditor from "../../components/StoryEditor";

export default function StoryPage() {
  const router = useRouter();
  return <StoryEditor title={String(router.query.id || "Story")} />;
}
