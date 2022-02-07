import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

// import '../../styles/global.css'

export default function Me() {
    return (
      <>
      <Layout>

      <Head>
        <title>hi me title</title>
        {/* <script src="https://connect.facebook.net/en_US/sdk.js" /> */}
        {/* or */}
      </Head>
      <h1>hi me</h1>
      <img src="/images/first.jpeg" alt="Your Name" />
      <Image src="/images/first.jpeg" width="30px" height="60px"></Image>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      ></Script>
      </Layout>
      </>
    )
  }