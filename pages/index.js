import Head from 'next/head';
import { useRouter } from 'next/router';
import LoadingBlock from '../components/LoadingBlock';
import { Heading, Text } from '../components/Typography';
import { Row, Column } from '../components/Grid';
import Button from '../components/Button';
import Link from 'next/link';
import { useSession, signin, signout } from 'next-auth/client';

function Home() {
  const router = useRouter();
  const canonical = `https://mailr.link/`;
  const metaTitle = 'mailr';
  const metaImage = '/logo_transparent.png';
  const metaImageAlt = 'mailr Logo';
  const metaDescription = `mailr makes building a newsletter simple for all influencers. Engage with your audience in a whole new way with mailr.`;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="google-site-verification" content="BXb7e_nv3O4Z1slg2aQ1p-DrGj6KDUio0qOG10Ny4UA" />
        <meta name="description" content={metaDescription}></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="author" content="mailr"></meta>
        <meta property="application-name" content="mailr"></meta>
        <meta property="msapplication-tooltip" content={metaTitle}></meta>
        <meta property="msapplication-starturl" content="https://mailr.link"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={metaTitle}></meta>
        <meta property="og:description" content={metaDescription}></meta>
        <meta property="og:image" content={metaImage}></meta>
        <meta property="og:image:alt" content={metaImageAlt}></meta>
        <meta property="og:image:width" content="500"></meta>
        <meta property="og:image:height" content="500"></meta>
        <meta property="og:url" content={canonical}></meta>
        <meta property="og:site_name" content="mailr"></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@mailrlink"></meta>
        <meta name="twitter:title" content={metaTitle}></meta>
        <meta name="twitter:description" content={metaDescription}></meta>
        <meta name="twitter:image" content={metaImage}></meta>
        <meta name="twitter:image:alt" content={metaImageAlt}></meta>
      </Head>
      <Row justify="center" style={{ marginBottom: '100px' }}>
        <style jsx>{`
          blockquote {
            background: #f9f9f9;
            border-left: 10px solid #0070f3;
            margin: 1.5em 0px;
            padding: 0.5em 10px;
          }
          blockquote:before {
            color: #ccc;
            content: open-quote;
            font-size: 4em;
            line-height: 0.1em;
            margin-right: 0.25em;
            vertical-align: -0.4em;
          }
          blockquote p {
            display: inline;
          }
        `}</style>

        <Column xs={12} sm={7} align="flex-start">
          <Heading level={1}>The #1 way to build a mailing list without a website</Heading>
          <Button
            onClick={() => {
              router.push('/login');
            }}
            level="primary"
          >
            <i
              className="fas fa-link"
              style={{
                marginRight: '8px',
              }}
            ></i>
            Get Your Free Link Now
          </Button>

          <p>
            <Text type="normal">Let’s talk about email marketing.</Text>
          </p>
          <p>
            <Text type="normal">
              Personal websites are dead and unfortunately email marketing has gone with them. Sites like Instagram,
              YouTube, TikTok, and Twitter have taken over and are here to stay. This shift in the climate of the
              internet has burried one of the best kept internet money-making secrets — <b>The Mailing List</b>.
            </Text>
          </p>

          <p>
            <Text type="normal">
              As a fan, it feels great to get an email from your favorite influencer.{' '}
              <b>It feels incredibly personal</b>. But most influencers are ignoring email as a marketing channel.{' '}
              <em>Why?</em> Because mailing lists have always been notoriously hard to build.
            </Text>
          </p>

          <p>
            <Text>First you need a landing page, then you need a lead magnet, then you need blah blah blah...</Text>
          </p>
          <p>
            <Text type="normal">
              <b>We think that newsletters deserve a do-over.</b> A revamp. Updated to the way we interact with our fans
              today. At Mailr, we’ve done just that. A completely new way to think about your audience. A fresh start
              that works the way you do.
            </Text>
          </p>

          <p>
            <Text type="normal">
              <b>So how DOES it work?</b>
            </Text>
          </p>
          <p>
            <Text type="normal">
              All you have to do is sign up and <b>BOOM</b>. You’re done. We give you a link that you put in your bio,
              description, or anywhere you want your fans to sign up. We’ll collect your subscribers here, and you can
              export them at any time to any of your favorite email marketing services.
            </Text>
          </p>
          <Column xs={12} align="center">
            <Button level="primary" onClick={signin}>
              <i
                className="fas fa-link"
                style={{
                  marginRight: '8px',
                }}
              ></i>
              Get Your Link
            </Button>
          </Column>
          {/* <Row>
          <div style={{ border: '0.5px solid', width: '10%', padding: '0 16px' }}></div>
          <Text type="normal" style={{ padding: '0 24px' }}>
            OR
          </Text>
          <div style={{ border: '0.5px solid', width: '10%', padding: '0 16px' }}></div>
        </Row> */}
          <p>
            <Text type="normal">Still not convinced that you are missing a huge opportunity for your brand?</Text>
          </p>
          <p>
            <Text type="normal">
              Check out this statistic from{' '}
              <a
                target="_blank"
                rel="noopener"
                href="https://www.ofcom.org.uk/__data/assets/pdf_file/0026/27089/icmr_1.pdf#page=48"
              >
                The 2017 International Communications Market Report
              </a>{' '}
              showing the first app people opened in the morning:
            </Text>
          </p>
          <blockquote>
            <Text type="normal">
              Thirty per cent of UK respondents looked at text messaging first, followed by email (26%) and social
              networks (13%). Email was the only service chosen by a substantial proportion of respondents in all
              nations, lowest in Italy at 16%. It was the first choice in Japan, and the second most popular choice in
              every other nation - possibly because it is a long-established communications service.
            </Text>
          </blockquote>
          <p>
            <Text type="normal">
              That's crazy, but you would never know about it because Email is not a normal social media. Your friends
              aren't bragging about their latest Email they just sent. But as we see from the statistics it's untapped
              potential for marketing is just as great if not greater than your traditional social channels.
            </Text>
          </p>
          <p>
            <Text type="normal">
              At Mailr, we know how hard it is to monitize your brand as an influencer. That's why we will always have a
              generous free tier for people just getting started with their audience. If you haven't yet, go check out
              all the free features you get on our{' '}
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>{' '}
              page.
            </Text>
          </p>
        </Column>
      </Row>
    </>
  );
}

export default Home;
