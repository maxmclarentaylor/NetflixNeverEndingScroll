import Link from 'next/link'

type testData = {
    data : {
        test : string
    }
}

function Page({ data }: testData) {
    return <>
    <Link href="/browse">browse</Link>
    </>
}
  
  // This gets called on every request
  export async function getServerSideProps(context) {

    console.log(context.query.country)

    const data = {
        test: context.query.country
    }
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page