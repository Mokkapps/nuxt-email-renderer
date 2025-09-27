<script setup lang="ts">
interface Props {
  verificationCode?: string
}
const { verificationCode = '168396' } = defineProps<Props>()

const textStyle = {
  color: '#333',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
  fontSize: '14px',
  margin: '24px 0',
}

const styles = {
  main: {
    backgroundColor: '#fff',
    color: '#212121',
  },
  container: {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
  },
  coverSection: {
    backgroundColor: '#fff',
  },
  imageSection: {
    backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#333',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  mainText: {
    ...textStyle,
    marginBottom: '14px',
  },
  verificationSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    ...textStyle,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
  },
  codeText: {
    ...textStyle,
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '10px 0',
    textAlign: 'center' as const,
  },
  validityText: {
    textStyle,
    margin: '0px',
    textAlign: 'center' as const,
  },
  upperSection: {
    padding: '25px 35px',
  },
  lowerSection: {
    padding: '25px 35px',
  },
  cautionText: {
    ...textStyle,
    margin: '0px',
  },
  footerText: {
    ...textStyle,
    fontSize: '12px',
    padding: '0 20px',
  },
  link: {
    color: '#2754C5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
    fontSize: '14px',
    textDecoration: 'underline',
  },
}
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>AWS Email Verification</EPreview>
      <EContainer :style="styles.container">
        <ESection :style="styles.coverSection">
          <ESection :style="styles.imageSection">
            <EImg
              src="https://nuxtemail.com/aws-logo.png"
              width="75"
              height="45"
              alt="AWS's Logo"
            />
          </ESection>
        </ESection>
        <ESection :style="styles.upperSection">
          <EHeading :style="styles.h1">
            Verify your email address
          </EHeading>
          <EText :style="styles.mainText">
            Thanks for starting the new AWS account creation process. We
            want to make sure it's really you. Please enter the following
            verification code when prompted. If you don&apos;t want to
            create an account, you can ignore this message.
          </EText>
          <ESection :style="styles.verificationSection">
            <EText :style="styles.verifyText">
              Verification code
            </EText>

            <EText :style="styles.codeText">
              {{ verificationCode }}
            </EText>
            <EText :style="styles.validityText">
              (This code is valid for 10 minutes)
            </EText>
          </ESection>
        </ESection>
        <EHr />
        <ESection :style="styles.lowerSection">
          <EText :style="styles.cautionText">
            Amazon Web Services will never email you and ask you to disclose
            or verify your password, credit card, or banking account number.
          </EText>
        </ESection>
        <EText :style="styles.footerText">
          This message was produced and distributed by Amazon Web Services,
          Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web
          Services, Inc.. All rights reserved. AWS is a registered trademark
          of
          <ELink
            href="https://amazon.com"
            target="_blank"
            :style="styles.link"
          >
            Amazon.com
          </ELink>
          , Inc. View our
          <ELink
            href="https://amazon.com"
            target="_blank"
            :style="styles.link"
          >
            privacy policy
          </ELink>
          .
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
