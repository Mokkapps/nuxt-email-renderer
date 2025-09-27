<script setup lang="ts">
interface Props {
  username?: string
}
const { username = 'octocat' } = defineProps<Props>()

const styles = {
  main: {
    backgroundColor: '#ffffff',
    color: '#24292e',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px 0 48px',
  },
  title: {
    fontSize: '24px',
    lineHeight: 1.25,
  },
  section: {
    padding: '24px',
    border: 'solid 1px #dedede',
    borderRadius: '5px',
    textAlign: 'center' as const,
  },
  text: {
    margin: '0 0 10px 0',
    textAlign: 'left' as const,
  },
  button: {
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    lineHeight: 1.5,
    borderRadius: '0.5em',
    padding: '12px 24px',
  },
  links: {
    textAlign: 'center' as const,
  },
  link: {
    color: '#0366d6',
    fontSize: '12px',
  },
  footer: {
    color: '#6a737d',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '60px',
  },
}
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>
        A fine-grained personal access token has been added to your account
      </EPreview>
      <EContainer :style="styles.container">
        <EImg
          src="https://nuxtemail.com/github.png"
          width="32"
          height="32"
          alt="Github"
        />

        <EText :style="styles.title">
          <strong>@{{ username }}</strong>, a personal access was created on your
          account.
        </EText>

        <ESection :style="styles.section">
          <EText
            :style="styles.text"
          >
            Hey <strong>{{ username }}</strong>!
          </EText>
          <EText :style="styles.text">
            A fine-grained personal access token (<ELink>resend</ELink>) was
            recently added to your account.
          </EText>

          <EButton :style="styles.button">
            View your token
          </EButton>
        </ESection>
        <EText :style="styles.links">
          <ELink :style="styles.link">
            Your security audit log
          </ELink> ・
          <ELink :style="styles.link">
            Contact support
          </ELink>
        </EText>

        <EText :style="styles.footer">
          GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
