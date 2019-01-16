import Vue from 'vue'

export default ({ app: { router } }) => {
  const DELAY = 1000
  const possible = process.env.GTM_ID === '' ? false : true
  let created = false

  router.afterEach(to => {
    Vue.nextTick(() => {
      setTimeout(() => {
        if (created && possible) {
          window['dataLayer'].push(
            to.gtm || {
              event: 'nuxtRoute',
              pageType: 'PageView',
              pageUrl: to.fullPath
            }
          )
        }
        created = true
      }, DELAY)
    })
  })
}
