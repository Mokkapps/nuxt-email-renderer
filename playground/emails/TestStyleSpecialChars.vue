<script setup lang="ts">
interface Props {
  userName?: string
}
const { userName = 'John Doe' } = defineProps<Props>()
</script>

<template>
  <EHtml>
    <EHead />
    <EStyle>
      /* Test CSS with child combinators */
      .hackWebmailPadding > tbody > tr > td:first-child {
        padding: 20px;
      }
      
      /* Test CSS with quotes in font-family */
      body {
        font-family: "Helvetica Neue", "Arial", sans-serif;
      }
      
      /* Test CSS with media queries (less-than symbol) */
      @media (max-width: 600px) {
        .responsive {
          font-size: 14px;
        }
      }
    </EStyle>
    <EBody style="background-color: #f0f0f0; padding: 20px;">
      <EContainer style="background-color: white; padding: 30px;">
        <EHeading as="h1">
          Hello {{ userName }}!
        </EHeading>
        <EText>
          This email tests the EStyle component with special characters like &gt;, &lt;, and quotes.
        </EText>
        <EText>
          The styles above use CSS child combinators, font-family with quotes, and media queries.
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
