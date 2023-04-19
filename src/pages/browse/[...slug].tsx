import { VideoSelectionComponent } from '@/components/videoSelectionComponent'


type testData = {
    data : {
        test : string
    }
}

function Page({ data }: testData) {
    return <VideoSelectionComponent test={data.test}/>
}
  
  // This gets called on every request
  export async function getServerSideProps(context) {

 

    const data = {
        test: "hello"
    }
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page