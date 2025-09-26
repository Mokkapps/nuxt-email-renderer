<script setup lang="ts">
const dividerStyle = {
  margin: '30px 0',
}

const styles = {
  main: {
    backgroundColor: '#f3f3f5',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  },
  headerContent: {
    padding: '20px 30px 15px',
  },
  headerContentTitle: {
    color: '#fff',
    fontSize: '27px',
    fontWeight: 'bold',
    lineHeight: '27px',
  },
  headerContentSubtitle: {
    color: '#fff',
    fontSize: '17px',
  },
  headerImageContainer: {
    padding: '30px 10px',
  },
  headerImage: {
    maxWidth: '100%',
  },
  title: {
    margin: '0 0 15px',
    fontWeight: 'bold',
    fontSize: '21px',
    lineHeight: '21px',
    color: '#0c0d0e',
  },
  paragraph: {
    fontSize: '15px',
    lineHeight: '21px',
    color: '#3c3f44',
  },
  divider: dividerStyle,
  container: {
    width: '680px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  footer: {
    width: '680px',
    maxWidth: '100%',
    margin: '32px auto 0 auto',
    padding: '0 30px',
  },
  content: {
    padding: '30px 30px 40px 30px',
  },
  logo: {
    display: 'flex',
    background: '#f3f3f5',
    padding: '20px 30px',
  },
  header: {
    borderRadius: '5px 5px 0 0',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2b2d6e',
  },
  buttonContainer: {
    marginTop: '24px',
    display: 'block',
  },
  button: {
    backgroundColor: '#0095ff',
    border: '1px solid #0077cc',
    fontSize: '17px',
    lineHeight: '17px',
    padding: '13px 17px',
    borderRadius: '4px',
    maxWidth: '120px',
    color: '#fff',
  },
  footerDivider: {
    ...dividerStyle,
    borderColor: '#d6d8db',
  },
  footerText: {
    fontSize: '12px',
    lineHeight: '15px',
    color: '#9199a1',
    margin: '0',
  },
  footerLink: {
    display: 'inline-block',
    color: '#9199a1',
    textDecoration: 'underline',
    fontSize: '12px',
    marginRight: '10px',
    marginBottom: '0',
    marginTop: '8px',
  },
  footerAddress: {
    margin: '4px 0',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#9199a1',
  },
  footerHeart: {
    borderRadius: '1px',
    border: '1px solid #d6d9dc',
    padding: '4px 6px 3px 6px',
    fontSize: '11px',
    lineHeight: '11px',
    fontFamily: 'Consolas,monospace',
    color: '#e06c77',
    maxWidth: 'min-content',
    margin: '0 0 32px 0',
  },
}

const tips = [
  {
    id: 1,
    description:
      'To find a specific phrase, enter it in quotes: "local storage"',
  },
  {
    id: 1,
    description:
      'To search within specific tag(s), enter them in square brackets: [javascript]',
  },
  {
    id: 1,
    description:
      'Combine them to get even more precise results - [javascript] "local storage" searches for the phrase “local storage” in questions that have the [javascript] tag',
  },
]
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>Stack overflow tips for searching</EPreview>
      <EContainer :style="styles.container">
        <ESection :style="styles.logo">
          <EImg
            :width="146"
            src="https://nuxtemail.com/stack-overflow-logo.png"
          />
        </ESection>

        <ESection :style="styles.header">
          <ERow>
            <EColumn :style="styles.headerContent">
              <EHeading :style="styles.headerContentTitle">
                Find what you want, faster
              </EHeading>
              <EText :style="styles.headerContentSubtitle">
                Tips and tricks for searching on Stack Overflow
              </EText>
            </EColumn>
            <EColumn :style="styles.headerImageContainer">
              <EImg
                :style="styles.headerImage"
                :width="340"
                src="https://nuxtemail.com/stack-overflow-header.png"
              />
            </EColumn>
          </ERow>
        </ESection>

        <ESection :style="styles.content">
          <EHeading
            as="h2"
            :style="styles.title"
          >
            Searching for solutions
          </EHeading>
          <EText :style="styles.paragraph">
            With more than 18 million questions, it's possible that someone has
            already provided a solution to the problem you're facing.{' '}
          </EText>

          <EHr :style="styles.divider" />

          <EHeading
            as="h2"
            :style="styles.title"
          >
            Use the search bar at the top of the page to find what you need
          </EHeading>
          <EText :style="styles.paragraph">
            Here are a few simple search tips to get you started:
          </EText>
          <ul>
            <li
              v-for="tip of tips"
              :key="tip.id"
            >
              <EText :style="styles.paragraph">
                {{ tip.description }}
              </EText>
            </li>
          </ul>

          <EText :style="styles.paragraph">
            The more information you can put in the search bar, the more likely
            you will be to either find the answer you need or feel confident
            that no one else has asked the question before.
          </EText>

          <EHr :style="styles.divider" />

          <EHeading
            as="h2"
            :style="styles.title"
          >
            Take a break and read about the worst coder in the world
          </EHeading>

          <ESection :style="styles.buttonContainer">
            <ELink
              :style="styles.button"
              href="https://stackoverflow.blog/2019/10/22/"
            >
              I need a break
            </ELink>
          </ESection>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
