import { VideoSelectionComponent } from '@/components/videoSelectionComponent'
import videoJson from './videoJson.json'
import axios from 'axios';


type testData = {
    data : {
        test : string
    }
}

function BrowsePage({ data }: testData) {
    return <VideoSelectionComponent test={data.test}/>
}
  
  // This gets called on every request
  export async function getServerSideProps(context) {



    const data = {
        test: "browse"
    }
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default BrowsePage