<script setup lang="ts">
const styles = {
  main: {
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  },
  box: {
    padding: '0 48px',
  },
  hr: {
    borderColor: '#e6ebf1',
    margin: '20px 0',
  },
  paragraph: {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
  },
  anchor: {
    color: '#556cd6',
  },
  button: {
    backgroundColor: '#656ee8',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '10px',
  },
  footer: {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
  },
}
</script>

<template>
  <EHtml>
    <EHead />
    <EBody :style="styles.main">
      <EPreview>You're now ready to make live transactions with Stripe!</EPreview>
      <EContainer :style="styles.container">
        <ESection :style="styles.box">
          <EImg
            src="https://nuxtemail.com/stripe-logo.png"
            width="49"
            height="21"
            alt="Stripe"
          />
          <EHr :style="styles.hr" />
          <EText :style="styles.paragraph">
            Thanks for submitting your account information. You're now ready to
            make live transactions with Stripe!
          </EText>
          <EText :style="styles.paragraph">
            You can view your payments and a variety of other information about
            your account right from your dashboard.
          </EText>
          <EButton
            :style="styles.button"
            href="https://dashboard.stripe.com/login"
          >
            View your Stripe Dashboard
          </EButton>
          <EHr :style="styles.hr" />
          <EText :style="styles.paragraph">
            If you haven't finished your integration, you might find our
            <ELink
              :style="styles.anchor"
              href="https://docs.stripe.com/dashboard/basics"
            >
              docs
            </ELink>
            handy.
          </EText>
          <EText :style="styles.paragraph">
            Once you're ready to start accepting payments, you'll just need to
            use your live
            <ELink
              :style="styles.anchor"
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              API keys
            </ELink>
            instead of your test API keys. Your account can simultaneously be
            used for both test and live requests, so you can continue testing
            while accepting live payments. Check out our
            <ELink
              :style="styles.anchor"
              href="https://docs.stripe.com/dashboard/basics"
            >
              tutorial about account basics
            </ELink>
            .
          </EText>
          <EText :style="styles.paragraph">
            Finally, we've put together a
            <ELink
              :style="styles.anchor"
              href="https://docs.stripe.com/get-started/checklist/website"
            >
              quick checklist
            </ELink>
            to ensure your website conforms to card network standards.
          </EText>
          <EText :style="styles.paragraph">
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our
            <ELink
              :style="styles.anchor"
              href="https://support.stripe.com"
            >
              support site
            </ELink>
            .
          </EText>
          <EText :style="styles.paragraph">
            — The Stripe team
          </EText>
          <EHr :style="styles.hr" />
          <EText :style="styles.footer">
            Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
          </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
