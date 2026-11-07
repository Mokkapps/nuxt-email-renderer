<!-- Never rendered. The compatibility test type checks it: global email components have real prop types. -->
<template>
  <EHtml>
    <!-- @vue-expect-error `href` must be a string. -->
    <EButton :href="42">
      Open
    </EButton>
    <ESubject>Typed</ESubject>
  </EHtml>
</template>
