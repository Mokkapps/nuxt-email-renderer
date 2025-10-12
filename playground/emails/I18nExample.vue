<template>
  <EHtml>
    <EHead />
    <EPreview>{{ $t('welcome.title') }}</EPreview>
    <EBody
      style="
        background-color: #f6f9fc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
      "
    >
      <EContainer
        style="
          background-color: #ffffff;
          border-radius: 8px;
          margin: 40px auto;
          padding: 40px;
          max-width: 600px;
        "
      >
        <ESection style="text-align: center; margin-bottom: 32px">
          <EHeading
            as="h1"
            style="
              color: #1a202c;
              font-size: 28px;
              font-weight: bold;
              margin: 0 0 16px 0;
            "
          >
            {{ $t('welcome.title') }}
          </EHeading>
        </ESection>

        <ESection>
          <EText
            style="
              color: #4a5568;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 16px 0;
            "
          >
            {{ $t('greeting') }},
          </EText>

          <EText
            style="
              color: #4a5568;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 24px 0;
            "
          >
            {{ $t('welcome.message') }}
          </EText>
        </ESection>

        <ESection style="text-align: center; margin: 32px 0">
          <EButton
            href="https://example.com"
            style="
              background-color: #3b82f6;
              color: #ffffff;
              padding: 12px 32px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              display: inline-block;
            "
          >
            {{ $t('welcome.action') }}
          </EButton>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
