<script setup lang="ts">
interface Props {
  userFirstname?: string
  resetPasswordLink?: string
}
const { userFirstname = 'John', resetPasswordLink = 'https://www.dropbox.com/reset' } = defineProps<Props>()

const styles = {
  main: {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
  },
  text: {
    fontSize: '16px',
    fontFamily:
      '\'Open Sans\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif',
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
  },
  button: {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px',
  },
  anchor: {
    textDecoration: 'underline',
  },
}
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>Dropbox reset your password</EPreview>
      <EContainer :style="styles.container">
        <EImg
          src="https://nuxtemail.com/dropbox-logo.png"
          width="40"
          height="33"
          alt="Dropbox"
        />
        <ESection>
          <EText :style="styles.text">
            Hi {{ userFirstname }},
          </EText>
          <EText :style="styles.text">
            Someone recently requested a password change for your Dropbox
            account. If this was you, you can set a new password here:
          </EText>
          <EButton
            :style="styles.button"
            :href="resetPasswordLink"
          >
            Reset password
          </EButton>
          <EText :style="styles.text">
            If you don&apos;t want to change your password or didn&apos;t
            request this, just ignore and delete this message.
          </EText>
          <EText :style="styles.text">
            To keep your account secure, please don&apos;t forward this email
            to anyone. See our Help Center for{' '}
            <ELink
              :style="styles.anchor"
              :href="resetPasswordLink"
            >
              more security tips.
            </ELink>
          </EText>
          <EText :style="styles.text">
            Happy Dropboxing!
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
