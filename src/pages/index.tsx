import { VideoSelectionComponent } from "@/components/videoSelectionPage";

function Home() {
  return <VideoSelectionComponent />;
}
export async function getServerSideProps() {
  return { props: {} };
}

export default Home;
